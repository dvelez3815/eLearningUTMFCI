
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import progressReducer from './ProgressDucks';
import taskReducer from './TaskDucks';

const rootReducer = combineReducers({
  /*  usuarios: userReducer,  */
   progress: progressReducer,
   task: taskReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore (){
   const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
   return store;
}