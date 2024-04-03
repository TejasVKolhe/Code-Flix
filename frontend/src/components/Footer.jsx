import React from "react";

export default function Footer() {
  return (
    <footer bg="dark" className="text-center text-lg-left">
      <div className="text-center p-3">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <h4>CodeFlix</h4>
      </div>
    </footer>
  );
}
