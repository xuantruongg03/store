const init = null;

const blogReducer = (state = init, action) => {
    switch (action.type) {
        case "GET_BLOG_DETAIL":
            return action.data;
        case "GET_BLOG_DETAIL_FAIL":
            return null;
        default:
            return state;
    }
}

export default blogReducer;