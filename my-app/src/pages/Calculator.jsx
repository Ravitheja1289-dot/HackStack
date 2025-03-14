import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator as CalculatorIcon, TrendingUp } from "lucide-react";
// import "./index.css";
// import "./App.css";
const Calculator = () => {
  const [investmentType, setInvestmentType] = useState("sip");
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [rateOfReturn, setRateOfReturn] = useState(10);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [chartData, setChartData] = useState([]);

  const calculateInvestment = () => {
    let finalAmount = 0;
    let yearlyData = [];
    const r = rateOfReturn / 100 / 12; // Monthly return rate

    if (investmentType === "sip") {
      for (let i = 1; i <= investmentPeriod * 12; i++) {
        finalAmount = (finalAmount + monthlyInvestment) * (1 + r);
        if (i % 12 === 0) {
          yearlyData.push({ year: i / 12, value: finalAmount.toFixed(2) });
        }
      }
    } else {
      finalAmount = initialInvestment * Math.pow(1 + rateOfReturn / 100, investmentPeriod);
      for (let i = 1; i <= investmentPeriod; i++) {
        yearlyData.push({ year: i, value: (initialInvestment * Math.pow(1 + rateOfReturn / 100, i)).toFixed(2) });
      }
    }

    setFutureValue(finalAmount.toFixed(2));
    setChartData(yearlyData);
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <CalculatorIcon size={28} /> Investment Calculator
      </h1>
      <p className="text-gray-400 mb-6">Estimate your future wealth based on investment type and return rates.</p>

      {/* Investment Type Selector */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${investmentType === "sip" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setInvestmentType("sip")}
        >
          SIP Calculator
        </button>
        <button
          className={`px-4 py-2 rounded-md ${investmentType === "lump" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setInvestmentType("lump")}
        >
          Lump Sum Calculator
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {investmentType === "lump" && (
          <div>
            <label className="block text-sm text-gray-300">Initial Investment ($)</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 text-white"
            />
          </div>
        )}

        {investmentType === "sip" && (
          <div>
            <label className="block text-sm text-gray-300">Monthly Investment ($)</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 text-white"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-300">Expected Annual Return Rate (%)</label>
          <input
            type="number"
            value={rateOfReturn}
            onChange={(e) => setRateOfReturn(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Investment Period (Years)</label>
          <input
            type="number"
            value={investmentPeriod}
            onChange={(e) => setInvestmentPeriod(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md border border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button className="w-full bg-green-500 p-3 rounded-md text-white font-bold hover:bg-green-600" onClick={calculateInvestment}>
        Calculate
      </button>

      {/* Results */}
      {futureValue > 0 && (
        <div className="mt-6 bg-gray-800 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp size={24} /> Future Investment Value
          </h2>
          <p className="text-green-400 text-2xl font-bold mt-2">${futureValue}</p>

          {/* Chart */}
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="year" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Investment Insights */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 Investment Insights</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📢 Compound Interest Matters</h3>
            <p className="text-gray-300">
              The longer you invest, the greater your returns due to compounding. Start early!
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📉 Market Fluctuations</h3>
            <p className="text-gray-300">
              Stay invested for long-term gains—short-term market dips are normal.
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📈 Diversify Wisely</h3>
            <p className="text-gray-300">
              Invest across different assets to minimize risks and maximize potential returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
