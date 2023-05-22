import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllBlog,
  getBlogDetail,
  getComment,
  postComment,
} from "../api/blog";
import NewsItemVer from "../Components/NewsItemVer";

function BlogDetail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("blog_id");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  const [comment, setComment] = useState([]);
  const [view, setView] = useState([]);
  const [newest, setNewest] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const fetch = async () => {
      const res = await getBlogDetail(id);
      const all = await getAllBlog();
      setView(all.data.sort((a, b) => b.blog_view - a.blog_view).slice(0, 3));
      setNewest(
        all.data
          .sort((a, b) => a.blog_created_at - b.blog_created_at)
          .slice(0, 3)
      );
      const cmt = await getComment(id);
      setComment(cmt.data);
      setAllBlog(all.data);
      setData(res.data);
      if (res.newToken != null) {
        localStorage.setItem("token", res.newToken);
      }
      if (res.refreshToken != null) {
        localStorage.setItem("refresh_token", res.refreshToken);
      }
      //   console.log(res);
      setLoading(false);
    };
    fetch();
    window.scrollTo(0, { behavior: "smooth" });
  }, [id]);

  const handleComment = (e) => {
    e.preventDefault();
    const fetch = async () => {
      let date = new Date();
      const data = {
        comment: ref.current.content.value,
        name: ref.current.name.value,
        date: date.toISOString(),
        blog_id: id,
      };
      const res = await postComment(data);
      if (res.message === "ok") {
        alert("Cảm ơn bạn đã đóng góp!");
        ref.current.reset();
        setComment([
          ...comment,
          {
            name_user: data.name,
            created_at: date.toISOString(),
            value_user: data.comment,
          },
        ]);
        if (res.newToken != null) {
          localStorage.setItem("token", res.newToken);
        }
        if (res.refreshToken != null) {
          localStorage.setItem("refresh_token", res.refreshToken);
        }
      } else {
        alert("Bình luận thất bại");
      }
    };
    fetch();
  };

  if (loading)
    return (
      <div className="box-loader">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="my-5 mx-5 sm:mx-36">
      <div className="sm:flex sm:justify-between">
        <div className="hidden sm:block w-1/4">
          <div>
            <div className="border-b border-red-500 py-2 w-11/12">
              <label
                htmlFor=""
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Xem nhiều nhất
              </label>
            </div>
            {view.slice(0, 3).map((item, index) => (
              <NewsItemVer key={index} data={item} />
            ))}
          </div>
          <div>
            <div className="border-b border-red-500 py-2 w-11/12">
              <label
                htmlFor=""
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Mới nhất
              </label>
            </div>
            {newest.slice(0, 3).map((item, index) => (
              <NewsItemVer key={index} data={item} />
            ))}
          </div>
        </div>
        <div className="sm:w-3/4">
          <h1 className="font-semibold text-xl md:text-3xl">
            {data.blog_title}
          </h1>
          <div className="flex flex-row text-sm md:text-base mt-1 mb-2">
            <h2 className="font-semibold">
              {data.first_name} {data.last_name}
            </h2>
            <span className="mx-1">|</span>
            <span>{data.blog_created_at.slice(0, 10)}</span>
          </div>
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: data.blog_content }}
          ></div>

          <div className="my-4 border-y">
            <h1 className="font-semibold md:text-xl">Bài viết khác</h1>
            <div className="">
              {allBlog.slice(0, 4).map((item, index) => (
                <NewsItemVer key={index} data={item} />
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-semibold md:text-xl">
              Bình luận chung ({comment.length} Bình luận)
            </h1>
            <div className="pl-5">
              {comment.map((item, index) => (
                <div className="border-b py-2" key={index}>
                  <h2 className="font-semibold text-sm">
                    Tên: {item.name_user}{" "}
                    <span className="text-gray-400 text-xs">
                      ({item.created_at.slice(0, 10)})
                    </span>{" "}
                  </h2>
                  <p className="text-sm">{item.value_user}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-semibold my-4">Bình luận của bạn</h1>
            <form action="" className="" ref={ref}>
              <div>
                <label className="text-sm font-semibold" htmlFor="name">
                  Họ tên:
                </label>
                <input
                  className=" focus:outline-none w-full border rounded-md mt-1 px-2 text-sm py-1"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Họ tên"
                />
              </div>
              <div className="mt-3">
                <label className="text-sm font-semibold" htmlFor="content">
                  Nội dung:
                </label>
                <textarea
                  className=" focus:outline-none mt-1 w-full border rounded-md resize-none text-sm px-2 py-1"
                  name="content"
                  id="content"
                  rows="3"
                  placeholder="Nội dung..."
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={handleComment}
                className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 w-24 text-sm"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
