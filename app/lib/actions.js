// actions.js
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utils";
import { redirect } from 'next/navigation';
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
    const { username, isAdmin, address, password } = Object.fromEntries(formData);

    try {
        const db = await connectToDB();

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the user with the hashed password into the database
        const query = `
            INSERT INTO users (id, username, isAdmin, address, password)
            VALUES (UUID(), ?, ?, ?, ?)
        `;
        await db.query(query, [username, isAdmin, address, hashedPassword]);

        console.log("User added successfully");
    } catch (err) {
        console.error("Failed to create user:", err);
        throw new Error("Failed to create user");
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
    const { id, username, isAdmin, address, password } = Object.fromEntries(formData);

    try {
        const db = await connectToDB();

        const updateFields = { username, isAdmin, address };
        
        // If password is provided, hash it before updating
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        // Update the user in the database
        const query = `
            UPDATE users SET
            username = COALESCE(?, username),
            isAdmin = COALESCE(?, isAdmin),
            address = COALESCE(?, address),
            password = COALESCE(?, password)
            WHERE id = ?
        `;
        await db.query(query, [username, isAdmin, address, updateFields.password, id]);

        console.log('User updated successfully');
    } catch (err) {
        console.error('Failed to update user:', err);
        throw new Error('Failed to update user');
    }

    // Revalidate the path to reflect the changes
    revalidatePath(`/dashboard/users/${id}`);

    // Redirect to the users dashboard
    redirect('/dashboard/users');
};

// export const deleteUser = async (id) => {
//     "use server";
//     try {
//         const db = await connectToDB();
        
//         // Delete the user from the database
//         const query = `DELETE FROM users WHERE id = ?`;
//         await db.query(query, [id]);

//         console.log("User deleted successfully");
//     } catch (err) {
//         console.error("Failed to delete user:", err);
//         throw new Error("Failed to delete user");
//     }
//     revalidatePath("/dashboard/users");
//     redirect("/dashboard/users");
// };
