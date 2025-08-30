import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FiltersPage from "./components/FiltersPage";
import ChartsPage from "./components/ChartsPage";

function App(){
  const [expenses, setExpenses] = useState([]);
 
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    console.log("Loaded from localStorage:", savedExpenses);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    console.log("Saving to localStorage:", expenses);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };
  
  const deleteExpense = (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtered);
  };

  const updateExpense = (id, updatedData) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === id ? { ...exp, ...updatedData } : exp
    );
    setExpenses(updatedExpenses);
  };

  return(
    <Router>
      <div className="min-h-screen bg-[url('images/bg.jpeg')] bg-cover bg-center bg-no-repeat">

      <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-900 shadow-md px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 mb-10">
  {/* Logo / Title */}
  <h1 className="text-lg sm:text-xl font-bold text-white">Expense Tracker</h1>

  {/* Links */}
  <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-0">
    <Link
      to="/"
      className="text-white font-medium sm:font-semibold hover:bg-indigo-400 px-3 py-1 rounded-lg transition"
    >
      Add Exp
    </Link>
    <Link
      to="/filters"
      className="text-white font-medium sm:font-semibold hover:bg-indigo-400 px-3 py-1 rounded-lg transition"
    >
      Filters
    </Link>
    <Link
      to="/charts"
      className="text-white font-medium sm:font-semibold hover:bg-indigo-400 px-3 py-1 rounded-lg transition"
    >
      Charts
    </Link>
  </div>
</nav>


            
    <Routes>
       <Route path="/" element={
        <>              
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div >
      <ExpenseForm addExpense={addExpense} />
      </div>

      <div>
        <ExpenseList expenses={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense} />
      </div>
      </div>
      </>
        }   />

     <Route path="/filters" element={<FiltersPage expenses={expenses} />} />   
     <Route path="/charts" element={<ChartsPage expenses={expenses} />} />    
    </Routes >
  </div>
</Router>
);
}
git
export default App;
