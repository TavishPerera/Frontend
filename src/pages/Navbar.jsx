import React from "react";

const Navbar = () => {
  const handleSignOut = () => {
    window.open('https://inspireai.auth.us-east-1.amazoncognito.com/logout?client_id=38vlaj528ei4s75kamm22h25n7&logout_uri=http%3A%2F%2Flocalhost%3A3000%2F', '_blank');
    // Remove authCode from localStorage
    localStorage.removeItem('authCode');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navItems}>
        <h2 style={{ margin: 0 }}>My App</h2>
        <button onClick={handleSignOut} style={styles.signOutButton}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    marginTop: -50,
  },
  navItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
