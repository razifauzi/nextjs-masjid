// app/dashboard/users/[id]/page.jsx
'use client';

import { useState } from 'react';
import { updateUser } from '../../../lib/actions';
import { fetchUsers } from '../../../lib/data';
import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUsers(id);

  const [formData, setFormData] = useState({
    username: user.username,
    address: user.address,
    isAdmin: user.isAdmin ? "true" : "false",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src='/noavatar.png' alt='' fill />
        </div>
        {formData.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type='hidden' name='id' value={id} />
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}  // Handle changes to the input
          />
          <label>Address</label>
          <textarea
            name='address'
            value={formData.address}
            onChange={handleChange}  // Handle changes to the textarea
          />
          <label>Is Admin?</label>
          <select name='isAdmin' value={formData.isAdmin} onChange={handleChange}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
