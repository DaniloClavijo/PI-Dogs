import {createStore , applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// me importo el reducer 
import rootReducer from '../reducer'
const store = createStore(rootReducer , composeWithDevTools(applyMiddleware(thunk)))
export default store 
