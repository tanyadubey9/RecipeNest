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
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == 'github' || account.provider === 'google') {
                await connectDB()
                // check if the user already exits in the database
                const currentUser = await User.findOne({ email: user.email })
                if (!currentUser) {
                    // if the user does not exist, create a new user
                    await User.create({
                        name: profile.name || user.name || "Anonymous User",
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                }
                return true
            }
        },

        async session({ session, user, token }) {
            await connectDB()
            const dbUser = await User.findOne({ email: session.user.email });
            if(dbUser){
                session.user.name = dbUser.name;
                session.user.username = dbUser.username;
            }
            return session;
        },
    }
});

export { authoptions as GET, authoptions as POST }  