// import Search from "../../ui/dashboard/search/search";
import styles from '../../ui/dashboard/users/users.module.css'
import Image from "next/image";
import Link from "next/link";
import Pagination from '../../ui/dashboard/pagination/pagination';

const UsersPage = async () => {

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {/* < Search placeholder="Search for a user"/> */}
                <Link href='dashboard/users/add'>
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Created At</td>
                        <td>Is Admin?</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        // Manually format the created_at date to dd MMM yyyy
                        const date = new Date(user.created_at);
                        const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

                        return (
                            <tr key={user.id}>
                                <td>
                                    <div className={styles.user}>
                                        <Image 
                                            src='/noavatar.png'
                                            alt=''
                                            width={40}
                                            height={40}
                                            className={styles.userImage}
                                        />
                                        {user.username}
                                    </div>
                                </td>
                                <td>{formattedDate}</td> 
                                <td>{user.isAdmin ? "Admin" : "Client"}</td>
                                <td>
                                    <div className={styles.buttons}>
                                    <Link href={`/dashboard/users/${user.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination/>
        </div>
    );

}

export default UsersPage;