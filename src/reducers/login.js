const initState =  null;
function Login(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            return state = action.payload;
        default:
            return state;
    }
}

export default Login;
