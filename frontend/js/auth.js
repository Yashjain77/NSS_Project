const API = "http://localhost:5000";

let selectedRole = sessionStorage.getItem("selectedRole") || "user";

document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("userBtn");
  const adminBtn = document.getElementById("adminBtn");

  // Restore selected role after refresh
  setActiveRole(selectedRole);

  if (userBtn) {
    userBtn.onclick = () => switchRole("user");
  }
  if (adminBtn) {
    adminBtn.onclick = () => switchRole("admin");
  }
});

function switchRole(role) {
  if (selectedRole === role) return;

  sessionStorage.setItem("selectedRole", role);
  location.reload(); // 🔄 FULL PAGE REFRESH
}

function setActiveRole(role) {
  selectedRole = role;

  document.getElementById("userBtn")?.classList.remove("active");
  document.getElementById("adminBtn")?.classList.remove("active");

  document.getElementById(role + "Btn")?.classList.add("active");
}

function showToast(msg, ok = false) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.background = ok ? "#16a34a" : "#dc2626";
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 2000);
}

function togglePassword(id) {
  const p = document.getElementById(id);
  if (!p) return;
  p.type = p.type === "password" ? "text" : "password";
}

function register() {
  const firstName = document.getElementById("firstName")?.value.trim();
  const lastName = document.getElementById("lastName")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const occupation = document.getElementById("occupation")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!firstName || !lastName || !email || !phone || !occupation || !password) {
    showToast("All fields are required");
    return;
  }

  fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      occupation,
      password,
      role: selectedRole
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.msg) {
        showToast("Registration failed");
        return;
      }

      showToast("Registered successfully", true);
      sessionStorage.removeItem("selectedRole");

      setTimeout(() => {
        location.href = "login.html";
      }, 1500);
    })
    .catch(() => showToast("Server error"));
}

function login() {
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;

  if (!email || !password) {
    showToast("Email and password are required");
    return;
  }

  fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      role: selectedRole
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.token) {
        showToast(data.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      sessionStorage.removeItem("selectedRole");

      showToast("Login successful", true);

      setTimeout(() => {
        location.href =
          selectedRole === "admin" ? "admin.html" : "user.html";
      }, 1200);
    })
    .catch(() => showToast("Server error"));
}
