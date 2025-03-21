
import React from 'react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
const navigate = useNavigate();

  return (
      <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <button style={styles.button} onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>

  );
};

const styles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
      color: "#fff",
      textAlign: "center",
    },
    heading: {
      fontSize: "5rem",
      fontWeight: "bold",
      marginBottom: "10px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      animation: "fadeIn 1s ease-in-out",
    },
    text: {
      fontSize: "1.5rem",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#ff7e5f",
      backgroundColor: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    },
  };

  export default NotFound;