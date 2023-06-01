package com.booking.mapper;

import com.booking.dao.entity.Utilities;
import org.mapstruct.Mapper;
import com.booking.dto.UtilitiesDto;

	@Mapper
	public interface UtilitiesMapper {

		Utilities utilitiesDtoToUtilities(UtilitiesDto utilityDto);

		UtilitiesDto utilitiesToUtilitiesDto(Utilities utility);
}
