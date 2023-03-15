import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addBill, filterBillCategory } from "../../store/bill/actions/bill.action";
import { v4 as uuidv4 } from 'uuid';
import BillTable from "../../components/billTable/billTable"
import "./home.css";



const Home = () => {
  const [open, setOpen] = useState(false);
  const [dateVal, setDateVal] = useState("");
  const [data, setData] = useState({
    description: '',
    category: '',
    amount: '',
    date: ''
  })
  const [category, setCategory] = useState("")

  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.bills)

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setData({
      description: '',
      category: '',
      amount: '',
      date: ''
    })
    setDateVal("")
    setOpen(false);
  }


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).split("/").join("-");
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setData({
      ...data,
      date: formatDate(newDate)
    })
    setDateVal(newDate);
  };

  const handleAdd = () => {
    if (!validateData(data)) return
    dispatch(addBill(bills, { ...data, id: uuidv4() }))
    setData({
      description: '',
      category: '',
      amount: '',
      date: ''
    })
    setDateVal("")
    setOpen(false);
  }

  const filterCategory = (e) => {
    const value = e.target.value
    setCategory(value)
    dispatch(filterBillCategory(value))
  }

  const validateData = (data) => {
    if (!data.description.length) {
      alert("Please add description")
      return false
    }
    if (!data.category.length) {
      alert("Please add category")
      return false
    }
    if (!data.amount.length) {
      alert("Please add amount")
      return false
    }
    if (!data.date.length) {
      alert("Please add date")
      return false
    }
    return true
  }

  return (
    <>
      <div className="home">
        <div className="add-bill filter-category">
          
          <button
            variant="contained"
            className="add-bill-btn"
            onClick={handleOpen}
          >
            New Bill
          </button>
          {bills.length ? (
            <select
              size="small"
              name="category"
              value={category}
              onChange={filterCategory}
              displayEmpty
              color="success"
              sx={{ marginLeft: "1rem" }}
            >
              <option value="">
                All Categories
              </option>
              <option value="Shopping">Shopping</option>
              <option value="Food ">Food & Dining</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Medical">Medical</option>
              <option value="Others">Others</option>
              
            </select>
          ) : null}
        </div>

        <BillTable />

      </div>
      <div
        open={open}
        onClose={handleClose}
      >
        <div className="add-bill-modal">
          <h4>Add Bill Details</h4>
          <div
            label="Description"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginTop: "1rem", color: "#17c95f" }}
            name="description"
            value={data.description}
            onChange={handleInput}
            color="success"
          />
          <div
            label="Amount ₹"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginTop: "1rem", color: "#17c95f" }}
            name="amount"
            value={data.amount}
            onChange={handleInput}
            color="success"
          />
          <select
            size="small"
            sx={{ marginTop: "1rem", color: "#17c95f" }}
            fullWidth
            name="category"
            value={data.category}
            onChange={handleInput}
            displayEmpty
            color="success"
          >
            <option value="">
              Category
            </option>
            <option value="Utility">Utility</option>
            <option value="Shopping">Shopping</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="date"
            value={dateVal}
            onChange={handleDateChange}
            name="date"
            className="date-input"
          />
          <div className="add-bill-modal-btns">
            <button variant="contained" color="success" sx={{ marginRight: "1rem" }} size="small" onClick={handleAdd}>
              ADD
            </button>
            <button variant="outlined" color="error" size='small' onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home