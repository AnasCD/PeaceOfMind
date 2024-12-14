import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ProfilePicture from "../ProfilePicture";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import Logo from "../../assets/images/logobetter.png";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [monthlyRate, setMonthlyRate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth(); 
  
  useEffect(() => {
    if (isOpen && user?.id) {
      fetchTherapistDetails();
    }
  }, [isOpen, user?.id]);

  const fetchTherapistDetails = async () => {
    if (!user?.id) {
      setErrorMessage("User ID is not available.");
      return;
    }

    try {
      const response = await fetch(`/api/therapists/user/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFirstName(data.therapist.first_name || '');
        setLastName(data.therapist.last_name || '');
        setEmail(data.therapist.email || '');
        setExperienceYears(data.therapist.experience_years || '');
        setMonthlyRate(data.therapist.monthly_rate || '');
      } else {
        setErrorMessage(data.message || "Failed to fetch therapist details.");
      }
    } catch (error) {
      console.error("Error fetching therapist details:", error);
      setErrorMessage(error.message || "Error fetching therapist details.");
    }
  };




  const handleDeleteAccount = async () => {
    console.log("Delete account button clicked");
  
    // Check if user contains necessary data
    console.log("User data:", user);
  
    if (!user?.id) {
      setErrorMessage("User ID is not available.");
      return;
    }
  
    const userId = user.id;  // The logged-in user's ID (from the 'auth' table)
  
    // Fetch therapist data using the user ID
    try {
      const therapistResponse = await fetch(`/api/therapists/find/${userId}`);
      const therapistData = await therapistResponse.json();
  
      if (!therapistData?.therapist?.id) {
        setErrorMessage("Therapist not found.");
        return;
      }
  
      const therapistId = therapistData.therapist.id; // This is the therapist_id we need (12 in your example)
  
      const confirmDelete = window.confirm("Are you sure you want to delete this account? This action is irreversible.");
      if (!confirmDelete) return;
  
      // Proceed with deleting the account using both therapistId and userId
      const response = await fetch(`${API_BASE_URL}/api/accountSettings/therapists/${therapistId}/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Account deleted successfully.");
        window.location.href = "/"; // Or wherever you want to redirect
      } else {
        setErrorMessage(data.error || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error fetching therapist data or deleting account:", error);
      setErrorMessage("An error occurred while deleting the account.");
    }
  };

  const handleUpdate = async () => {
    // Check if passwords match before proceeding
    if (newPassword !== confirmPassword) {
      window.alert("Passwords do not match. Please try again."); // Show a pop-up alert
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/accountSettings/therapist/${user.id}`, {
        method: "PATCH", // Use PATCH to update the therapist details
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          experience_years: experienceYears,
          ...(newPassword && { password: newPassword }), // Send as "password" if provided
          monthly_rate: monthlyRate,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Details updated successfully.");
        setErrorMessage(""); // Clear error message on success
        onClose(); // Close the modal after successful update
      } else {
        setErrorMessage(data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating therapist details:", error);
      setErrorMessage(error.message || "Error updating therapist details.");
    }
  };
  
  
  const handleClose = () => {
    onClose();  
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[#5E9ED9]">Settings</h2>
          <button
            className="text-black px-2 rounded hover:text-gray-900"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* First Name and Last Name on the same line */}
        <div className="flex space-x-4">
          <div className="w-full">
            <label htmlFor="firstName" className="block text-black font-bold mb-2">First Name</label>
            <input
              id="firstName"
              type="text"
              className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block text-black font-bold mb-2">Last Name</label>
            <input
              id="lastName"
              type="text"
              className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Email Address and Experience (Years) */}
        <div className="flex space-x-4 mt-4">
          <div className="w-full">
            <label htmlFor="email" className="block text-black font-bold mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="w-full">
            <label htmlFor="experienceYears" className="block text-black font-bold mb-2">Experience (Years)</label>
            <input
              id="experienceYears"
              type="number"
              min="0" // Prevent negative values
              className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              placeholder="Enter years of experience"
            />
          </div>
        </div>

        {/* New Password and Confirm Password */}
        <div className="flex space-x-4 mt-4">
          <div className="w-full">
            <label htmlFor="newPassword" className="block text-black font-bold mb-2">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>

          <div className="w-full">
            <label htmlFor="confirmPassword" className="block text-black font-bold mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
        </div>

        {/* Monthly Rate */}
        <div className="mt-4">
          <label htmlFor="monthlyRate" className="block text-black font-bold mb-2">Monthly Rate</label>
          <input
            id="monthlyRate"
            type="number"
            min="0" // Prevent negative values
            className="w-full p-2 border border-[#5E9ED9] rounded text-black font-medium"
            value={monthlyRate}
            onChange={(e) => setMonthlyRate(e.target.value)}
            placeholder="Enter your monthly rate"
          />
        </div>

        {/* Update, Delete Account, and Close buttons in the same row */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-[#5E9ED9] text-white px-4 py-2 w-44 rounded hover:bg-[#4a8ac9]"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2  w-44 rounded hover:bg-red-400"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }: { isOpen: boolean; onConfirm: () => void; onCancel: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 className="text-lg font-bold text-center text-black mb-4">Confirm Logout</h2>
        <p className="text-center text-black mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center space-x-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Log Out
          </button>
          <button
            className="bg-[#5E9ED9] text-white px-4 py-2 rounded hover:bg-[#73a3d0]"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const HeaderTherapistDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [therapistId, setTherapistId] = useState<number | null>(null);


  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 // Fetch therapist_id using user_id
 useEffect(() => {
  const fetchTherapistId = async () => {
    if (user?.id) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/therapists/find/${user.id}`
        );
        const therapistData = response.data.therapist;
        if (therapistData && therapistData.id) {
          setTherapistId(therapistData.id); // Set the therapist ID
        } else {
          console.error("Therapist data is missing or invalid:", therapistData);
        }
      } catch (error) {
        console.error("Failed to fetch therapist_id:", error);
      }
    }
  };

  fetchTherapistId();
}, [user]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");

    if (logout) {
      logout();
    }

    navigate("/login");
  };

  return (
    <header className="bg-[#5E9ED9] text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer">
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Peace of Mind Logo"
              className="w-12 h-12 object-cover rounded-full mr-2"
            />
            <h1 className="text-lg font-bold">Peace of Mind</h1>
          </a>
        </div>

        {/* Profile and Navigation Section */}
        <div className="flex items-center gap-4">
          {/* Therapist Info */}
          {user && (
            <div className="flex items-center gap-2">
              <ProfilePicture
                userRole="therapist"
                therapistId={therapistId} // Assuming the user's ID is accessible
                className="w-14 h-14"
                style={{ border: "2px solid white" }}
              />
              <span className="text-white text-xl font-bold">
                {user.first_name} {user.last_name}
              </span>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 font-bold">
            <button
              className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-[#4b8cc4] transition"
              onClick={() => setIsSettingsOpen(true)}
            >
              <IoMdSettings className="inline" />
              <span>Settings</span>
            </button>
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
            />
            <button
              className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-[#4b8cc4] transition"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <MdOutlineLogout className="inline" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Mobile Hamburger Icon */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden text-center font-bold bg-[#5E9ED9] text-white p-4 space-y-2">
          <button
            className="block px-3 py-2 rounded hover:bg-[#4b8cc4] transition w-full text-left"
            onClick={() => setIsSettingsOpen(true)}
          >
            <IoMdSettings className="inline mr-2" />
            Settings
          </button>
          <button
            className="block px-3 py-2 rounded hover:bg-[#4b8cc4] transition w-full text-left"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <MdOutlineLogout className="inline mr-2" />
            Logout
          </button>
        </nav>
      )}

      {/* Modals */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </header>
  );
};

export default HeaderTherapistDashboard;