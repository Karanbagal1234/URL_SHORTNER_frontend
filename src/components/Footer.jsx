import React from "react";
import { Link } from "react-router-dom";

const COLORS = {
  primaryBackground: "#AEB8FE", // Light Blue (60%)
  secondaryBackground: "#27187E", // Deep Blue (30%)
  accentColor: "#FF8600", // Bright Orange (10%)
  textPrimary: "#F1F2F6", // Very Light Gray
  textSecondary: "#758BFD", // Light Blue
  inputBackground: "#27187E", // Deep Blue
  borderColor: "#758BFD", // Light Blue
  linkColor: "#AEB8FE", // Light Blue
  errorColor: "red",
  borderHighlight: "#FF8600", // Bright Orange
};

const Footer = () => {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: COLORS.secondaryBackground,
        color: COLORS.textPrimary,
        padding: "2rem 0",
        textAlign: "center",
      }}
    >
      <div className="container mx-auto">
        <nav className="mb-4">
          <Link
            to="/about"
            style={{ color: COLORS.linkColor, marginRight: "1rem" }}
            className="hover:underline"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{ color: COLORS.linkColor, marginRight: "1rem" }}
            className="hover:underline"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            style={{ color: COLORS.linkColor, marginRight: "1rem" }}
            className="hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
        <p style={{ color: COLORS.textSecondary }}>
          &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
