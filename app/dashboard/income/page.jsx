"use client";
// import Search from "../../ui/dashboard/search/search";
import styles from '../../ui/dashboard/products/products.module.css'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Pagination from '../../ui/dashboard/pagination/pagination';

const IncomePage
 = () => {
    const [incomes, setIncomes] = useState([]);

    // Fetch all income records from the backend
    useEffect(() => {
      fetch('http://localhost:8080/api/income') // Assuming this is your backend API
        .then((response) => response.json())
        .then((data) => setIncomes(data))
        .catch((error) => console.error('Error fetching incomes:', error));
    }, []);
    // Manually format the created_at date to dd MMM yyyy
    //const date = new Date(user.created_at);
    //const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                {/* <Search placeholder='Search for a user..'/> */}
                <Link href='/dashboard/income/add'>
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Created Date</td>
                        <td>Frequency</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                {incomes.map((income) => (
                     <tr key={income.id}>
                        <td>
                            <div className={styles.product}>
                                {/* <Image 
                                    src='/noproduct.jpg'
                                    alt=''
                                    width={40}
                                    height={40}
                                    className={styles.productImage}
                                /> */}
                                {income.name}
                            </div>
                        </td>
                        <td>
                            {new Date(income.createdts).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            })}
                        </td>
                        <td>{income.frequency}</td>
                        <td>{income.description}</td>
                        <td>
                            <div className={styles.buttons}>
                            <Link href={`/dashboard/income/${income.id}`}>
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr>
                     ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
    )

}

export default IncomePage
;