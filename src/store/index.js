import { combineReducers } from "redux";
import todo from  "./modules/todo";
import article from './modules/article'
import mainStatus from './modules/mainStatus'

export default combineReducers({
    todo,
    article,
    mainStatus,
});