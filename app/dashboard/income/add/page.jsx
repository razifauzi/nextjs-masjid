"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../../../ui/dashboard/products/addProduct/addProduct.module.css'

const AddIncomePage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        frequency: '',
        description: '',
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
            const response = await fetch('http://localhost:8080/api/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Income added successfully!');
                router.push('/dashboard/income'); // Redirect to income list after adding
            } else {
                alert('Failed to add income.');
            }
        } catch (error) {
            console.error('Error adding income:', error);
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

export default AddIncomePage