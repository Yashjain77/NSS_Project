const API = "http://localhost:5000";
const token = localStorage.getItem("token");

function loadAdminData() {
  fetch(API + "/admin/dashboard", {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("total").innerText = data.totalDonation;

      const table = document.getElementById("userTable");
      table.innerHTML = "";

      data.users.forEach((u, i) => {
        table.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            <td>${u.occupation}</td>
            <td>₹${u.totalDonated}</td>
          </tr>
        `;
      });
    });
}

function exportCSV() {
  fetch(API + "/admin/export", {
    headers: { Authorization: token }
  })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ngo_donations.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    });
}

loadAdminData();
