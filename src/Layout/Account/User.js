import React, { useState } from "react";
import image from "../../access/image/avatar.jpg";
import { updateUserAPI } from "../../api/user";

function User(props) {
  const [avatar, setAvatar] = useState(props.data.avatar);
    const [name, setName] = useState(props.data.first_name + " " + props.data.last_name);

  const hideEmail = (email) => {
    email = email ? email : "abc@gmail.com";
    return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");
  };

  const hidePassword = (password) => {
    password = password ? password : "";
    return password.replace(/./g, "*").slice(0, 10);
  };

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleSave = (e) => {
    let first_name = name.split(" ").slice(0, -1).join(" ");
    let last_name = name.split(" ").slice(-1).join(" ");
    const update = async () => {
      const params = {
        first_name: first_name,
        last_name: last_name,
        avatar: avatar,
      };
      const res = await updateUserAPI(params);
      if (res.message === "ok") {
        alert("Cập nhật thành công!");
        window.location.reload();
      }
    };
    if (
      name !== props.data.first_name + " " + props.data.last_name ||
      avatar !== props.data.avatar
    ) {
      update();
    }
  };

  const handleInputAvatar = (e) => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dvyutdqkj",
        uploadPreset: "ol04pjez",
        multiple: false,
        folder: "image_users",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setAvatar(result.info.secure_url);
        }
      }
    );
    myWidget.open();
  };

  return (
    <div className="flex bg-slate-100 p-5 justify-around items-center">
      <div className="flex flex-col w-2/3 p-2">
        <h1 className="text-xl font-semibold uppercase border-b border-slate-200">
          Hồ sơ
        </h1>
        <div>
          <div className="flex items-center my-4">
            <label className="text-base mr-1 w-32">Tên đăng nhập: </label>
            <div className="ml-1 w-4/5 py-1 px-3">{props.data.username}</div>
          </div>
          <div className="flex items-center my-4">
            <label className="text-base mr-1 w-32">Họ tên: </label>
            <input
              // style={{ border: '1px solid rgb(182, 181, 181)' }}
              className="ml-2 w-3/5 py-1 px-3 focus:outline-none rounded"
              name="name"
              style={{ border: "1px solid rgb(205, 204, 204)" }}
              onChange={handleInputName}
              defaultValue={name}
            />
          </div>
          <div className="flex items-center my-4">
            <label className="text-base mr-1 w-32">Email: </label>
            <div className="ml-1 w-4/5 py-1 px-3">
              {hideEmail(props.data.email)}
            </div>
          </div>
          <div className="flex items-center my-4">
            <label className="text-base mr-1 w-32">Mật khẩu: </label>
            <label className="py-1 px-3">
              {hidePassword(props.data.password)}
            </label>
          </div>
          <button
            className=" mt-5 ml-3 px-8 py-2 bg-red-500 text-white rounded font-semibold"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <img
          src={avatar || image}
          alt="Avatar"
          className=" w-32 h-32 rounded-full object-cover"
          id="avatar"
        />
        <button
          className=" mt-5 cursor-pointer p-3 rounded text-center"
          onClick={handleInputAvatar}
        >
          Chọn Ảnh
        </button>
      </div>
    </div>
  );
}

export default User;
