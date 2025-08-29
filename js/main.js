// public/js/main.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const overlay = document.querySelector(".overlay");

  // Switch between login and register
  registerBtn.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  loginBtn.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Form submission placeholder
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login functionality coming soon!");
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Register functionality coming soon!");
  });

  // Parallax effect for background on mouse move
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth - e.pageX) / 100;
    const y = (window.innerHeight - e.pageY) / 100;
    overlay.style.transform = `translate(${x}px, ${y}px)`;
  });
});
