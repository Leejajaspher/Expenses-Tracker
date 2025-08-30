import { useState } from "react";

function FiltersPage({ expenses }) {
  const [category, setCategory] = useState("All");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredExpenses = expenses
    .filter((exp) => (category === "All" ? true : exp.category === category))
    .filter((exp) => (minAmount ? exp.amount >= minAmount : true))
    .filter((exp) => (maxAmount ? exp.amount <= maxAmount : true))
    .filter((exp) => (fromDate ? new Date(exp.date) >= new Date(fromDate) : true))
    .filter((exp) => (toDate ? new Date(exp.date) <= new Date(toDate) : true))
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date) - new Date(a.date);
      if (sortBy === "amount") return b.amount - a.amount;
      return 0;
    });

  return (
    <div className="max-w-3xl mx-auto bg-indigo-400/25 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center sm:text-left">
        Filter Expenses
      </h2>

      {/* Form Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Category */}
        <div>
          <label className="block text-white mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2  bg-white border rounded-lg"
          >
            <option>All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Others</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-white mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 bg-white border rounded-lg"
          >
            <option value="recent">Most Recent</option>
            <option value="amount">Highest Amount</option>
          </select>
        </div>

        {/* Min Amount */}
        <div>
          <label className="block text-white mb-1">Min Amount</label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-full p-2 bg-white border rounded-lg"
            placeholder="e.g. 100"
          />
        </div>

        {/* Max Amount */}
        <div>
          <label className="block text-white mb-1">Max Amount</label>
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="w-full p-2 bg-white border rounded-lg"
            placeholder="e.g. 1000"
          />
        </div>

        {/* Date Range */}
        <div className="sm:col-span-2">
          <label className="block text-white mb-1">Date Range</label>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-2 bg-white border rounded-lg"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-2 bg-white border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Filtered Expenses List */}
      <ul className="space-y-3 bg-white/50 p-4 rounded-lg">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-black">
            No matching expenses found
          </p>
        ) : (
          filteredExpenses.map((exp) => (
            <li
              key={exp.id}
              className="p-3 border rounded-lg hover:bg-gray-50 transition"
            >
              <p className="font-medium text-black">
                ₹{exp.amount} — {exp.category}
              </p>
              <p className="text-sm text-black">
                {exp.date} | {exp.note || "No note"}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FiltersPage;
