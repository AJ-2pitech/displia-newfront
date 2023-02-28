import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, allUsersReducer, customerDetailsReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer,
    customerDetails: customerDetailsReducer
});

const middleware = [thunk];

let initialState = {};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;