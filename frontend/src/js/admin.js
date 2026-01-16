const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "Login.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "Login.html";
}

async function loadUsers() {
    const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    const list = document.getElementById("users");
    list.innerHTML = "";

    data.forEach(u => {
        const li = document.createElement("li");
        li.innerText = `${u.name} - ${u.email}`;
        list.appendChild(li);
    });
}

async function loadDonations() {
    const res = await fetch(`${API_URL}/admin/donations`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    const list = document.getElementById("donations");
    list.innerHTML = "";

    data.forEach(d => {
        const li = document.createElement("li");
        li.innerText = `User: ${d.userId} | ₹${d.amount} | ${d.status}`;
        list.appendChild(li);
    });
}

loadUsers();
loadDonations();
