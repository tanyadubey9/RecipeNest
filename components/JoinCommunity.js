"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const JoinCommunity = () => {
  const { data: session } = useSession(); // Get user session
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Handle Email Signup
  const handleSignUp = () => {
    if (email && password) {
      const newUser = { email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      alert("Account created successfully! You can now log in.");
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    signOut();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      // Simulate API call to save email
      localStorage.setItem("subscribedEmail", email);
      setMessage("Thank you for subscribing! Check your inbox for exclusive recipes & tips.");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center md:p-6 p-3 bg-[#663c20] text-[#ffe5cc] rounded-lg shadow-lg my-10 mx-4">
        <h2 className="md:text-2xl text-xl font-bold">Join Our Community!</h2>
        <p className="text-center mt-2 md:text-base text-xs">
          Sign up to save your favorite recipes and join our Cooking Challenges!
        </p>

        {session || user ? (
          <div className="mt-4 text-center">
            <p>Welcome, {session?.user?.name || user?.email}!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white md:px-4 px-2 md:py-2 py-1 rounded mt-2 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Email Sign-Up Form */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border md:p-2 p-1 mt-3 rounded md:w-72 w-52 text-white"
            />
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border md:p-2 p-1 mt-3 rounded md:w-72 w-52 text-white"
            />
            <button
              onClick={handleSignUp}
              className="bg-blue-500 text-white md:px-4 px-2 md:py-2 py-1 rounded mt-3 hover:bg-blue-700"
            >
              Sign Up with Email
            </button>

            {/* Google Sign-In */}
            <button
              onClick={() => signIn("google")}
              className="bg-red-500 text-white md:px-4 px-2 md:py-2 py-1 rounded mt-2 hover:bg-red-700"
            >
              Sign Up with Google
            </button>
          </>
        )}
      </div>
      <div className="bg-[#663c20] text-[#ffe5cc] p-6 rounded-lg shadow-lg text-center my-10 mx-4">
        <h2 className="md:text-xl font-semibold mb-2">Subscribe for Exclusive Recipes & Cooking Tips!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="md:p-2 p-1 border border-gray-300 text-white md:rounded-lg rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-500 text-white md:px-4 px-2 md:py-2 py-1 rounded-lg hover:bg-green-600">
            Subscribe
          </button>
        </form>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </>
  );
};

export default JoinCommunity;
