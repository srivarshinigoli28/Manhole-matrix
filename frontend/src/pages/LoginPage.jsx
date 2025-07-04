import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        alert(res.data.message);
        localStorage.setItem("user", res.data.user.name);
        navigate("/dashboard");
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
          number: form.number,
        });
        alert(res.data.message);
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <div className="moving-strip">
          <p>Over 2,000 deaths annually in India due to accidents caused by open manholes, especially during monsoons.</p>
        </div>
        {isLogin ? (
          <>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="button" onClick={handleSubmit}>Login</button>
            <p>Don't have an account? <span className="toggle-link" onClick={handleToggle}>Register here.</span></p>
          </>
        ) : (
          <>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="number" name="number" placeholder="Contact Number" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="button" onClick={handleSubmit}>Register</button>
            <p>Already have an account? <span className="toggle-link" onClick={handleToggle}>Login here.</span></p>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
