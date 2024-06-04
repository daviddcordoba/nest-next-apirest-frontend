import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log(user)

        if (user.error) throw user;

        return user;
      },
      
    }),
  ],
  callbacks: { // nutrimos con mas info a auth
    async jwt({ token, user }) {//captura info
      return { ...token, ...user };
    },
    async session({ session, token }) { //agrego la info a la session
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login"
  }
});

export { handler as GET, handler as POST };
