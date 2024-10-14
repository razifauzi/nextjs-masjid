"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from '../../../test_next/app/ui/login/login.module.css'

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
      username: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await signIn("credentials", {
        redirect: false,
        username: credentials.username,
        password: credentials.password,
      });
  
      if (res.ok) {
        // Handle success, maybe redirect to dashboard
        console.log("Logged in!");
      } else {
        // Handle error
        console.error("Login failed");
      }
    };
  
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default LoginPage;