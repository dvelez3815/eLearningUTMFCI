
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import progressReducer from './ProgressDucks';
import taskReducer from './TaskDucks';
import questionReducer from './QuestionDucks';
import userReducer from './UserDucks';

const rootReducer = combineReducers({
   user: userReducer,
   progress: progressReducer,
   task: taskReducer,
   question: questionReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore (){
   const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
   return store;
}