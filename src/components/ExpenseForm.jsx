import { useRef, useState } from "react";

function ExpenseForm({ addExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const inputsRef = useRef([]);

  const handleKeyDown = (e, index) => {
    const nextInput = inputsRef.current[index + 1];
    if (e.key === "Enter" && nextInput) {
      e.preventDefault();
      nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date || !category) {
      alert("Please enter amount, category, and date!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date,
      note,
    };

    addExpense(newExpense);

    // Reset form
    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-indigo-400/25 p-4 sm:p-6 md:p-8 rounded-2xl shadow-md w-full max-w-lg mx-auto mb-6"
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center text-white">
        Add Expense
      </h2>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-white mb-1 text-sm sm:text-base">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base"
          placeholder="Enter amount"
          ref={(el) => (inputsRef.current[0] = el)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-white mb-1 text-sm sm:text-base">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 sm:p-3 bg-white border rounded-lg text-sm sm:text-base"
          ref={(el) => (inputsRef.current[1] = el)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
        >
          <option value="" disabled hidden>
            Select category
          </option>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Others</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-white mb-1 text-sm sm:text-base">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base"
          ref={(el) => (inputsRef.current[2] = el)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
        />
      </div>

      {/* Note */}
      <div className="mb-4">
        <label className="block text-white mb-1 text-sm sm:text-base">Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base"
          placeholder="Optional note"
          ref={(el) => (inputsRef.current[3] = el)}
          onKeyDown={(e) => handleKeyDown(e, 3)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          ref={(el) => (inputsRef.current[4] = el)}
          onKeyDown={(e) => handleKeyDown(e, 4)}
          className="bg-purple-800 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg shadow-xl hover:bg-purple-600 transition text-sm sm:text-base"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
