import styles from '../../ui/dashboard/users/users.module.css'
import Link from "next/link";
import Pagination from '../../ui/dashboard/pagination/pagination';

const UsersPage =  () => {
    // Manually format the created_at date to dd MMM yyyy
    //const date = new Date(user.created_at);
    //const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                {/* <Search placeholder='Search for a user..'/> */}
                <Link href='/dashboard/users/add'>
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Program</td>
                        <td>Created Date</td>
                        <td>Frequency</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.product}>
                                {/* <Image 
                                    src='/noproduct.jpg'
                                    alt=''
                                    width={40}
                                    height={40}
                                    className={styles.productImage}
                                /> */}
                                Kamal Abdillah
                            </div>
                        </td>
                        <td>Imarah</td>
                        <td>13 Sep 2024</td>
                        <td>5</td>
                        <td>Jemaah</td>
                        <td>
                            <div className={styles.buttons}>
                            <Link href='/dashboard/users/test'>
                            {/* <Link href={`/dashboard/users/${user.id}`}></Link> */}
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
    )

}

export default UsersPage;