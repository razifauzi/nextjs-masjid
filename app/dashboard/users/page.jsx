"use client";
import styles from '../../ui/dashboard/users/users.module.css'
import { useState, useEffect } from 'react';
import Link from "next/link";
import Pagination from '../../ui/dashboard/pagination/pagination';

const UsersPage =  () => {
    const [users, setUsers] = useState([]);

    // Fetch all users records from the backend
    useEffect(() => {
      fetch('http://localhost:8080/api/user') // Assuming this is your backend API
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Handle delete function
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
        try {
            const response = await fetch(`http://localhost:8080/api/user/${id}`, {
            method: 'DELETE',
            });
            if (response.ok) {
            alert('User deleted successfully!');
            // Remove the deleted user from the state
            setUsers(users.filter(user => user.id !== id));
            } else {
            alert('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        }
    };

    // Manually format the created_at date to dd MMM yyyy
    //const date = new Date(user.created_at);
    //const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                {/* <Search placeholder='Search for a user..'/> */}
                <Link href='/dashboard/users/add'>
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>Username</td>
                        <td>Created Date</td>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                     <tr key={user.id}>
                        <td>
                            <div className={styles.product}>
                                {/* <Image 
                                    src='/noproduct.jpg'
                                    alt=''
                                    width={40}
                                    height={40}
                                    className={styles.productImage}
                                /> */}
                                {user.name}
                            </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                        <td>{user.username}</td>
                        <td>{new Date(user.createdts).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true // This will ensure the time is in 12-hour format
                            })}</td>
                        <td>
                            <div className={styles.buttons}>
                            <Link href={`/dashboard/users/${user.id}`}>
                            {/* <Link href={`/dashboard/users/${user.id}`}></Link> */}
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                                <button className={`${styles.button} ${styles.delete}`}
                                onClick={() => handleDelete(user.id)}>Delete</button>
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

export default UsersPage;