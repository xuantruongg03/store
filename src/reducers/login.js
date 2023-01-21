const initState =  null;
function Login(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            return state = action.data;
        default:
            return state;
    }
}

export default Login;
