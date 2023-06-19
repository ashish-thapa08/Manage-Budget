import React, { useState, useEffect, useContext } from "react";
import Expense from "./Expense";
import Modal from "react-bootstrap/Modal";
import addglow from "./budget.module.css";
import Logo from "../logo.png";
import { Handle } from "./Control";
export default function Budget() {
  const { budget, budgett, setBudget, budgetdata, setData } =
    useContext(Handle);
  let Input = (event) => {
    let { name, value } = event.target;
    setBudget((content) => {
      return { ...content, [name]: value };
    });
  };
  let [valid1, setValid1] = useState("");
  let [totalbudgetAmount, settotalBudget] = useState(0);
  const [test, setTest] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let Valid1 = () => {
    setValid1("");
  };
  let Add = (budgets) => {
    let check = budgetdata.filter((curval) => {
      return curval.budget === budgets.budget;
    });
    console.log(check.length);
    if (budgett.name === "") {
      setValid1("Input is Mandatory !!!");
    } else if (budgett.amount === "") {
      setValid1("Input is Mandatory !!!");
    } else if (budgett.amount < 1) {
      setValid1("Invalid Amount !!!");
    }
    // else if (budgetdataa.length < 1) {
    //     setData((data) => {
    //         return [...data, budgets]
    //     })
    //     setBudget(budget);
    //     setValid1("");
    // }
    else if (check.length < 1) {
      setData((data) => {
        return [...data, budgets];
      });
      setBudget(budget);
      setValid1("");
    } else {
      alert(`${budgets.budget} already exists!!!`);
      setValid1("");
    }
  };
  return (
    <>
      <div className="container">
        <div className="header shadow-sm p-3 border border-1 bg-white postion-fixed mt-1">
          <div className="d-flex justify-content-between">
            <h5 className="fw-bolder">My Budget</h5>
            <button
              className={`btn btn-primary ${
                budgetdata.length < 1 ? addglow.glow : `shadow-lg`
              }`}
              onClick={handleShow}
            >
              Add Budget
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <Expense data={budgetdata} />
        </div>
        {budgetdata.length > 0 && (
          <>
            <hr />
            <div className="card p-2 shadow-sm rounded">
              <h6 className="fw-bold">
                Total Budget Amounts:
                <span className="fw-light ms-1">
                  $
                  {budgetdata.reduce((total, curval) => {
                    return (total += parseFloat(curval.amount));
                  }, 0)}
                </span>
              </h6>
            </div>
          </>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="fw-bold">New Budget</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label for="budget" className="form-label">
                  Name
                </label>
                <input
                  onKeyUp={Valid1}
                  onChange={Input}
                  required
                  type="text"
                  name="name"
                  value={budgett.name}
                  className="text-capitalize form-control"
                  id="budget"
                />
                {budgett.name === "" && (
                  <span className="text-danger">{valid1}</span>
                )}
              </div>
              <div className="mb-3">
                <label for="expenseamount" className="form-label">
                  Maximum Spending
                </label>
                <input
                  onKeyUp={Valid1}
                  onChange={Input}
                  required
                  type="number"
                  min={1}
                  name="amount"
                  value={budgett.amount}
                  className="form-control"
                  id="expenseamount"
                />
                {budgett.amount === "" ? (
                  <span className="text-danger">{valid1}</span>
                ) : (
                  budget.amount < 1 && (
                    <span className="text-danger">{valid1}</span>
                  )
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-success shadow"
              variant="primary"
              onClick={() =>
                Add({ budget: budgett.name, amount: budgett.amount })
              }
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <footer className="bg-light mt-2 position-fixed left-0 w-100 bottom-0 text-center p-2 shadow-sm">
        <span className="fs-6 fw-bold">
          Developed by:{" "}
          <span>
            <img
              src={Logo}
              width="60"
              height="34"
              className="d-inline-block align-top"
              alt="logo"
            />
          </span>
          <span className="text-secondary fw-normal ms-1"> Ashish Thapa</span>
        </span>
      </footer>
    </>
  );
}
