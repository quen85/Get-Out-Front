const initialState = {user: {}};

function user(state = initialState, action) {
    switch (action.type) {
        case "CREATE_USER":
            return { user: action.user } ;
        case "LOAD_USER":
            return { user: action.user } ;
        case "UPDATE_USER":
            return { user: action.user } ;
        case "UNSUBSCRIBE_USER":
            return { user: action.user }
        case "SUBSCRIBE_USER":
            return { user: action.user }
        default:
            return state;
    }
}


export default user;