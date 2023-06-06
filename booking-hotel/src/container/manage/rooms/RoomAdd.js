import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useUtilities from "../../../hooks/useUtilities";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import Dropdown from "../../../components/dropdown/Dropdown";
import List from "../../../components/dropdown/List";
import Option from "../../../components/dropdown/Option";
import Select from "../../../components/dropdown/Select";

import UploadImage from "../../../components/uploadImages/UploadImage";
import { MultiSelect } from "react-multi-select-component";
import { AiFillMinusCircle } from "react-icons/ai";
import { amenitiesOptions } from "./helpers";
import http from "../../../config/axiosConfig";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import Toggle from "../../../components/toggle/Toggle";
import { useAuth } from "../../../context/authContext";

const schema = yup
  .object({
    roomName: yup.string().required("Please enter your name location"),
    address: yup.string().required("Please enter your address of location"),
    price: yup.string().required("Please enter day price of location"),
  })
  .required();

const RoomAdd = () => {
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [cities, setCites] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypesName, setRoomTypesName] = useState();
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardsName, setWardsName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    unregister,
    register,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {},
  });

  const { utilities, handleAddUtility, handleClearUtility, setUtilities } =
    useUtilities(unregister);

  const watchAnimal = watch("animal");

  useEffect(() => {
    http
      .get(`address/provinces`)
      .then((res) => {
        setCites(res?.data);
      })
      .catch((err) => {
        console.error("cities err", err);
      });
    http
      .get(`room-types`)
      .then((res) => {
        setRoomTypes(res?.data);
      })
      .catch((err) => {
        console.error("roomTypes err", err);
      });
  }, []);

  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const handleClickRoomType = (room) => {
    setRoomTypesName(room.name);
    setValue("roomTypeId", room.id);
  };

  const handleClickCity = async (city) => {
    setValue("city", city.code);
    setCityName(city.name);
    setDistrictName("");
    setWardsName("");
    setWards([]);
    const res = await http.get(`address/districts/${city.code}`);
    setDistricts(res?.data);
  };

  const handleClickDistrict = async (district) => {
    setValue("district", district.code);
    setDistrictName(district.name);
    setWardsName("");
    const res = await http.get(`address/wards/${district.code}`);
    setWards(res?.data);
  };

  const handleClickWard = (ward) => {
    setWardsName(ward.name);
    setValue("wards", ward.code);
  };

  const utilitiesAdd = () => {
    let checkError = false;

    for (let i = 0; i < utilities.length; i++) {
      const name = getValues(`${utilities[i].name}`);
      const value = getValues(`${utilities[i].value}`);
      if (!name || !value || isNaN(value)) {
        checkError = !checkError;
        break;
      }
    }
    if (checkError) {
      toast.error("Utility name required and value must be number");
      return;
    }
    const utilitiesAdd = [];
    utilities.forEach((item) => {
      utilitiesAdd.push({
        name: getValues(`${item.name}`),
        value: getValues(`${item.value}`),
      });
    });

    return utilitiesAdd;
  };

  const addNewRoom = (values) => {
    setIsLoading(true);
    const utilitiesAdding = utilitiesAdd();
    const imageFilesAdding = imageFiles.map((item) => {
      return {
        url: item?.url,
      };
    });
    const id = user?.id;

    const locationAdd = {
      customerId: id,
      address: `${values.address},  ${wardsName}, ${districtName}`,
      provinceId: values.city,
      districtId: values.district,
      roomTypeId: values.roomTypeId,
      wardId: values.wards,
      roomName: values.roomName,
      price: +values.price,
      description: values.desc,
      maxQuantityPeople: +values.maxQuantityPeople,
      animal: values.animal,
      utilitiesDto: utilitiesAdding,
      imagesDto: imageFilesAdding,
    };

    http
      .post("rooms", locationAdd)
      .then((res) => {
        toast.success("success");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        // reset({
        //   address: "",
        //   cityId: "",
        //   districtId: "",
        //   wardsId: "",
        //   name: "",
        //   price: "",
        //   description: "",
        // });
        // setWardsName("");
        // setDistrictName("");
        // setCityName("");
        // setUtilities([
        //   {
        //     name: `nameUtility0`,
        //     value: `valueUtility0`,
        //     index: 0,
        //   },
        // ]);
        // setRoomTypesName("");
        // setImageFiles([]);
        console.error("err", err);
      });
  };

  return (
    <form onSubmit={handleSubmit(addNewRoom)}>
      <h1 className="text-2xl font-bold mb-5">Create New Rooms</h1>
      <div className="grid grid-cols-2 gap-10 max-w-[900px]">
        <Field>
          <Label>Room Name</Label>
          <Input
            name={"roomName"}
            rounded="rounded"
            type="text"
            control={control}
          />
        </Field>
        <Field>
          <Label>Room Type</Label>
          <Dropdown>
            <Select placeholder={roomTypesName || ""} />
            <List>
              {roomTypes.map((room) => (
                <Option key={room.id} onClick={() => handleClickRoomType(room)}>
                  {room.name}
                </Option>
              ))}
            </List>
          </Dropdown>
        </Field>
        <div className="w-full">
          <Field>
            <Label name="address">Address</Label>
            <Dropdown>
              <Select placeholder={cityName || "Province"} />
              <List>
                {cities.map((city) => (
                  <Option key={city.code} onClick={() => handleClickCity(city)}>
                    {city.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
            <Dropdown>
              <Select placeholder={districtName || "District"} />
              <List>
                {districts.map((district) => (
                  <Option
                    key={district.code}
                    onClick={() => handleClickDistrict(district)}
                  >
                    {district.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
            <Dropdown>
              <Select placeholder={wardsName || "Ward"} />
              <List>
                {wards.map((ward, index) => (
                  <Option key={index} onClick={() => handleClickWard(ward)}>
                    {ward.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
            <Input
              type="text"
              name="address"
              placeholder="Enter address of location"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="w-full">
          <Field>
            <Label>Description</Label>
            <textarea
              id="desc"
              name="description"
              className="w-full max-w-[500px] min-h-[200px] outline-none border border-slate-200 bg-slate-100 focus:border-primary rounded p-4"
              {...register("desc")}
            />
          </Field>
        </div>
        <div className="w-full">
          <Label>Utilities</Label>
          <div className="mt-5">
            {utilities.map((utility, index) => {
              return (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <div
                    className="mb-5 grid grid-cols-2 gap-3"
                    key={utility.index}
                  >
                    <Field>
                      <Label name={`nameUtility${utility.index}`}>Name</Label>
                      <Input
                        type="text"
                        name={`nameUtility${utility.index}`}
                        control={control}
                      />
                    </Field>
                    <Field>
                      <Label name={`valueUtility${utility.index}`}>Value</Label>
                      <Input
                        type="text"
                        name={`valueUtility${utility.index}`}
                        control={control}
                      />
                    </Field>
                  </div>
                  {index !== 0 && index === utilities.length - 1 && (
                    <AiFillMinusCircle
                      className="w-9 h-9 text-primary cursor-pointer"
                      onClick={() => handleClearUtility(utility)}
                    />
                  )}
                </div>
              );
            })}
            <h2
              className=" text-primary mb-5 font-semibold cursor-pointer"
              onClick={handleAddUtility}
            >
              Add more Utilities
            </h2>
          </div>
        </div>
        <div className="w-full mt-[47px] flex flex-col gap-3">
          <Label>Amenities</Label>
          <MultiSelect
            options={amenitiesOptions}
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            hasSelectAll={false}
          />

          <Field>
            <Label>Price</Label>
            <Input type="number" name={"price"} control={control} />
          </Field>

          <Field>
            <Label>Max People</Label>
            <Input type="number" name={"maxQuantityPeople"} control={control} />
          </Field>
          <Field>
            <Toggle name="animal" control={control} checked={watchAnimal}>
              Animal
            </Toggle>
          </Field>
        </div>
      </div>
      <div className="max-w-[1200px] w-full h-[220px] mb-5">
        <UploadImage imageFiles={imageFiles} setImageFiles={setImageFiles} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default RoomAdd;
