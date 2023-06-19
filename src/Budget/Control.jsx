import React, { createContext, useState } from "react";
export const Handle = createContext();
export default function Control({ children }) {
  const budget = {
    name: "",
    amount: "",
  };
  let expenses = {
    description: "",
    amount: "",
    category: "",
  };
  let [budgett, setBudget] = useState(budget);
  const [budgetdata, setData] = useState([]);
  const [expense, setExpense] = useState(expenses);
  const [userexpense, setUserexpense] = useState([]);
  let [expensess, setExpenses] = useState([]);
  return (
    <Handle.Provider
      value={{
        budget,
        budgett,
        setBudget,
        budgetdata,
        setData,
        expenses,
        expense,
        setExpense,
        userexpense,
        setUserexpense,
        expensess,
        setExpenses,
      }}
    >
      {children}
    </Handle.Provider>
  );
}
