import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        form
      );

      alert("Signup successful!");

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-xl w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-slate-800"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-slate-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-slate-800"
        />

        <button
          className="w-full bg-blue-500 py-3 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        <p className="text-gray-400 mt-4 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-400 ml-1">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;