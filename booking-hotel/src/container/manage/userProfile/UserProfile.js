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
  const [bookings, setBookings] = useState([]);

  const total = bookings?.reduce((acc, booking) => acc + booking?.total, 0);
  const serviceFee = Number(total * 0.975 * 0.025).toFixed(2);
  const countReservationSuccess = bookings?.length;

  useEffect(() => {
    http
      .get(`reservations/by-owner/${user?.id}?statusName=SUCCESS`)
      .then((res) => {
        setBookings(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

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
        {
          <div>
            <Button onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? "Cancel" : "Edit"}
            </Button>
          </div>
        }
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
      {!isEdit && (
        <div className="calculate grid grid-cols-4">
          <div className="w-[200px] h-[90px] rounded-md shadow-md p-3 flex flex-col justify-between shadow-green-400/100">
            <h3 className="font-medium text-green-600">Total:</h3>
            <div>${total}</div>
          </div>
          <div className="w-[200px] h-[90px] rounded-md shadow-md p-3 flex flex-col justify-between shadow-green-400/100">
            <h3 className="font-medium text-green-600">Service Fee:</h3>
            <div>${serviceFee}</div>
          </div>
          <div className="w-[200px] h-[90px] rounded-md shadow-md p-3 flex flex-col justify-between shadow-green-400/100">
            <h3 className="font-medium text-green-600">Success Reservation:</h3>
            <div>{countReservationSuccess}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
