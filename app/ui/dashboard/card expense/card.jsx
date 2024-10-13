"use client"
import { useEffect, useState } from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
  const [totalExpense, setTotalExpense] = useState(0);

  // Fetch all Expense records
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/expenses'); // Adjust the endpoint as necessary
        if (response.ok) {
          const data = await response.json();
          // Calculate the total Expense by summing the amounts
          const total = data.reduce((sum, expense) => sum + expense.amount, 0);
          setTotalExpense(total);
        } else {
          console.error('Failed to fetch expense records.');
        }
      } catch (error) {
        console.error('Error fetching expense records:', error);
      }
    };

    fetchExpenses();
  }, []);
    // { item }
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>total expenses
            {/* {item.title}  */}
            </span>
        <span className={styles.number}>{totalExpense.toLocaleString('ms-MY', {
            style: 'currency',
            currency: 'MYR',
          })}
            {/* {item.number} */}
            </span>
        <span className={styles.detail}>
            <span className={styles.positive}>12%</span>
          {/* <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week */}
        </span>
      </div>
    </div>
  );
};

export default Card;