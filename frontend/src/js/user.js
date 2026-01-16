const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "Login.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "Login.html";
}

async function loadProfile() {
    const res = await fetch(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    document.getElementById("profile").innerText = JSON.stringify(data);
}

async function loadDonations() {
    const res = await fetch(`${API_URL}/user/donations`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    const list = document.getElementById("donations");
    list.innerHTML = "";

    data.forEach(d => {
        const li = document.createElement("li");
        li.innerText = `₹${d.amount} - ${d.status}`;
        list.appendChild(li);
    });
}

async function donate() {
    const amount = document.getElementById("amount").value;

    await fetch(`${API_URL}/user/donate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
    });

    loadDonations();
}

loadProfile();
loadDonations();
