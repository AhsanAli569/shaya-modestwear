import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post("/admin/login", data);

    if (res.data.success) {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="card">
      <h2>Admin Login</h2>

      <input
        placeholder="Admin Username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Admin Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
