const API = "http://localhost:5000";

/* =====================
   STATE
===================== */
let selectedRole = "user"; // DEFAULT FOR BOTH LOGIN & REGISTER

/* =====================
   INIT ROLE TOGGLE
===================== */
document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("userBtn");
  const adminBtn = document.getElementById("adminBtn");

  if (userBtn && adminBtn) {
    userBtn.onclick = () => setRole("user");
    adminBtn.onclick = () => setRole("admin");
  }
});

/* =====================
   ROLE SWITCH
===================== */
function setRole(role) {
  selectedRole = role;

  document.getElementById("userBtn")?.classList.remove("active");
  document.getElementById("adminBtn")?.classList.remove("active");

  document.getElementById(role + "Btn")?.classList.add("active");
}

/* =====================
   TOAST
===================== */
function showToast(msg, ok = false) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.background = ok ? "#16a34a" : "#dc2626";
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* =====================
   PASSWORD EYE
===================== */
function togglePassword(id) {
  const p = document.getElementById(id);
  if (!p) return;
  p.type = p.type === "password" ? "text" : "password";
}

/* =====================
   REGISTER (FIXED)
===================== */
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

  console.log("Registering as:", selectedRole);

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
      console.log("Register response:", data);

      if (!data.msg) {
        showToast("Registration failed");
        return;
      }

      if (data.msg.toLowerCase().includes("exists")) {
        showToast(data.msg);
        return;
      }

      showToast("Registered successfully", true);

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    })
    .catch(err => {
      console.error("Register error:", err);
      showToast("Server error");
    });
}

/* =====================
   LOGIN (UNCHANGED, WORKING)
===================== */
function login() {
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;

  if (!email || !password) {
    showToast("Email and password are required");
    return;
  }

  console.log("Logging in as:", selectedRole);

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
      console.log("Login response:", data);

      if (!data.token) {
        showToast(data.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      showToast("Login successful", true);

      setTimeout(() => {
        window.location.href =
          selectedRole === "admin" ? "admin.html" : "user.html";
      }, 1200);
    })
    .catch(err => {
      console.error("Login error:", err);
      showToast("Server error");
    });
}
