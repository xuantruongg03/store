const init = null;

const blogReducer = (state = init, action) => {
    switch (action.type) {
        case "GET_BLOG_DETAIL":
            return action.data;
        default:
            return state;
    }
}

export default blogReducer;