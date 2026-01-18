const API = "http://localhost:5000";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

/* Toast */
function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

/* Load profile */
function loadProfile() {
  fetch(API + "/auth/me", {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(u => {
      document.getElementById("userName").innerText =
        u.firstName + " " + u.lastName;

      document.getElementById("userDetails").innerHTML = `
        ${u.email}<br>
        ${u.phone} · ${u.occupation}
      `;
    })
    .catch(() => {
      showToast("Failed to load profile");
    });
}

/* Donation history */
function loadDonations() {
  fetch(API + "/donation/my", {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("donationList");
      list.innerHTML = "";

      if (data.length === 0) {
        list.innerHTML =
          "<tr><td colspan='3'>No donations yet</td></tr>";
        return;
      }

      data.forEach(d => {
        const status =
          d.status === "CREATED" ? "PENDING" : d.status;

        list.innerHTML += `
          <tr>
            <td>₹${d.amount}</td>
            <td class="${status.toLowerCase()}">${status}</td>
            <td>${new Date(d.createdAt).toLocaleDateString()}</td>
          </tr>
        `;
      });
    });
}

/* Donate */
function donate() {
  const amt = Number(amount.value);
  if (amt < 50) {
    showToast("Minimum donation is ₹50");
    return;
  }

  fetch(API + "/donation/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ amount: amt })
  })
    .then(res => res.json())
    .then(order => {
      let dismissed = false; // 🔑 KEY FLAG

      const options = {
        key: "rzp_test_S4Wcq3aLFRAqoA",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        /* SUCCESS */
        handler: function (response) {
          fetch(API + "/donation/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          }).then(() => {
            showToast("Donation successful");
            loadDonations();
          });
        },

        /* DISMISS → PENDING */
        modal: {
          ondismiss: function () {
            dismissed = true;
            showToast("Payment pending");
            loadDonations();
          }
        }
      };

      const rzp = new Razorpay(options);

      /* FAILURE → ONLY IF REAL PAYMENT FAILURE */
      rzp.on("payment.failed", function (response) {
        // 🚨 If popup was dismissed, IGNORE this event
        if (dismissed) return;

        // 🚨 Extra safety: ensure payment_id exists
        if (!response.error.metadata.payment_id) return;

        fetch(API + "/donation/failed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: response.error.metadata.order_id
          })
        }).then(() => {
          showToast("Payment failed");
          loadDonations();
        });
      });

      rzp.open();
    });
}



/* INIT */
loadProfile();
loadDonations();
