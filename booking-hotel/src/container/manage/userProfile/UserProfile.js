import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import http from "../../../config/axiosConfig";

const schema = yup
  .object({
    customerName: yup.string().required("Please enter your username"),
  })
  .required();

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const userId = user?.id;
  const [isEdit, setIsEdit] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      customerName: user?.customerName,
      phoneNumber: user?.phoneNumber,
    },
  });

  useEffect(() => {
    reset({
      customerName: user?.customerName,
      phoneNumber: user?.phoneNumber,
    });
  }, [userId]);

  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const updateUserProfile = (values) => {
    http
      .put(`users/id=${user?.id}`, {
        id: user?.id,
        ...user,
        ...values,
        roleId: "IT04ZnPgBYSf3Qm",
      })
      .then(() => {
        http.get("/users/me").then((res) => {
          setUser(res.data);
        });
      })
      .then(() => {
        toast.success("Update Profile Successfully");
        setIsEdit(false);
      });
  };

  return (
    <div className="">
      <div className="flex flex-row gap-3 items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
          <div className="w-14 h-14 min-w-14">
            <FaUserCircle className="w-full h-full text-green-600" />
          </div>
          <span className="text-xl font-semibold">{user?.email}</span>
        </div>
        {!isEdit && (
          <div>
            <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-row gap-3 items-baseline">
        <span className="text-xl font-semibold">Role: </span>
        <span className="font-medium capitalize">{user?.roleName}</span>
      </div>
      {isEdit ? (
        <form
          onSubmit={handleSubmit(updateUserProfile)}
          className="grid grid-cols-2 gap-10 max-w-[900px] mt-6"
        >
          <Field>
            <Label>Name</Label>
            <Input
              name={"customerName"}
              rounded="rounded"
              type="text"
              control={control}
            />
          </Field>
          <Field>
            <Label>Phone Number</Label>
            <Input
              name={"phoneNumber"}
              rounded="rounded"
              type="text"
              control={control}
            />
          </Field>
          <div className="">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-10 max-w-[900px] mt-6">
          <Field>
            <Label>Name</Label>
            <div className="">{user?.customerName}</div>
            <div className="w-full h-[1px] bg-slate-400 -mt-2"></div>
          </Field>
          <Field>
            <Label>Phone Number</Label>
            <div className="">{user?.phoneNumber}</div>
            <div className="w-full h-[1px] bg-slate-400 -mt-2"></div>
          </Field>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
