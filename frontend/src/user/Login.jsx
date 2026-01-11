import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log("🔍 Login Response:", res.data);

      if (res.data.success) {
        const token = res.data.token;
        const userId = res.data.user?.id || res.data.user?._id;
        const userName = res.data.user?.name;
        
        if (!token) {
          console.error("❌ No token in response!");
          alert("Login error: Token not received from server");
          return;
        }

        // Save authentication data
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        console.log("✅ Token saved to localStorage");

        alert("Login successful!");
        nav("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      alert("Login failed. " + (err.response?.data?.message || "Please try again."));
    }
  };

  return (
    <div className="card">
      <h2>User Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
