"use client";

import { useState, useEffect } from "react";
import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Function to convert a date string to a month name
const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short' }); // 'short' will give "Jan", "Feb", etc.
};

// Function to get the month index (e.g., Jan = 0, Feb = 1, ..., Dec = 11)
const getMonthIndex = (monthName) => {
  const monthMap = {
    'Jan': 0,
    'Feb': 1,
    'Mar': 2,
    'Apr': 3,
    'May': 4,
    'Jun': 5,
    'Jul': 6,
    'Aug': 7,
    'Sep': 8,
    'Oct': 9,
    'Nov': 10,
    'Dec': 11,
  };
  return monthMap[monthName];
};

// Get the current year
const currentYear = new Date().getFullYear();

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeResponse, expensesResponse] = await Promise.all([
          fetch('http://localhost:8080/api/income'), // Adjust URL as needed
          fetch('http://localhost:8080/api/expenses'),
        ]);

        const incomeData = await incomeResponse.json();
        const expensesData = await expensesResponse.json();

        // Filter the data to include only entries from the current year
        const filteredIncomeData = incomeData.filter(income => new Date(income.date).getFullYear() === currentYear);
        const filteredExpensesData = expensesData.filter(expense => new Date(expense.date).getFullYear() === currentYear);

        // Combine income and expenses data, aggregating by month
        const monthlyData = {};

        filteredIncomeData.forEach(income => {
          const month = getMonthName(income.date);
          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, incomes: 0, expenses: 0 };
          }
          monthlyData[month].incomes += parseFloat(income.amount); // Add income amount for the month
        });

        filteredExpensesData.forEach(expense => {
          const month = getMonthName(expense.date);
          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, incomes: 0, expenses: 0 };
          }
          monthlyData[month].expenses += parseFloat(expense.amount); // Add expense amount for the month
        });

        // Convert the monthlyData object into an array sorted by month index
        const chartData = Object.values(monthlyData).sort((a, b) => getMonthIndex(a.name) - getMonthIndex(b.name));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Monthly Recap - {currentYear}</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line type="monotone" dataKey="incomes" stroke="#18C212FF" strokeDasharray="3 4 5 2" />
          <Line type="monotone" dataKey="expenses" stroke="#EC0E1CFF" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
