import NewsItem from "../Components/NewsItem";
import { useEffect, useState } from "react";
import { getAllBlog } from "../api/blog";
import clsx from "clsx";
import NewsItemVer from "../Components/NewsItemVer";

function News() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageStart, setPageStart] = useState(0);
    const [pageEnd, setPageEnd] = useState(5);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [view, setView] = useState([]);
    const [newest, setNewest] = useState([]);

    const handlePage = (page) => {
        setCurrent(page);
        setPageStart((page - 1) * 5);
        setPageEnd(page * 5);
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllBlog();
            setData(res.data);
            setView(res.data.sort((a, b) => b.blog_view - a.blog_view).slice(0, 3));
            setNewest(res.data.sort((a, b) => a.blog_created_at - b.blog_created_at).slice(0, 3));
            setTotal(Math.ceil(res.data.length / 5));
            setLoading(true);
        }
        fetch();
    }, [])

    if (!loading) return <div className='box-loader'><span className="loader"></span></div>;

    return ( 
        <div className="mx-5 sm:mx-36 my-5">
            {/* <h1 className="text-center text-xl sm:text-3xl text-red-500 my-5" >Tin tức</h1> */}
            <div className="sm:flex sm:justify-between">
            <div className="hidden sm:block w-1/4">
                <div>
                    <div className="border-b border-red-500 py-2 w-11/12">
                        <label htmlFor="" className="px-4 py-2 bg-red-500 text-white rounded-md">Xem nhiều nhất</label>                    
                    </div>
                    {view.slice(0, 3).map((item, index) => (
                        <NewsItemVer key={index} data={item} />
                    ))}
                </div>
                <div>
                    <div className="border-b border-red-500 py-2 w-11/12">
                        <label htmlFor="" className="px-4 py-2 bg-red-500 text-white rounded-md">Mới nhất</label>
                    </div>
                    {newest.slice(0, 3).map((item, index) => (
                        <NewsItemVer key={index} data={item} />
                    ))}
                </div>
            </div>
            <div className="sm:w-3/4">
                <div className="border-b border-red-500 py-2">
                    <label htmlFor="" className="px-4 py-2 bg-red-500 text-white rounded-md">Tin tức</label>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-2 ">
                    {data.slice(pageStart, pageEnd).map((item, index) => (
                        <NewsItem key={index} data={item} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center mx-5 mb-3">
        {(() => {
          if (data.length > 0 && total > 1) {
            const result = [];
            for (let i = 1; i <= total; i++) {
              const handleClick = () => {
                handlePage(i);
              };
              result.push(
                <button
                  className={clsx(
                    "my-1 px-1 text-white py-1 hover:bg-yellow-400 mx-2 text-sm",
                    current === i ? "bg-yellow-400" : "bg-red-500"
                  )}
                  onClick={handleClick}
                >
                  {i}
                </button>
              );
            }
            return result;
          }
        })()}
      </div>
            </div>
        </div>
     );
}

export default News;