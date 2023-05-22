import { useEffect, useState } from "react";
import { deleteBlog, getMyBlog } from "../api/blog";
import { Link, useNavigate } from "react-router-dom";
import slug from "../Convert/ConvertStringVNtoTitle"
import { useDispatch } from "react-redux";

function YourBlog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const dis = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res = await getMyBlog();
      if (res.message === "ok") {
        setData(res.data);
        setLoading(false);
        if (res.newToken != null) {
          localStorage.setItem("token", res.newToken);
        }
        if (res.refreshToken != null) {
          localStorage.setItem("refresh_token", res.refreshToken);
        }
      } else {
        alert("Lỗi bên server!");
      }
    };
    fetch();
  }, []);

  const handleDelete = (id) => {
    const fetch = async () => {
        const res = await deleteBlog({blog_id: id});
        if(res.message === "ok") {
            if(res.refreshToken != null) {
                localStorage.setItem("refresh_token", res.refreshToken);
            }
            if(res.newToken != null) {
                localStorage.setItem("token", res.newToken);
            }
            alert("Xóa bài viết thành công!");
            document.getElementById(id).remove();
        } else {
            alert("Xóa bài viết thất bại!");
        }
    }
    fetch();
  }

  const handleEdit = (id) => {
    dis({type: "GET_BLOG_DETAIL", data: id});
    navigation(`/blog/create`);
  }

  if (loading)
    return (
      <div className="box-loader">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="my-5 mx-5 sm:mx-36">
        <h1 className="text-xl sm:text-3xl text-red-500 font-semibold text-center">Bài viết của bạn</h1>
        <div>
            {(() => {
                if(data.length === 0) {
                    return <h1 className="text-center text-xl sm:text-3xl">Chưa có bài viết nào! <Link to={"/blog/create"} className="text-red-500">Đăng bài ngay!</Link> </h1> 
                } else {
                    return data.map((item, index) => {
                        return (
                            <div className="flex flex-col sm:flex-row mt-5 sm:items-center" key={index} id={item.blog_id}>
                                <div className="h-56 sm:h-44 w-full sm:w-1/4 sm:mr-5">
                                    <img className="w-full h-full" src={item.blog_image} alt="Hình ảnh bài viêt" />
                                </div>
                                <div className="mt-2 sm:mr-5 sm:w-2/4">
                                    <Link className="font-semibold hover:text-red-500" to={`/news/${slug(item.blog_title)}?blog_id=${item.blog_id}`} >{item.blog_title}</Link>
                                    <p className="text-sm">Ngày tạo: {item.blog_created_at.slice(0, 10)}</p>
                                </div>
                                <div className="mt-2 flex justify-between sm:border-l sm:flex-col sm:w-1/4 items-center">
                                    <h1 className="text-sm font-semibold">Đánh giá: {item.blog_rate}</h1>
                                    <div className="flex flex-col sm:flex-row justify-between sm:mt-5">
                                        <button onClick={() => handleEdit(item.blog_id)} className="py-2 px-4 border border-yellow-500 rounded-md hover:bg-red-500 hover:text-yellow-500 hover:border-yellow-500 text-sm text-red-500 sm:text-base">Sửa bài viết</button>
                                        <button onClick={() => handleDelete(item.blog_id)} className="py-2 mt-3 sm:mt-0 sm:ml-3 px-4 border border-red-500 rounded-md hover:bg-white bg-red-500 hover:text-red-500 hover:border-red-500 text-sm text-white sm:text-base">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        )
                    });
                }
            })()}
        </div>
      </div>
  );
}

export default YourBlog;
