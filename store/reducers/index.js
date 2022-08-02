import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";

const rootReducer = combineReducers({
  collection: collectionReducer,
});

export default rootReducer;
