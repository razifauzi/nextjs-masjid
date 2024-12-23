"use client";
// import Search from "../../ui/dashboard/search/search";
import styles from '../../ui/dashboard/products/products.module.css'
import { useState, useEffect,useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from "next/image";
import Link from "next/link";
import Pagination from '../../ui/dashboard/pagination/pagination';

const IncomePage = () => {
    const [incomes, setIncomes] = useState([]);
    const printRef = useRef();

    // Fetch all income records from the backend
    useEffect(() => {
      fetch('http://localhost:8080/api/income') // Assuming this is your backend API
        .then((response) => response.json())
        .then((data) => setIncomes(data))
        .catch((error) => console.error('Error fetching incomes:', error));
    }, []);

    // Handle delete function
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
        try {
            const response = await fetch(`http://localhost:8080/api/income/${id}`, {
            method: 'DELETE',
            });
            if (response.ok) {
            alert('Income deleted successfully!');
            // Remove the deleted income from the state
            setIncomes(incomes.filter(income => income.id !== id));
            } else {
            alert('Failed to delete income.');
            }
        } catch (error) {
            console.error('Error deleting income:', error);
        }
        }
    };

    // Format amount as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        }).format(amount);
    };

    // Function to download the PDF report
    const downloadPDF = () => {
        fetch("http://localhost:8080/api/income/export/pdf", {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
            },
        })
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "income_report.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading PDF:", error));
    };

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
                <button onClick={downloadPDF} className={styles.addButton}>Export to PDF</button>
            </div>
            <div ref={printRef}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Created Date</td>
                        <td>Frequency</td>
                        <td>Amount</td>
                        <td>Date</td>
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
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true // This will ensure the time is in 12-hour format
                            })}
                        </td>
                        <td>{income.frequency}</td>
                        <td>{formatCurrency(income.amount)}</td>
                        <td>
                            {new Date(income.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                            })}
                        </td>
                        <td>{income.description}</td>
                        <td>
                            <div className={styles.buttons}>
                            <Link href={`/dashboard/income/${income.id}`}>
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                                <button 
                                className={`${styles.button} ${styles.delete}`}
                                onClick={() => handleDelete(income.id)} >Delete</button>
                            </div>
                        </td>
                    </tr>
                     ))}
                </tbody>
            </table>
            </div>
            <Pagination/>
        </div>
    )

}

export default IncomePage
;