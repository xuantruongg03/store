import { Link } from "react-router-dom";
import slug from "../Convert/ConvertStringVNtoTitle";

function NewsItem(props) {
  return (
    <div className="flex flex-col my-5">
      <Link to={`/news/${slug(props.data.blog_title)}?blog_id=${props.data.blog_id}`} className="relative">
        <img
            src={props.data.blog_image}
            alt="Hình ảnh bài viết"
            className="w-full h-44 sm:h-48 object-cover"
        />
      </Link>
      <Link to={`/news/${slug(props.data.blog_title)}?blog_id=${props.data.blog_id}`} className="font-semibold mt-2 truncate hover:text-red-500" >{props.data.blog_title}</Link>
      <p className="mt-2 text-sm h-10 overflow-hidden overflow-ellipsis">{props.data.blog_description}</p>
    </div>
  );
}

export default NewsItem;
