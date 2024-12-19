document
  .getElementById("date-picker")
  .addEventListener("change", fetchAvailableSlots);

function fetchAvailableSlots() {
  const date = document.getElementById("date-picker").value;
  fetch(`http://localhost:3003/api/slots/${date}`)
    .then((response) => response.json())
    .then((slots) => {
      const slotContainer = document.getElementById("available-slots");
      slotContainer.innerHTML = ""; // Clear existing slots
      if (slots.length === 0) {
        slotContainer.innerHTML = "No available slots";
      } else {
        slots.forEach((slot) => {
          const button = document.createElement("button");
          button.innerText = slot;
          button.classList.add("slot-button");
          button.onclick = () => {
            document
              .querySelectorAll("#available-slots button")
              .forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            showBookingForm(slot);
          };
          slotContainer.appendChild(button);
        });
      }
    });
}

function showBookingForm(slot) {
  document.getElementById("booking-form").style.display = "block";
  document.getElementById("slot").value = slot;
}

function bookAppointment() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const activeButton = document.querySelector("button.active");
  let valid = true;

  // Validate Name
  const nameError = document.getElementById("name-error");
  if (!name) {
    nameError.textContent = "Name is required.";
    valid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError.textContent = "Name must contain only letters and spaces.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  // Validate Phone
  const phoneError = document.getElementById("phone-error");
  if (!phone) {
    phoneError.textContent = "Phone number is required.";
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    phoneError.textContent = "Phone number must be a valid 10-digit number.";
    valid = false;
  } else {
    phoneError.textContent = "";
  }

  // Validate Slot Selection
  if (!activeButton) {
    alert("Please select a time slot.");
    valid = false;
  }

  if (!valid) return;

  const date = document.getElementById("date-picker").value;
  const timeSlot = activeButton.innerText;

  fetch("http://localhost:3003/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, date, timeSlot }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        resetForm();
      } else {
        alert(data.error);
      }
    });
}

function resetForm() {
  document.getElementById("booking-form").style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.querySelectorAll("#available-slots button").forEach((btn) => {
    btn.classList.remove("active");
  });
}
