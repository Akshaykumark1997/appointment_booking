const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../../database/booking.db");
const db = new sqlite3.Database(dbPath);


// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      UNIQUE(date, time_slot)
    );
  `);
});

// Get available slots for a specific date
const getAvailableSlots = (date) => {
  return new Promise((resolve, reject) => {
    const availableSlots = [];
    const slots = [
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
    ];

    db.all(
      `SELECT time_slot FROM appointments WHERE date = ?`,
      [date],
      (err, rows) => {
        if (err) reject(err);

        const bookedSlots = rows.map((row) => row.time_slot);
        const available = slots.filter((slot) => !bookedSlots.includes(slot));
        resolve(available);
      }
    );
  });
};

// Book an appointment
const bookAppointment = (name, phone, date, timeSlot) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT OR IGNORE INTO appointments (name, phone, date, time_slot)
      VALUES (?, ?, ?, ?)
    `,
      [name, phone, date, timeSlot],
      function (err) {
        if (err || this.changes === 0) {
          reject("Failed to book or slot already taken");
        } else {
          resolve(true);
        }
      }
    );
  });
};

module.exports = { getAvailableSlots, bookAppointment };
