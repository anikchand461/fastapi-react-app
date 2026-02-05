// import logo from "./logo.svg";
// import "./App.css";
//
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello</h1>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import api from "./api";

// ✅ Fixed: Component name starts with capital letter
const App = () => {
  const [transactions, setTransactions] = useState([]);
  // ✅ Fixed: Consistent variable naming (camelCase)
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/");
      setTransactions(response.data);
    } catch (err) {
      setError("Failed to load transactions: " + err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    // ✅ Fixed: Consistent variable name
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/transactions/", formData);
      fetchTransactions();
      setFormData({
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: "",
      });
    } catch (err) {
      setError("Failed to create transaction: " + err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Finance App
          </a>
        </div>
      </nav>

      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="is_income" className="form-label">
              Income ?
            </label>
            <input
              type="checkbox"
              id="is_income"
              name="is_income"
              onChange={handleInputChange}
              value={formData.is_income}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              onChange={handleInputChange}
              value={formData.date}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Income ?</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.amount}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.is_income ? "Yes" : "No"}</td>
                    <td>{transaction.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default App;
