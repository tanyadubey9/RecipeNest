"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = useSession();
  const params = useParams();

  const [userData, setUserData] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [recipes, setRecipes] = useState([]);

  // Consolidate the data fetching into a single useEffect
  const fetchData = async () => {
    if (!session || !params?.username) return;

    try {
      // Fetch user data
      const resUser = await fetch(`/api/user/${params.username}`, { cache: "no-store" });
      if (!resUser.ok) throw new Error("User not found");
      const dataUser = await resUser.json();
      setUserData(dataUser);
      setProfilePicUrl(dataUser.profilepic || "");
      setCoverPicUrl(dataUser.coverpic || "");

      // Fetch user posts (recipes)
      const resPosts = await fetch(`/api/recipe`);
      if (!resPosts.ok) throw new Error("Failed to fetch posts");
      const dataPosts = await resPosts.json();
      setRecipes(dataPosts);

      // // Fetch saved recipes only if logged in
      // if (session.user.username === params.username) {
      //   const resSaved = await fetch(`/api/user/${session.user.username}?saved=true`);
      //   const dataSaved = await resSaved.json();
      //   setRecipes(dataSaved.savedRecipes);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.username, session]); // ✅ Added dependency array

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch(`/api/upload/${params.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilepic: profilePicUrl,
          coverpic: coverPicUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        throw new Error(data.message || "Failed to update profile");
      }

      setUserData(data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!userData) return <p className="text-center mt-10 text-white">Loading...</p>;


  return (
    <div className="bg-white flex md:flex-row flex-col min-h-screen">
      <aside className="p-5 bg-white shadow-xl">
        {/* Cover Image */}
        <div className="relative h-40 w-full bg-gray-300">
          {coverPicUrl.trim() ? (
            <Image
              src={coverPicUrl}
              alt="Cover"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-180">
              <p className="text-center text-gray-500">No Cover Image</p>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center -mt-16">
          {profilePicUrl.trim() ? (
            <Image
              src={profilePicUrl}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-4 border-white z-10 relative"
            />
          ) : (
            <Image
              src="/BlankProfile.jpg"
              alt="Default Profile"
              width={100}
              height={100}
              className="rounded-full border-4 border-white z-10 relative"
            />
          )}
          <h2 className="text-2xl font-bold mt-3">{userData.name}</h2>
          <p className="text-gray-600">@{userData.username}</p>
          <p className="text-gray-600">{userData.email}</p>

          {/* Edit Profile & Set Image URL */}
          {session?.user?.username === userData.username && (
            <div className="mt-4 w-full px-5">
              {/* Profile Picture URL Input */}
              <label className="block font-semibold">Profile Picture URL:</label>
              <input
                type="text"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="Enter profile picture URL"
              />

              {/* Cover Picture URL Input */}
              <label className="block font-semibold">Cover Picture URL:</label>
              <input
                type="text"
                value={coverPicUrl}
                onChange={(e) => setCoverPicUrl(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="Enter cover picture URL"
              />

              <button
                onClick={handleSave}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </aside>

      <div className="md:m-3 shadow-xl flex gap-1 flex-col md:w-3/4 w-full">
        <button
          className="p-2 bg-blue-300 text-white flex justify-center items-center gap-2 shadow-lg">
          <Image src="/post.png" alt="Post" width={18} height={18} className="invert" />
          <Link href={`/${session.user.username}/post`} className="text-lg font-semibold hover:text-xl">Post</Link>
        </button>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-5">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="border-gray-200 border p-3 shadow-md rounded-md text-center">
                <h3 className="text-xl font-semibold my-1">{recipe.name}</h3>
                <Image src={recipe.image} alt={recipe.name} width={150} height={150} className="rounded-md mx-auto" />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No recipes posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
