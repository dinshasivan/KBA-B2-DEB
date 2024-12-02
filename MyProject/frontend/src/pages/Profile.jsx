import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden shadow-md">
          <FaRegUserCircle size={80} className="text-gray-500" />
        </div>
        <button className="mt-4 px-4 py-1 text-sm font-medium border border-green-500 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition">
          Edit
        </button>
      </div>

      {/* Form Section */}
      <form className="mt-6 space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-3 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            name="name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-3 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-gray-700 font-medium">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-3 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            name="mobile"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-green-500 rounded shadow hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
