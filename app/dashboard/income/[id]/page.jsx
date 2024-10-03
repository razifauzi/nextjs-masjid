"use client";

import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect, useState } from 'react';
import styles from '../../../ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from 'next/image';


const SingleIncomePage = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Access the dynamic 'id' from params
  const [income, setIncome] = useState(null);

  // Fetch the income data by ID when the ID is available
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/income/${id}`) // Replace with your backend API
        .then((response) => response.json())
        .then((data) => setIncome(data))
        .catch((error) => console.error('Error fetching income:', error));
    }
  }, [id]);

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
        <form className={styles.form}>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={income.name}
            readOnly
          />
          <label>Description</label>
          <textarea
            name='description'
            value={income.description}
            readOnly
          />
          <label>Frequency</label>
          <input
            type='number'
            name='frequency'
            value={income.frequency}
            readOnly
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleIncomePage;