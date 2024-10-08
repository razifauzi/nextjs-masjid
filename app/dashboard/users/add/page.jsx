"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../../../ui/dashboard/users/addUser/addUser.module.css';

const AddUserPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        role: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('User added successfully!');
                router.push('/dashboard/users'); // Redirect to user list after adding
            } else {
                alert('Failed to add user.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div className={styles.container}>
            <form action='' className={styles.form} onSubmit={handleSubmit}>
            <input
                    type="text"
                    placeholder='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder='username'
                    value={formData.username}
                    onChange={handleChange}
                />
                <select 
                    name="role"
                    id="role"
                    defaultValue="0"
                    value={formData.role}
                    onChange={handleChange}>
                    <option value="0">Client</option>
                    <option value="1">Admin</option>
                </select>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AddUserPage;
