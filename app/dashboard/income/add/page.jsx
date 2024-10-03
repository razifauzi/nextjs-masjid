import styles from '../../../ui/dashboard/products/addProduct/addProduct.module.css'

const AddIncomePage = () => {
    return(
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='title' name='title' required />
                <select name="cat" id="cat">
                    <option value="general">Choose a Category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                </select>
                <input type="number" placeholder='price' name='price' />
                <textarea name="desc" id="desc" cols={30} rows={10} placeholder='Description'></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddIncomePage