"use client";

import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect, useState } from 'react';
import styles from '../../../ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from 'next/image';


const SingleIncomePage = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Access the dynamic 'id' from params
  const [income, setIncome] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: '',
  });


  // Fetch the income data by ID when the ID is available
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/income/${id}`) // Replace with your backend API
        .then((response) => response.json())
        .then((data) => {
          setIncome(data);
          setFormData({
            name: data.name,
            description: data.description,
            frequency: data.frequency,
          });
        })
        .catch((error) => console.error('Error fetching income:', error));
    }
  }, [id]);
  
  // Handle form field changes
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
      const response = await fetch(`http://localhost:8080/api/income/${id}`, {
        method: 'PUT', // You can use PATCH if you are updating only a few fields
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Income updated successfully!');
        router.push('/dashboard/income'); // Redirect back to income list page
      } else {
        alert('Failed to update income.');
      }
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  if (!income) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src='/noavatar.png' alt='' fill />
        </div>
        {income.name}
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange} // Enable editing
          />
          <label>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange} // Enable editing
          />
          <label>Frequency</label>
          <input
            type='number'
            name='frequency'
            value={formData.frequency}
            onChange={handleChange} // Enable editing
          />
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleIncomePage;