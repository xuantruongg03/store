import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useRef, useState } from "react";
import img from "../access/image/logo.png";
import { postBlog } from "../api/blog";

function Blog() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("../access/image/logo.png");
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const fetch = async () => {
      const data = {
        blog_title: ref.current.title.value,
        blog_description: ref.current.description.value,
        blog_content: content,
        blog_image: image || img,
      };
      const res = await postBlog(data);
      if(!res) {
        alert("Đăng bài thất bại");
        setLoading(false);
        return;
      }
      if (res.message === "ok") {
        alert(
          "Đăng bài thành công! Bài viết của bạn sẽ được duyệt trong thời gian sớm nhất. Cảm ơn bạn đã đóng góp!"
        );
        ref.current.reset();
        setContent("");
        document.getElementById("content").innerHTML = "";
        setImage("../access/image/logo.png");
        if (res.newToken != null) {
            localStorage.setItem('token', res.newToken);
          }
          if (res.refreshToken != null) {
            localStorage.setItem('refresh_token', res.refreshToken);
          }
      } else {
        alert("Đăng bài thất bại");
      }
    };
    fetch();
    setLoading(false);
  };

  const handleInputImage = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dvyutdqkj",
        uploadPreset: "ol04pjez",
        multiple: false,
        folder: "image_users",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.secure_url);
        }
      }
    );
    myWidget.open();
  };

  if (loading) {
    return (
      <div className="box-loader">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="container-custom my-5">
      <h1 className="text-center text-red-500 font-semibold my-5 sm:text-3xl text-xl">
        Thêm bài viết của bạn
      </h1>
      <form ref={ref} action="" className="w-full">
        <div className="grid grid-cols-2">
          <div className="my-3">
            <label htmlFor="title" className="font-semibold">
              Tiêu đề:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className=" text-sm focus:outline-none border border-spacing-1 border-gray-300 px-3 py-2 truncate w-full mt-1 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="" className="font-semibold">Hình ảnh bài viết</label>
            <img
                src={image || require(image).default}
              alt="hình ảnh bài viết"
              className=" w-40 h-32 border border-gray-300 mt-3"
              id="avatar"
            />
            <button
              className=" mt-5 text-sm font-semibold cursor-pointer px-2 py-1 rounded-md text-center bg-gray-100"
                onClick={handleInputImage}
            >
              Chọn Ảnh
            </button>
          </div>
        </div>
        <div className="my-3">
          <label htmlFor="author" className="font-semibold">
            Mô tả ngắn:
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="3"
            className=" text-sm focus:outline-none resize-none border border-spacing-1 border-gray-300 px-3 py-1 w-full mt-1 rounded-md"
            required
          ></textarea>
        </div>
        <div className="my-3">
          <label htmlFor="" className="font-semibold">
            Nội dung:
          </label>
          <CKEditor
                    editor={ ClassicEditor }
                    className="text-sm"
                    required
                    id="content"
                    name="content"
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setContent(data);
                    } }
                />
        </div>
        <button
          className="my-3 px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-yellow-400"
          onClick={handleSubmit}
        >
          Đăng bài
        </button>
      </form>
    </div>
  );
}

export default Blog;
