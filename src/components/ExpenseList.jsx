import { useState, useRef } from "react";

function ExpenseList({ expenses, deleteExpense, updateExpense }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const editInputsRef = useRef([]);

  const startEditing = (exp) => {
    setEditingId(exp.id);
    setEditData({
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      note: exp.note,
    });
    setTimeout(() => {
      if (editInputsRef.current[0]) {
        editInputsRef.current[0].focus();
      }
    }, 0);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditKeyDown = (e, idx) => {
    const nextInput = editInputsRef.current[idx + 1];
    if (e.key === "Enter" && nextInput) {
      e.preventDefault();
      nextInput.focus();
    }
  };

  const saveEdit = () => {
    updateExpense(editingId, editData);
    setEditingId(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800/50 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Expense List</h2>

      <ul className="space-y-4 bg-white/50 p-4 rounded-lg">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-lg hover:bg-gray-50 gap-3"
          >
            {editingId === exp.id ? (
              <div className="flex flex-col w-full space-y-2">
                <input
                  type="number"
                  name="amount"
                  value={editData.amount}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                  ref={(el) => (editInputsRef.current[0] = el)}
                  onKeyDown={(e) => handleEditKeyDown(e, 0)}
                />

                <select
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                  ref={(el) => (editInputsRef.current[1] = el)}
                  onKeyDown={(e) => handleEditKeyDown(e, 1)}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Bills</option>
                  <option>Others</option>
                </select>

                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                  ref={(el) => (editInputsRef.current[2] = el)}
                  onKeyDown={(e) => handleEditKeyDown(e, 2)}
                />

                <input
                  type="text"
                  name="note"
                  value={editData.note}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                  placeholder="Optional note"
                  ref={(el) => (editInputsRef.current[3] = el)}
                  onKeyDown={(e) => handleEditKeyDown(e, 3)}
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex-1 sm:flex-none bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                    ref={(el) => (editInputsRef.current[4] = el)}
                    onKeyDown={(e) => handleEditKeyDown(e, 4)}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 sm:flex-none bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    ₹{exp.amount} — {exp.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    {exp.date} | {exp.note || "No note"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => startEditing(exp)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
