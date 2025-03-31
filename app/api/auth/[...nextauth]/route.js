import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubAuthProvider from 'next-auth/providers/github';
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const authoptions = NextAuth({
    providers: [
        GithubAuthProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
            scope: "read:user user:email", 
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
            scope: "openid email profile",
        }),
    ],
    // secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            await connectDB();
            const existingUser = await User.findOne({ email: user.email }).lean();
            if (!existingUser) {
                await User.create({ name: user.name, email: user.email, username: user.email.split("@")[0] });
            }
            return true;
        },
        async session({ session }) {
            await connectDB();
            const dbUser = await User.findOne({ email: session.user.email }).lean();
            if (dbUser) {
                session.user.name = dbUser.name;
                session.user.username = dbUser.username;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin", // Custom sign-in page to reduce API calls
    },
});

export { authoptions as GET, authoptions as POST };
export const config = { runtime: "edge" };  // Use Edge runtime for faster execution