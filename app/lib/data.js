// data.js
// import { connectToDB } from './utils';

// export const fetchUsers = async (q) => {
//   try {
//     const db = await connectToDB();
//     const query = 'SELECT * FROM users WHERE username LIKE ?';
//     const [users] = await db.query(query, [`%${q}%`]);
//     return { users };
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     throw new Error("Failed to fetch users");
//   }
// };

import { connectToDB } from './utils';

export const fetchUsers = async (q) => {
  try {
    const db = await connectToDB();
    const query = 'SELECT * FROM users WHERE username LIKE ?';
    const [users] = await db.query("SELECT * FROM users");
    return { users };
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Failed to fetch users");
  }
};
