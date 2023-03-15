import { combineReducers } from 'redux';
import billReducers from './bill/reducers/bill.reducer';

const rootReducer = combineReducers({
    bills: billReducers
})

export default rootReducer