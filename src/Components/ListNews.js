import clsx from "clsx";
import { Link } from "react-router-dom";
import NewsItem from "./NewsItem";

function ListNews(props) {
  return (
    <div className="my-8">
      <div className="border-b border-red-500 flex flex-row justify-between items-end">
        <div className="p-2 bg-red-500 border rounded-lg lg:w-44 md:w-40">
          <h1 className="font-bold md:text-base text-center text-white tracking-wider">
            Tin tức
          </h1>
        </div>
        <Link
          to={`/news`}
          className="text-red-500 hover:text-yellow-500 hover:underline "
        >
          Xem tất cả &gt;&gt;{" "}
        </Link>
      </div>
      <div className={clsx("sm:grid grid-cols-4 gap-2 hidden")}>
        {props.list.data.splice(0, 8).map((item, index) => {
          return <NewsItem key={index} data={item} />;
        })}
      </div>
      <div className={clsx("grid grid-cols-2 gap-1 sm:hidden")}>
        {props.list.data.splice(0, 2).map((item, index) => {
          return <NewsItem key={index} data={item} />;
        })}
      </div>
    </div>
  );
}

export default ListNews;
