// reducers folder created indisde of /src

// 3) We import the combineReducers() function from redux to ... combine the reducers of oour application into one
import { combineReducers } from 'redux';
import todoReducer from './todoReducer';

// 3.1) This function combineReducers takes in an object. This object will have all of the reducers you choose to create for your app. The keys can be named anything but the value should coorespond to the correct reducer file

const reducers = combineReducers({
    todoReducer: todoReducer,
})

export default reducers;

