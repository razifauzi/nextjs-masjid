"use client"
import { useEffect, useState } from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
  const [totalIncome, setTotalIncome] = useState(0);

  // Fetch all income records
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/income'); // Adjust the endpoint as necessary
        if (response.ok) {
          const data = await response.json();
          // Calculate the total income by summing the amounts
          const total = data.reduce((sum, income) => sum + income.amount, 0);
          setTotalIncome(total);
        } else {
          console.error('Failed to fetch income records.');
        }
      } catch (error) {
        console.error('Error fetching income records:', error);
      }
    };

    fetchIncomes();
  }, []);

    // { item }
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>total income
            {/* {item.title}  */}
            </span>
        <span className={styles.number}>{totalIncome.toLocaleString('ms-MY', {
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