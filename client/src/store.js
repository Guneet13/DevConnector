import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk'; // breaking data into chunks
import rootReducer from './reducers';// will refer to index.js file

const middleware = [thunk];
const store = createStore(
              rootReducer, // list of all reducers 
              {}, 
              compose( 
                applyMiddleware(...middleware),
                 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
              ));

export default store;
