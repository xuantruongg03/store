import axiosClient from "./axiosClient";

const postBlog = (params) => {
    const url = '/post-blog';
    return axiosClient.post(url, params);
}

const getAllBlog = () => {
    const url = '/get-all-blog';
    return axiosClient.get(url);
}

const rateBlog = (params) => {
    const url = '/rate-blog';
    return axiosClient.post(url, params);
}

const getBlogDetail = (params) => {
    const url = '/get-blog-detail?blog_id=' + params;
    return axiosClient.get(url);
}

export { postBlog, getAllBlog, rateBlog, getBlogDetail };