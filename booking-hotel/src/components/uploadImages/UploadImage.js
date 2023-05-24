import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { db } from "../../firebase/firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// const imageFiles = {
//     nameId: "name of file",
//     url: ""
// }

const UploadImage = () => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleUploadImage = (file, nameId) => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, "booking/" + nameId);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const listImage = [...imageFiles];
          listImage.push({
            nameId: nameId,
            url: downloadURL,
          });
          setImageFiles(listImage);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleFileInput = (e) => {
    if (imageFiles.length >= 6) return;
    const filesList = e.target.files;
    if (filesList.length >= 6) return;
    // const list = [];

    for (let i = 0; i < filesList.length; i++) {
      //   const url = URL.createObjectURL(filesList[i]);
      //   list.push({ file: filesList[i], url: url });
      const nameId = uuidv4();
      handleUploadImage(filesList[i], nameId);
    }
    // setImageFiles([...imageFiles, ...list]);
  };

  const handleDeleteImage = (item) => {
    let listImage = [];
    listImage = imageFiles.filter(
      (image) => image.file.name !== item.file.name
    );
    setImageFiles(listImage);
  };

  return (
    <div className="w-full h-full p-4 border border-slate-300 shadow-md">
      {!imageFiles.length > 0 ? (
        <label
          htmlFor="uploadImage"
          className="w-full h-full cursor-pointer inline-block"
        >
          <div className="w-full h-full flex items-center justify-center">
            <MdAddAPhoto className="w-10 h-10" />
          </div>
          <input
            onChange={(e) => handleFileInput(e)}
            type="file"
            id="uploadImage"
            className="hidden"
            multiple={true}
            accept={"image/png, image/jpeg, image/jpg, image/bmp"}
          />
        </label>
      ) : (
        <div className="w-full h-full grid grid-cols-5 gap-1">
          {imageFiles.map((item) => {
            return (
              <div
                key={item.url}
                className="w-full h-[180px] cursor-pointer relative"
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <AiOutlineCloseCircle
                  className="absolute right-1 top-1 text-3xl text-primary"
                  onClick={() => handleDeleteImage(item)}
                />
              </div>
            );
          })}
          {imageFiles.length < 5 && imageFiles.length > 0 && (
            <div className="w-full h-[180px]">
              <label
                htmlFor="uploadImage"
                className="w-full h-full cursor-pointer inline-block"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <MdAddAPhoto className="w-10 h-10" />
                </div>
                <input
                  onChange={(e) => handleFileInput(e)}
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  multiple={true}
                  accept={"image/png, image/jpeg, image/jpg, image/bmp"}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
