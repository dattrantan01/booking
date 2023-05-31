import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useUtilities from "../../../hooks/useUtilities";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import Dropdown from "../../../components/dropdown/Dropdown";
import Select from "../../../components/dropdown/Select";
import UploadImages from "../../../components/uploadImages/UploadImages";
import UploadImage from "../../../components/uploadImages/UploadImage";
import { MultiSelect } from "react-multi-select-component";
import { AiFillMinusCircle } from "react-icons/ai";
import { amenitiesOptions } from "./helpers";

const schema = yup
  .object({
    roomName: yup.string().required("Please enter your name location"),
    address: yup.string().required("Please enter your address of location"),
    dayPrice: yup.string().required("Please enter day price of location"),
  })
  .required();

const RoomAdd = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
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

  const addNewRoom = (values) => {
    console.log(imageFiles);
  };

  console.log(amenitiesOptions);

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
            {/* <Select placeholder={roomTypesName || "Room Types"}></Select> */}
            <Select />
            {/* <List>
                  {roomTypes.map((room) => (
                    <Option
                      key={room.id}
                      onClick={() => handleClickRoomType(room)}
                    >
                      {room.roomTypeName}
                    </Option>
                  ))}
                </List> */}
          </Dropdown>
        </Field>
        <div className="w-full">
          <Field>
            <Label name="address">Address</Label>
            <Dropdown>
              <Select></Select>
              {/* <List>
                {cities.map((city) => (
                  <Option key={city.code} onClick={() => handleClickCity(city)}>
                    {city.name}
                  </Option>
                ))}
              </List> */}
            </Dropdown>
            <Dropdown>
              <Select></Select>
              {/* <List>
                {districts.map((district) => (
                  <Option
                    key={district.code}
                    onClick={() => handleClickDistrict(district)}
                  >
                    {district.name}
                  </Option>
                ))}
              </List> */}
            </Dropdown>
            <Dropdown>
              <Select></Select>
              {/* <List>
                {wards.map((ward) => (
                  <Option key={ward.code} onClick={() => handleClickWard(ward)}>
                    {ward.name}
                  </Option>
                ))}
              </List> */}
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
                      <Label name={`priceUtility${utility.index}`}>Value</Label>
                      <Input
                        type="text"
                        name={`priceUtility${utility.index}`}
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
        </div>
      </div>
      <div className="max-w-[1200px] w-full h-[220px]">
        <UploadImage />
      </div>
    </form>
  );
};

export default RoomAdd;
