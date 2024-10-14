import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your Spring Boot API to validate the credentials
        const res = await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // If login is successful, return the user object
        if (res.ok && user) {
          return user;
        }

        // Return null if login fails
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
