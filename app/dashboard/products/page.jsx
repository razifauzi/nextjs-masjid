// import Search from "../../ui/dashboard/search/search";
import styles from '../../ui/dashboard/products/products.module.css'
import Image from "next/image";
import Link from "next/link";
import Pagination from '../../ui/dashboard/pagination/pagination';

const ProductsPage
 = () => {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                {/* <Search placeholder='Search for a user..'/> */}
                <Link href='dashboard/products/add'>
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Name</td>
                        <td>Name</td>
                        <td>Name</td>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.product}>
                                <Image 
                                    src='/noproduct.jpg'
                                    alt=''
                                    width={40}
                                    height={40}
                                    className={styles.productImage}
                                />
                                John
                            </div>
                        </td>
                        <td>john@mail.co</td>
                        <td>13.01.2002</td>
                        <td>admin</td>
                        <td>active</td>
                        <td>
                            <Link href='/'>
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
    )

}

export default ProductsPage
;