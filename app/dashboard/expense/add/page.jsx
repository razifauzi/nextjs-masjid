"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../../../ui/dashboard/products/addProduct/addProduct.module.css'

const AddExpensePage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        frequency: '',
        description: '',
        amount: '', 
        date: '', 
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
            const response = await fetch('http://localhost:8080/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Expenses added successfully!');
                router.push('/dashboard/expense'); // Redirect to income list after adding
            } else {
                alert('Failed to add expenses.');
            }
        } catch (error) {
            console.error('Error adding expenses:', error);
            alert('An error occurred.');
        }
    };

    return(
        <div className={styles.container}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
            <input
                    type="text"
                    placeholder='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    placeholder='frequency'
                    name='frequency'
                    value={formData.frequency}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder='Amount'
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    step="0.01" // Allow decimal values for monetary amount
                />
                <input
                    type="date"
                    name='date'
                    value={formData.date}
                    onChange={handleChange}
                    required // Make date selection required
                />
                <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Program</option>
                    <option value="1">Emolumen</option>
                    <option value="2">Elaun & Imbuhan Tetap</option>
                    <option value="3">Sumbangan Berkanun Untuk Kakitangan</option>
                    <option value="4">Elaun Lebih Masa</option>
                    <option value="5">Elaun Kursus</option>
                    <option value="6">Utiliti</option>
                    <option value="7">Sewaan</option>
                    <option value="8">Belanja Penganjuran Program</option>
                    <option value="9">Belian Bekalan Bahan Mentah</option>
                    <option value="10">Belian Bahan Makan & Minuman</option>
                </select>
                <textarea
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    placeholder='Description'
                    value={formData.description}
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddExpensePage