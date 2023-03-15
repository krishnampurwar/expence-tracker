import { BILL_ACTION_TYPES } from "../action-types/bill.types";

export const addBill = (bills, dataToAdd) => {
    const newBillList = [...bills, dataToAdd];
    return {
        type: BILL_ACTION_TYPES.ADD_BILL,
        payload: newBillList
    }
}

export const editBill = (bills, dataToEdit, id) => {
    const idx = bills.findIndex((bill) => bill.id === id);
    const newBillList = [...bills]
     newBillList[idx] = dataToEdit

    return {
        type: BILL_ACTION_TYPES.EDIT_BILL,
        payload: newBillList
    }
}
export const deleteBill = (bills, id) => {
    const newBillList = bills.filter((bill) => bill.id !== id)
    return {
        type: BILL_ACTION_TYPES.DELETE_BILL,
        payload: newBillList
    }
}

export const filterBillCategory = (category)=>{
    return{
        type: BILL_ACTION_TYPES.FILTER_BILL,
        payload: category
    }
}
export const editBudget =(value)=>{
    return{
        type: BILL_ACTION_TYPES.MONTHLY_BUDGET,
        payload: value
    }
}