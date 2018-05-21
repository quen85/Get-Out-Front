const initialState = {list: [], loading: true, event: {}, loadingSingle: true};

function events(state = initialState, action) {
    switch (action.type) {
        case "LOAD_EVENTS":
            return { ...state, list: action.events, loading: false, loadingSingle: true } ;
        case "LOAD_SINGLE_EVENT":
            return { ...state, loading: false, event: action.event, loadingSingle: false } ;
        case "UNSUBSCRIBE_EVENT":
            const list = action.events.concat()
            return { ...state, list: list, event: action.event }
        case "SUBSCRIBE_EVENT":
            const newlist = action.events.concat()
            return { ...state, list: newlist, event: action.event }
        default:
            return state;
    }
}


export default events;