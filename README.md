# Appointment Booking System

This project provides a simple and intuitive appointment booking system where users can select a date, view available time slots, and book an appointment by providing their name and phone number. The system includes both backend and frontend implementations.

---

## Features

### Frontend:
- Displays available time slots dynamically for a selected date.
- Allows users to fill out booking details (name and phone number).
- Provides inline validation for form inputs.

### Backend:
- Manages available time slots and bookings.
- Ensures no double-booking for the same slot.
- Includes CORS support for cross-origin requests.

---

## Technologies Used

### Frontend:
- HTML
- CSS
- JavaScript (Vanilla)

### Backend:
- Node.js
- Express.js
- SQLite (lightweight database)

---

## Installation and Setup

### Prerequisites:
1. Node.js installed (version 14.x or later).
2. SQLite viewer installed (e.g., via a VSCode extension or SQLite CLI).

### Steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd appointment-booking
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the backend server:
   ```bash
   node index.js
   ```
   The server will start on `http://localhost:3003`.

4. Open the frontend:
   - Navigate to the `frontend` folder.
   - Open `index.html` in your browser.

---

## Project Structure

### Backend
```
backend/
├── index.js         # Main server file
├── db.js            # Database connection and schema setup
├── routes.js        # API endpoints
├── package.json     # Node.js dependencies
└── database.sqlite  # SQLite database file
```

### Frontend
```
frontend/
├── index.html       # Main HTML file
├── styles.css       # Stylesheet for the UI
└── script.js        # JavaScript for frontend logic
```

---

## API Endpoints

### Get Available Slots
- **Endpoint:** `GET /api/slots/:date`
- **Description:** Returns a list of available time slots for the specified date.
- **Response:**
  ```json
  ["10:00 AM", "10:30 AM", "11:00 AM", ...]
  ```

### Book an Appointment
- **Endpoint:** `POST /api/book`
- **Description:** Books a specific time slot.
- **Payload:**
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "date": "2024-12-20",
    "timeSlot": "10:00 AM"
  }
  ```
- **Response:**
  ```json
  { "message": "Appointment booked successfully!" }
  ```

---

## Validation Rules
- **Name:** Must be non-empty and contain only letters and spaces.
- **Phone Number:** Must be a valid 10-digit number.
- **Time Slot:** Must be selected from available slots.

---

## Troubleshooting

1. **CORS Error:**
   - Ensure the backend server includes CORS headers.
   - Use the provided middleware in `index.js`.

2. **Database Issues:**
   - Make sure `database.sqlite` exists in the `backend` folder.
   - Use SQLite Viewer in VSCode to inspect and manage the database.

3. **Frontend Not Loading Styles:**
   - Ensure `styles.css` is correctly linked in `index.html`.
   - Check browser console for MIME type errors.

---

## Future Improvements
- Add authentication for booking management.
- Provide email or SMS notifications for booked appointments.
- Build a dashboard for admin to manage bookings.

---

## License
This project is licensed under the MIT License.