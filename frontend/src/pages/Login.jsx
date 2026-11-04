import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const result = await login(email.trim(), password);
      if (result?.success) {
        navigate("/dashboard");
      } else {
        setError(result?.message || "Invalid email or password.");
      }
    } catch {
      setError("Unable to reach the server. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* ---------- Left: Brand / info panel ---------- */}
        <aside className="login-brand">
          <div className="login-logo">
            <div className="logo-icon">C</div>
            <div>
              <h2>Client<span>Flow</span></h2>
              <p className="logo-sub">Client Management System</p>
            </div>
          </div>

          <div className="brand-copy">
            <h3>Manage your clients,<br />from one admin panel.</h3>
            

            <ul className="brand-list">
              <li><span className="dot" /> Add, edit and delete client records</li>
              <li><span className="dot" /> Search clients by name, email or company</li>
              
            </ul>
          </div>

          <p className="brand-foot">Mini Client Management System · Admin Panel</p>
        </aside>

        {/* ---------- Right: Login form ---------- */}
        <main className="login-panel">
          <div className="login-heading">
            <h1>Welcome Back!</h1>
            <p>Sign in to access your admin dashboard.</p>
          </div>

          {error && (
            <div className="login-error" role="alert">
              <span className="error-icon">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Mini Client Management System</p>
            <span>© 2026 · Admin Portal</span>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Login;