import React, { useState, useEffect, useContext, useCallback } from "react";
import { Handle } from "./Control";
import Modal from "react-bootstrap/Modal";
import mathSum from "math-sum";
export default function Expense() {
  const {
    budgetdata,
    setData,
    expenses,
    expense,
    setExpense,
    userexpense,
    setUserexpense,
    expensess,
    setExpenses,
  } = useContext(Handle);
  const [show, setShow] = useState(false);
  const [budget, setBudget] = useState();
  let [valid1, setValid1] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showw, setShoww] = useState(false);
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  let [total, setTotal] = useState(0);
  const Removebudget = useCallback((id) => {
    //alert(id);
    let confirm = window.confirm("Are You Sure Want to Delete?");
    if (confirm) {
      const budget = id;
      const filterData = budgetdata.filter((curval) => {
        return curval.budget !== budget;
      });
      setData(filterData);
      if (filterData) {
        const filterExpense = userexpense.filter((curval, index) => {
          return curval.category !== budget;
        });
        console.log(filterExpense);
        setUserexpense(filterExpense);
        setExpenses(filterExpense);
      }
    }
  });
  let Input = (event) => {
    let { name, value } = event.target;
    setExpense((data) => {
      return { ...data, [name]: value };
    });
  };
  let Addexpense = (index) => {
    setBudget(index);
    handleShow();
  };
  let Valid1 = () => {
    setValid1("");
  };
  let Add = (data) => {
    if (expense.description === "") {
      setValid1("Input is Mandatory !!!");
    } else if (expense.amount === "") {
      setValid1("Input is Mandatory !!!");
    } else if (expense.amount < 1) {
      setValid1("Invalid Amount !!!");
    } else if (expense.category === "category") {
      setValid1("Input is Mandatory !!!");
    } else {
      console.log(data);
      const exist = userexpense.find((curval) => {
        return (
          curval.description === data.description &&
          curval.category === data.category
        );
      });
      if (exist) {
        setUserexpense(
          userexpense.map((curval) => {
            return curval.description === exist.description &&
              curval.category === exist.category
              ? {
                  ...curval,
                  amount: mathSum(
                    parseFloat(exist.amount),
                    parseFloat(data.amount)
                  ),
                }
              : curval;
          })
        );
        setExpense(expenses);
      } else {
        setUserexpense((budgets) => {
          return [...budgets, data];
        });
        setExpense(expenses);
      }
      //handleClose();
    }
  };

  let Viewexpense = (index) => {
    let data = userexpense.filter((curval) => {
      return curval.category === index;
    });

    handleShoww();
    setExpenses(data);
    setBudget(index);
  };
  let Removeexpense = useCallback(
    (index) => {
      let data = expensess.filter((curval) => {
        return curval.description !== index.expense;
      });
      if (data) {
        let check = userexpense.filter((curval) => {
          return curval.description !== index.expense;
        });
        setUserexpense(check);
        setExpenses(data);
      }
    },
    [userexpense, expensess]
  );
  let Deleteallexpenses = useCallback(
    (name) => {
      let confirm = window.confirm("Are You Sure Want to Delete?");
      if (confirm) {
        let data = expensess.filter((curval) => {
          return curval.category !== name;
        });
        if (data) {
          let check = userexpense.filter((curval) => {
            return curval.category !== name;
          });
          setUserexpense(check);
          setExpenses(data);
        }
      }
    },
    [userexpense, expensess]
  );
  return (
    <>
      {budgetdata.length < 1 ? (
        <>
          <div className="container">
            <div
              class="alert alert-warning shadow-sm rounded-start"
              role="alert"
            >
              There are no Budgets!!!
            </div>
          </div>
        </>
      ) : (
        budgetdata.map((curval, index) => {
          return (
            <>
              <div
                className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12"
                key={index}
              >
                <div className="card mb-3 shadow-sm bg-light">
                  <div className="card-body">
                    <form>
                      <label for="customRange2" className="form-label fs-4">
                        {curval.budget}
                      </label>
                      <span className="float-end">
                        <span className=" fw-bold">
                          {
                            <span>
                              {mathSum(
                                userexpense
                                  .filter((curvall) => {
                                    return curvall.category === curval.budget;
                                  })
                                  .map((current) => {
                                    return parseInt(current.amount);
                                  })
                              ) <= curval.amount ? (
                                <span className="text-dark">
                                  ${" "}
                                  {mathSum(
                                    userexpense
                                      .filter((curvall) => {
                                        return (
                                          curvall.category === curval.budget
                                        );
                                      })
                                      .map((current) => {
                                        return parseInt(current.amount);
                                      })
                                  )}
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <span className="fs-6 bg-danger p-2 text-white me-1 shadow-sm rounded-pill">
                                    Over Budget !
                                  </span>
                                  ${" "}
                                  {mathSum(
                                    userexpense
                                      .filter((curvall) => {
                                        return (
                                          curvall.category === curval.budget
                                        );
                                      })
                                      .map((current) => {
                                        return parseInt(current.amount);
                                      })
                                  )}
                                </span>
                              )}
                            </span>
                          }
                        </span>
                        <span className="fs-6 fw-light">/${curval.amount}</span>
                      </span>
                      <input
                        type="range"
                        className="form-range"
                        value={mathSum(
                          userexpense
                            .filter((curvall) => {
                              return curvall.category === curval.budget;
                            })
                            .map((current) => {
                              return parseInt(current.amount);
                            })
                        )}
                        min="0"
                        max={curval.amount}
                        id="customRange2"
                      ></input>
                    </form>
                    <div className="d-flex m-1">
                      <button
                        className="btn btn-outline-primary sm:ms-2"
                        onClick={() => Addexpense(curval.budget)}
                      >
                        Add Expense
                      </button>
                      <button
                        className="btn btn btn-outline-dark ms-2"
                        onClick={() => Viewexpense(curval.budget)}
                      >
                        View Expense
                      </button>
                      <button
                        className="btn btn-outline-danger ms-2"
                        onClick={() => Removebudget(curval.budget)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-bold">New Expense - {budget}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label for="budget" className="form-label">
                Description
              </label>
              <input
                onKeyUp={Valid1}
                onChange={Input}
                required
                type="text"
                name="description"
                value={expense.description}
                className="form-control text-capitalize"
                id="budget"
              />
              {expense.description === "" && (
                <span className="text-danger">{valid1}</span>
              )}
            </div>
            <div className="mb-3">
              <label for="expenseamount" className="form-label">
                Amount
              </label>
              <input
                onKeyUp={Valid1}
                onChange={Input}
                required
                type="number"
                min={1}
                name="amount"
                value={expense.amount}
                className="form-control"
                id="expenseamount"
              />
              {expense.amount === "" ? (
                <span className="text-danger">{valid1}</span>
              ) : (
                expense.amount < 1 && (
                  <span className="text-danger">{valid1}</span>
                )
              )}
            </div>
            <div className="mb-3">
              <select
                onKeyUp={Valid1}
                onChange={Input}
                name="category"
                class="form-select"
                id="category"
                aria-label="Default select example"
              >
                <option selected value="category">
                  Open this select menu
                </option>
                {budgetdata.map((curval, index) => {
                  return (
                    <>
                      <option value={curval.budget} key={index}>
                        {curval.budget}
                      </option>
                    </>
                  );
                })}
              </select>
              {expense.category === "category" && (
                <span className="text-danger">{valid1}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-success shadow"
            variant="primary"
            onClick={() => {
              Add({
                description: expense.description,
                amount: expense.amount,
                category: expense.category,
              });
            }}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
      {/* Respective Expenses */}
      <Modal show={showw} onHide={handleClosee}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-bold">Expenses - {budget}</span>
            {userexpense.length > 0 && (
              <span
                className="btn btn-outline-danger ms-2"
                onClick={() => {
                  Deleteallexpenses(budget);
                }}
              >
                Delete
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {expensess.length < 1 ? (
            <>
              <div
                class="alert alert-warning shadow-sm rounded-start"
                role="alert"
              >
                There are no Expenses!!!
              </div>
            </>
          ) : (
            expensess.map((curval, index) => {
              return (
                <>
                  <div className="pl-2" key={index}>
                    <h5>
                      {curval.description}
                      <span className="fw-bold ms-2">- $ {curval.amount}</span>
                      <span className="float-end mb-2">
                        <button
                          className="btn btn-outline-danger "
                          onClick={() =>
                            Removeexpense({
                              index: index,
                              expense: curval.description,
                            })
                          }
                        >
                          Remove
                        </button>
                      </span>
                    </h5>
                  </div>
                  <hr className="w-100 mx-auto" />
                </>
              );
            })
          )}
          {expensess.length > 0 && (
            <>
              <h5 className="fw-bold">
                Total:
                <span className="fw-light ms-1">
                  $
                  {expensess.reduce((total, curval) => {
                    return (total += parseFloat(curval.amount));
                  }, 0)}
                </span>
              </h5>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
