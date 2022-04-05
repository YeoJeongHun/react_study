import { combineReducers } from "redux";
import todo from  "./modules/todo";
import article from './modules/article'

export default combineReducers({
    todo,
    article
});