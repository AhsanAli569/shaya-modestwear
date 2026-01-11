import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert("Signup successful! Logging you in...");
        
        // Auto-login after signup
        try {
          const loginRes = await axios.post("/auth/login", {
            email,
            password,
          });

          if (loginRes.data.success && loginRes.data.token) {
            // Save authentication data
            localStorage.setItem("token", loginRes.data.token);
            localStorage.setItem("userId", loginRes.data.user?.id || loginRes.data.user?._id);
            localStorage.setItem("userName", loginRes.data.user?.name);
            localStorage.setItem("user", JSON.stringify(loginRes.data.user));
            
            nav("/");
          } else {
            nav("/login");
          }
        } catch (loginErr) {
          console.log("Auto-login failed:", loginErr);
          nav("/login");
        }
      } else {
        alert(res.data.message || "Signup failed!");
      }
    } catch (err) {
      alert("Signup failed!");
      console.log(err);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
