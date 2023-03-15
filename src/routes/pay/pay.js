import React, { useState } from 'react'
import "./pay.css"
import { useSelector, useDispatch } from 'react-redux';

import { editBudget } from "../../store/bill/actions/bill.action";

const Pay = () => {
  const [edit, setEdit] = useState(false)
  const [editBudgetValue, setEditBudgetValue] = useState("")

  const dispatch = useDispatch()
  const { bills, monthlyBudget } = useSelector((state) => state.bills)

  const totalBills = bills.reduce((tot, bill) => tot + parseInt(bill.amount), 0)
  const sortedBills = bills.sort((a, b) => a.amount - b.amount);
  let totalBillToPay = 0;
  let billCount = 0;
  for (let i = 0; i < sortedBills.length; i++) {
    totalBillToPay += parseFloat(sortedBills[i].amount);
    billCount++;
    if (totalBillToPay > monthlyBudget) {
      totalBillToPay = totalBillToPay - parseFloat(sortedBills[i].amount);
      billCount--
      break;
    }
  }

  const handleEdit = () => {
    setEdit(true)
    setEditBudgetValue(monthlyBudget)
  }

  const handleSave = () => {
    dispatch(editBudget(editBudgetValue));
    setEdit(false)
  }

  return (
    <>
      <div className="monthly-budget">
        <h3>Monthly Budget :
          {edit ? <div
            type="number"
            defaultValue={monthlyBudget}
            variant="filled"
            size="small"
            onChange={(e) => setEditBudgetValue(e.target.value)}
          />
            : `₹${monthlyBudget}`}

          {edit ? <div className='save' onClick={handleSave} />
            : <div className="edit" onClick={handleEdit} fontSize="small" />}
        </h3>
      </div>
      <table className="paid-bills-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th className="date-head">Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedBills.map((bill, index) => (
            <tr key={bill.id} className={index < billCount ? "highlight" : ""}>
              <td>{bill.description}</td>
              <td>{bill.category}</td>
              <td>₹ {bill.amount}</td>
              <td className="bill-date">{bill.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        <strong>Total Amount to be paid:</strong> ₹{totalBillToPay}
        {bills.length - billCount !== 0 ?
          <p className="remaining-amount">(Add ₹{totalBills - totalBillToPay} to your monthly budget to pay remaining {bills.length - billCount} bills)</p>
          : null}
      </div>
    </>
  );
}

export default Pay