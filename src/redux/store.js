import { combineReducers, createStore, applyMiddleware } from 'redux';

import events from './reducers/events';
import navigation from "./reducers/navigation";
import user from "./reducers/user";

let rootReducer = combineReducers({ events, user });
let store = createStore(rootReducer);

export default store;