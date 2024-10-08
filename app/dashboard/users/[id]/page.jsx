"use client";

import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect, useState } from 'react';
import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';

const SingleUserPage =  ({ params })=> {
  const router = useRouter();
  const { id } = params; // Access the dynamic 'id' from params
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    role: '',
  });

  // Fetch the user data by ID when the ID is available
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/user/${id}`) // Replace with your backend API
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setFormData({
            name: data.name,
            email: data.email,
            username: data.username,
            role: data.role,
          });
        })
        .catch((error) => console.error('Error fetching user:', error));
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
      const response = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: 'PUT', // You can use PATCH if you are updating only a few fields
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('User updated successfully!');
        router.push('/dashboard/users'); // Redirect back to user list page
      } else {
        alert('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src='/noavatar.png' alt='' fill />
        </div>
        Kamal 
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange} // Enable editing
          />
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange} // Enable editing
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange} // Enable editing
          />
          {/* <label>Password</label>
          <input
            type='password'
            name='password'
          /> */}
          {/* <label>Description</label>
          <textarea
            type='text'
            name='description'
            placeholder='New York'
          /> */}
          <label>Role</label>
          <select 
            name='role' 
            id='role' 
            value={formData.role} // Bind the value of isAdmin
            onChange={handleChange}
            >
            <option value='1'>Admin</option>
            <option value='0'>User</option>
          </select>
          
          <button type='submit'>Update</button>
          </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
