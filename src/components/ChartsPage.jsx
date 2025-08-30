import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444"];

function ChartsPage({ expenses }) {
  const categoryData = ["Food", "Travel", "Bills", "Others"].map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthData = monthNames.map((month, idx) => {
    const total = expenses
      .filter((e) => new Date(e.date).getMonth() === idx)
      .reduce((sum, e) => sum + e.amount, 0);
    return { month, total };
  });

  return (
    <div className="max-w-6xl mx-auto bg-black/25 p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
        Expense Visualizations
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="w-full">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-white text-center">
            Category-wise Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-full">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-white text-center">
            Month-wise Spending
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#4F46E5" name="Total Spent (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsPage;
