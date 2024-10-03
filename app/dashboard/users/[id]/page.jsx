import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';

const SingleUserPage =  () => {

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src='/noavatar.png' alt='' fill />
        </div>
        Kamal 
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Full Name</label>
          <input
            type='text'
            name='name'
            placeholder='Kamal Abdillah'
          />
          <label>Username</label>
          <input
            type='text'
            name='username'
            placeholder='Kamal'
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Kamal@gmail.com'
          />
          <label>Password</label>
          <input
            type='password'
            name='password'
          />
          <label>Description</label>
          <textarea
            type='text'
            name='description'
            placeholder='New York'
          />
          <label>Role</label>
          <select name='isAdmin' id='isAdmin'>
            <option value='1'>Admin</option>
            <option value='0'>User</option>
          </select>
          
          <button>Update</button>
          </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
