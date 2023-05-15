import { Link } from "react-router-dom";
import slug from "../Convert/ConvertStringVNtoTitle";

function NewsItemVer(props) {
  return (
    <div className="flex my-5 justify-between pr-5 items-center ">
      <img
        src={props.data.blog_image}
        alt="Hình ảnh bài viết"
        className="h-24 w-24 object-cover mr-2"
      />
      <Link
        to={`/news/${slug(props.data.blog_title)}?blog_id=${
          props.data.blog_id
        }`}
        className="font-semibold mt-2 text-sm text-justify"
      >
        {props.data.blog_title}{" "}
      </Link>
    </div>
  );
}

export default NewsItemVer;
