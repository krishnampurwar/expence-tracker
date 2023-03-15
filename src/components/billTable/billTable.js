import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { editBill, deleteBill } from "../../store/bill/actions/bill.action";
import "./billTable.css";

const BillTable = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [dateVal, setDateVal] = useState("");
    const [data, setData] = useState({
        description: '',
        category: '',
        amount: '',
        date: ''
    })
    const [billId, setBillId] = useState("")

    const { bills, category } = useSelector((state) => state.bills)
    const dispatch = useDispatch();

    const handleEdit = (bill) => {
        setOpen(true)
        setData({
            description: bill.description,
            category: bill.category,
            amount: bill.amount,
            date: bill.date
        })
        setBillId(bill.id)
    }

    const handleDelete = (id) => {
        dispatch(deleteBill(bills, id));
        setOpenDelete(false)
        setBillId("")
    }

    const handleClose = () => {
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

    const handleSave = () => {
        if (!validateData(data)) return
        dispatch(editBill(bills, data, billId))
        setData({
            description: '',
            category: '',
            amount: '',
            date: ''
        })
        setDateVal("")
        setBillId("")
        setOpen(false);
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
            <table className="bill-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {category.length ? bills.filter(item => item.category === category).map((bill) => (
                        <tr key={bill.id}>
                            <td>{bill.description}</td>
                            <td>{bill.category}</td>
                            <td>{bill.amount}</td>
                            <td>{bill.date}</td>
                            <td>
                                <Button variant="contained" color="success" sx={{ marginRight: "1rem" }} size="small" onClick={() => handleEdit(bill)}>
                                    Edit
                                </Button>
                                <Button variant="outlined" color="error" size='small' onClick={() => handleDelete(bill.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                        : bills.map((bill) => (
                            <tr key={bill.id}>
                                <td>{bill.description}</td>
                                <td>{bill.category}</td>
                                <td>₹ {bill.amount}</td>
                                <td>{bill.date}</td>
                                <td>
                                    <Button variant="contained" color="success" sx={{ marginRight: "1rem" }} size="small" onClick={() => handleEdit(bill)}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size='small'
                                        onClick={() => {
                                            setOpenDelete(true)
                                            setBillId(bill.id)
                                        }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className="edit-bill-modal">
                    <h4>Edit Bill Details</h4>
                    <TextField
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
                    <TextField
                        label="Amount ₹"
                        type="number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ marginTop: "1rem", color: "#17c95f" }}
                        name="amount"
                        value={data.amount || ""}
                        onChange={handleInput}
                        color="success"
                    />
                    <Select
                        size="small"
                        sx={{ marginTop: "1rem", color: "#17c95f" }}
                        fullWidth
                        name="category"
                        value={data.category}
                        onChange={handleInput}
                        displayEmpty
                        color="success"
                    >
                        <MenuItem value="">
                            Category
                        </MenuItem>
                        <MenuItem value="Utility">Utility</MenuItem>
                        <MenuItem value="Shopping">Shopping</MenuItem>
                        <MenuItem value="Food & Dining">Food & Dining</MenuItem>
                        <MenuItem value="Personal Care">Personal Care</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Travel">Travel</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </Select>
                    <input
                        type="date"
                        value={dateVal}
                        onChange={handleDateChange}
                        name="date"
                        className="edit-date-input"
                    />
                    <div className="edit-bill-modal-btns">
                        <Button variant="contained" color="success" sx={{ marginRight: "1rem" }} size="small" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outlined" color="error" size='small' onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
            >
                <div className="modal-delete">
                    <h4>Are you sure you want to delete?</h4>
                    <div className="modal-delete-btns">
                        <Button variant="contained" color="success" sx={{ marginRight: "1rem" }} size="small" onClick={() => handleDelete(billId)}>
                            Yes
                        </Button>
                        <Button variant="outlined" color="error" size='small' onClick={() => setOpenDelete(false)}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default BillTable;
