package com.booking.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Behavior;
import com.booking.dao.entity.Customer;
import com.booking.dao.entity.Review;
import com.booking.dao.entity.Room;
import com.booking.dao.hibernate.RoomDao;
import com.booking.dao.repository.BehaviorRepository;
import com.booking.dao.repository.CustomerRepository;
import com.booking.dao.repository.ReviewRepository;
import com.booking.dao.repository.RoomRepository;
import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomResponseDto;
import com.booking.mapper.RoomMapper;
import com.booking.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private RoomMapper roomMapper;
	@Autowired
	private RoomDao roomDao;
	@Autowired
	private BehaviorRepository behaviorRepository;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private ReviewRepository reviewRepository;

	@Override
	public void createRoom(RoomRequestDto roomRequestDto) {
		roomRepository.save(roomMapper.roomRequestDtoToRoom(roomRequestDto));
	}

	@Override public List<RoomResponseDto> getAll() {
		return roomRepository.findAll().stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
	}

	@Override
	public Room findById(String id) {
		return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found room"));
	}

	@Override
	public RoomResponseDto findByRoomId(String roomId, String customerId) {
		Room room = findById(roomId);
		if (customerId != null) {
			Optional<Behavior> behaviorOptional = behaviorRepository.findByCustomerIdAndRoomId(customerId, roomId);
			if (behaviorOptional.isPresent()) {
				Behavior behavior = behaviorOptional.get();
				behavior.setTime(behavior.getTime() + 1);
				behaviorRepository.save(behavior);
			} else {
				Behavior newBehavior = new Behavior();
				newBehavior.setTime(1);
				newBehavior.setRoom(room);
				newBehavior.setCustomer(customerRepository.findById(customerId).orElseThrow());
				behaviorRepository.save(newBehavior);
			}
		}
		return roomMapper.roomToRoomResponseDto(room);
	}

	@Override
	public List<RoomResponseDto> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice, String maxQuantityPeople, Boolean animal) {
		return roomDao.getWithFilter(typeRoomId, provinceId, roomName, cityName, minPrice, maxPrice,maxQuantityPeople,animal).stream().map(room -> roomMapper.roomToRoomResponseDto(room))
			.collect(Collectors.toList());
	}

	@Override public void updateRoom(String id, RoomRequestDto roomCreateDto) {
		roomRepository.save(roomMapper.roomRequestDtoToRoom(roomCreateDto));
	}

	@Override
	public List<RoomResponseDto> findByCustomerId(String id) {
		return roomRepository.getByCustomerIdAndEnableIsTrueOrderByTimeCreateDesc(id).stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
	}

	@Override public List<RoomResponseDto> favoriteRoom(String id) {
		List<Room> roomIterable = roomRepository.findAll();
		List<Customer> customers = roomDao.findAllByBehavior();
		//		List<Customer> customers = customerRepository.findAll();
		var rooms = new ArrayList<>(roomIterable);

		var matrix = generateRatingMatrix(rooms, customers);

		var customerOptional = customerRepository.findById(id);

		if (customerOptional.isEmpty()) {

			return roomRepository.findTop6ByOrderByAverageRatingDesc().stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
		}

		if (behaviorRepository.findByCustomerId(id).isEmpty()){
			return roomRepository.findTop6ByOrderByAverageRatingDesc().stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
		}

		var customer = customerOptional.get();
		//		int u = customers.indexOf(customer);
		int u = Customer.indexOf(customers, customer);
		double aRU = getAverageRating(u, matrix);

		List<Pair> userSimilarities = new ArrayList<>();
		for (int v = 0; v < customers.size(); v++) {
			if (v != u) {
				double aRV = getAverageRating(v, matrix);
				var value = userSimilarityCaculate(u, aRU, v, aRV, matrix, rooms, customer, customers.get(v));
				if (value != 0) { //
					userSimilarities.add(new Pair(v, value));
				}
			}
		}

		if (userSimilarities.size() > 15) { //
			userSimilarities = userSimilarities.subList(0, 15);
		}

		var listItems = new ArrayList<Integer>();

		userSimilarities.forEach(user -> {
			for (int i = 0; i < matrix[0].length; i++) {
				if (matrix[user.getIndex()][i] != 0 && !listItems.contains(i)) {
					listItems.add(i);
				}
			}
		});

		var prediction = predictionRating(aRU, userSimilarities, listItems, matrix);
		var result =
			prediction.stream().sorted(Comparator.comparing(Pair::getValue)).map(pair -> rooms.get(pair.getIndex())).limit(10).collect(Collectors.toList());
		if (result.isEmpty()) {
			return roomRepository.findTop6ByOrderByAverageRatingDesc().stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
		}
		return result.stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
	}

	private double[][] generateRatingMatrix(List<Room> rooms, List<Customer> customers) {
		int m = customers.size();
		int n = rooms.size();

		var ratingMatrix = new double[m][n];

		for (int i = 0; i < m; i++) {
			for (int j = 0; j < n; j++) {
				var customer = customers.get(i);
				var room = rooms.get(j);
				List<Review> reviewList = reviewRepository.findReviewByCustomerIdAndRoomId(customer.getId(), room.getId());
				if (reviewList.size() > 0) {
					Double sum = reviewList.stream().map(Review::getRating).reduce(0d, Double::sum);
					double avg = sum / reviewList.size();
					ratingMatrix[i][j] = avg;
				} else {
					ratingMatrix[i][j] = 0d;
				}
			}
		}
		return ratingMatrix;
	}

	private double getAverageRating(int indexOfUser, double[][] matrix) {
		double sum = 0d;
		int length = 0;
		if (matrix.length == 0)
			return 0;
		for (int i = 0; i < matrix[0].length; i++) {
			if (matrix[indexOfUser][i] != 0) {
				sum += matrix[indexOfUser][i];
				length++;
			}
		}
		return sum / length;
	}

	private double userSimilarityCaculate(int u, Double aRU, int v, Double aRV, double[][] matrix, List<Room> rooms, Customer user, Customer user2) {
		double numerator = 0d;
		double denominator1 = 0d;
		double denominator2 = 0d;

		for (int i = 0; i < matrix[0].length; i++) {
			var wu = TF_IDF(user, rooms.get(i), matrix.length);
			var wv = TF_IDF(user2, rooms.get(i), matrix.length);
			numerator += (matrix[u][i] * wu - aRU) * (matrix[v][i] * wv - aRV);
			denominator1 += (matrix[u][i] * wu - aRU) * (matrix[v][i] * wu - aRU);
			denominator2 += (matrix[v][i] * wv - aRV) * (matrix[v][i] * wv - aRV);
			//						numerator += (matrix[u][i] - aRU) * (matrix[v][i] - aRV);
			//						denominator1 += (matrix[u][i] - aRU) * (matrix[v][i] - aRU);
			//						denominator2 += (matrix[v][i] - aRV) * (matrix[v][i] - aRV);
		}

		return numerator / Math.sqrt(denominator1 * denominator2);
	}

	private double TF_IDF(Customer user, Room room, int userLength) {
		Optional<Behavior> behaviorOptional = behaviorRepository.findByCustomerIdAndRoomId(user.getId(), room.getId());
		if (behaviorOptional.isEmpty()) {
			return 0;
		}

		Behavior behavior = behaviorOptional.get();
		var lengthBehavior = behaviorRepository.findByCustomerId(user.getId()).stream().map(Behavior::getTime).reduce(0, Integer::sum);
		if (lengthBehavior == 0) {
			return 0;
		}

		var tf = behavior.getTime() / lengthBehavior;
		var pop = behaviorRepository.findByRoomId(room.getId()).stream().map(Behavior::getTime).reduce(0, Integer::sum);
		var idf = Math.log10((double) userLength / (1 + pop));
		return tf * idf;
	}

	private ArrayList<Pair> predictionRating(double aRU, List<Pair> customers, List<Integer> rooms, double[][] matrix) {
		var result = new ArrayList<Pair>();
		for (Integer room : rooms) {
			double numerator = 0d;
			double denominator = 0d;
			for (Pair customer : customers) {
				var aRV = getAverageRating(customer.getIndex(), matrix);
				numerator += customer.getValue() * (matrix[customer.getIndex()][room] - aRV);
				denominator += Math.abs(customer.getValue());
			}
			result.add(new Pair(room, aRU + numerator / denominator));
		}
		return result;
	}

	static class Pair implements Comparable<Pair> {
		private Integer index;
		private Double value;

		public Pair(Integer index, Double value) {
			this.index = index;
			this.value = value;
		}

		public Integer getIndex() {
			return index;
		}

		public void setIndex(Integer index) {
			this.index = index;
		}

		public Double getValue() {
			return value;
		}

		public void setValue(Double value) {
			this.value = value;
		}

		@Override
		public boolean equals(Object o) {
			if (this == o)
				return true;
			if (o == null || getClass() != o.getClass())
				return false;
			Pair pair = (Pair) o;
			return Objects.equals(index, pair.index) && Objects.equals(value, pair.value);
		}

		@Override
		public int hashCode() {
			return Objects.hash(index, value);
		}

		@Override
		public int compareTo(Pair e) {
			if (value == null || e.value == null) {
				return 0;
			}
			return value.compareTo(e.value);
		}
	}


}
