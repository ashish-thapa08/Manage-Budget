import React, { useState, useEffect } from 'react'
import Expense from './Expense'
import Modal from 'react-bootstrap/Modal';
import addglow from './budget.module.css'
import Logo from '../logo.png'
export default function Budget() {
    const budget = {
        name: '',
        amount: ''
    }
    let [budgett, setBudget] = useState(budget);
    let Input = (event) => {
        let { name, value } = event.target
        setBudget((content) => {
            return { ...content, [name]: value }
        })
    }
    let [valid1, setValid1] = useState("");
    const [budgetdata, setData] = useState([]);
    const [budgetdataa, setDataa] = useState([]);
    let [totalbudgetAmount, settotalBudget] = useState(0);
    const [test, setTest] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let Valid1 = () => {
        setValid1("");
    }
    let Add = (budgets) => {
        let check = budgetdataa.filter((curval) => {
            return curval.budget === budgets.budget
        })
        if (budgett.name === "") {
            setValid1("Input is Mandatory !!!")
        }
        else if (budgett.amount === "") {
            setValid1("Input is Mandatory !!!")
        }
        else if (budgett.amount < 1) {
            setValid1("Invalid Amount !!!")
        }
        else if (budgetdataa.length < 1) {
            setData((data) => {
                return [...data, budgets]
            })
            setBudget(budget);
            setValid1("");
        }
        else if (check.length < 1) {
            setData((data) => {
                return [...data, budgets]
            })
            setBudget(budget);
            setValid1("")
        }
        else {
            alert(`${budgets.budget} already exists!!!`)
            setValid1("")
        }

        setTest(true);
    }
    useEffect(() => {
        if (test) {
            settotalBudget(budgetdata.reduce((total, curval) => total += parseFloat(curval.amount), 0));
            setDataa(budgetdata);
            setTest(false);
        }
    }, [test])
    return (
        <>
            <div className='container'>
                <div className='header shadow-sm p-3 border border-1 bg-white position-sticky'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='fw-bolder'>My Budget</h5>
                        <button className={`btn btn-primary ${budgetdata.length < 1 ? addglow.glow : `shadow-lg`}`} onClick={handleShow}>Add Budget</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    <Expense data={budgetdata} />
                </div>
                {
                    totalbudgetAmount > 0 && (<>
                        <hr />
                        <h5 className='fw-bold'>Total Budget Amounts: <span className='fw-light'>$ {totalbudgetAmount.toFixed(2)}</span></h5>
                    </>)
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><span className='fw-bold'>New Budget</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label for="budget" className="form-label">Name</label>
                                <input onKeyUp={Valid1} onChange={Input} required type="text" name='name' value={budgett.name} className="form-control" id="budget" />
                                {budgett.name === "" && (
                                    <span className='text-danger'>{valid1}</span>
                                )}
                            </div>
                            <div className="mb-3">
                                <label for="expenseamount" className="form-label">Maximum Spending</label>
                                <input onKeyUp={Valid1} onChange={Input} required type="number" min={1} name='amount' value={budgett.amount} className="form-control" id="expenseamount" />
                                {budgett.amount === "" ? (
                                    <span className='text-danger'>{valid1}</span>
                                ) : budget.amount < 1 && (
                                    <span className='text-danger'>{valid1}</span>
                                )}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-success shadow' variant="primary" onClick={() => Add({ budget: budgett.name, amount: budgett.amount })}>
                            Add
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <footer className='fixed-bottom bg-light text-center p-2 shadow-sm'>
                <span className='fs-6 fw-bold'>Developed by: <span><img
                    src={Logo}
                    width="60"
                    height="34"
                    className="d-inline-block align-top"
                    alt="logo"
                /></span><span className='text-secondary fw-normal ms-1'> Ashish Thapa</span></span>
            </footer>
        </>
    )
}
