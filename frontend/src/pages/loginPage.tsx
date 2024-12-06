import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Custom hook for accessing AuthContext
import HeaderSignUpLoginPage from "../components/HeaderSignUpLoginPage";
import FooterLandingPage from "../components/Footer";
import Lottie from "lottie-react";
import LoginPageAnimation from "../assets/lotties/LogInPageAnimation.json";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <HeaderSignUpLoginPage />
      <LoginSection />
      <div className="absolute bottom-0 w-full">
        <FooterLandingPage />
      </div>
    </div>
  );
};

const LoginSection: React.FC = () => {
  const { login } = useAuth(); // Access the login function from AuthContext
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for showing loading spinner
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true); // Set loading to true during login process
    setError(null); // Clear any previous errors

    try {
      const user = await login(email, password); // Call the login function
      setLoading(false); // Reset loading state

      // Smoothly transition to the appropriate dashboard
      if (user?.role === "student") {
        navigate("/student-dashboard", { replace: true });
      } else if (user?.role === "therapist") {
        navigate("/therapist-dashboard", { replace: true });
      } else {
        throw new Error("Invalid user role.");
      }
    } catch (err) {
      setLoading(false); // Reset loading state
      setError("Invalid email or password"); // Display error message
    }
  };

  return (
    <motion.section
      className="flex flex-col md:flex-row justify-center items-center py-10 px-6 bg-white h-full min-h-[80vh]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="md:w-1/2 flex flex-col items-center text-center md:pr-8 mb-6 md:mb-0">
        <h1 className="text-4xl font-bold text-[#5E9ED9] mb-4">Welcome Back!</h1>
        <p className="text-gray-700 font-semibold mb-6">
          Log in to access your personalized dashboard and stay on track with your goals.
        </p>
        <Lottie
          animationData={LoginPageAnimation}
          loop={true}
          style={{ width: "400px", height: "400px" }}
        />
      </div>
      <div className="bg-blue-100 rounded-lg shadow-md p-6 w-full border border-[#5E9ED9] max-w-lg text-center">
        <h2 className="text-3xl font-extrabold text-[#5E9ED9] mb-4">Log in</h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-2 border border-[#5E9ED9] rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-[#5E9ED9] rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            className={`w-full bg-[#5E9ED9] text-white font-semibold p-3 rounded-md ${
              loading ? "cursor-not-allowed opacity-75" : "hover:bg-[#4a8ac9]"
            }`}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : "Log in"}
          </motion.button>
        </form>
        <div className="mt-6 text-sm text-gray-600">
          <a href="/forgot-password" className="hover:underline">
            Forgot Password?
          </a>
        </div>
        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
      </div>
    </motion.section>
  );
};

export default Login;
