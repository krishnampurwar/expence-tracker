import { BILL_ACTION_TYPES } from "../action-types/bill.types";
import billList from "../../../Data.json"

const initialState = {
    bills:billList.bills,
    category:"",
    monthlyBudget:5000
}

const billReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case BILL_ACTION_TYPES.ADD_BILL:
            return {
                ...state,
                bills: payload
            }
        case BILL_ACTION_TYPES.EDIT_BILL:
            return {
                ...state,
                bills: payload
            }
        case BILL_ACTION_TYPES.DELETE_BILL:
            return {
                ...state,
                bills: payload
            }
        case BILL_ACTION_TYPES.FILTER_BILL:
            return{
                ...state,
                category:payload
            }    
        case BILL_ACTION_TYPES.MONTHLY_BUDGET:
            return{
                ...state,
                monthlyBudget:payload
            }    
        default:
            return state
    }
}

export default billReducers