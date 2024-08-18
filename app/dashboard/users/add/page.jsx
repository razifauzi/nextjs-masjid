// add page.jsx
import { addUser } from '../../../lib/actions';
import styles from '../../../ui/dashboard/users/addUser/addUser.module.css';

const AddUserPage = () => {
    return (
        <div className={styles.container}>
            <form action={addUser} className={styles.form}>
                <input type="text" placeholder='username' name='username' required />
                <input type="password" placeholder='Password' name='password' required />
                <select name="isAdmin" id="isAdmin" defaultValue="0">
                    <option value="0">Client</option>
                    <option value="1">Admin</option>
                </select>
                <textarea name="address" id="address" cols={30} rows={10} placeholder='address'></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AddUserPage;
