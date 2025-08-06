import { alarms, renderAlarms, saveToLocalStorage } from "../alarm.js";

const alarmSound = new Audio('assets/bedside-clock-alarm-95792.mp3');

// Track which alarm is currently ringing
let currentAlarmIndex = null;

// Show alarm popup
function showAlarmPopup() {
  const popup = document.querySelector('.alarm-popup');
  if (popup) popup.style.display = 'flex';
}

// Hide alarm popup and stop sound
function hideAlarmPopup() {
  const popup = document.querySelector('.alarm-popup');
  if (popup) popup.style.display = 'none';

  alarmSound.pause();
  alarmSound.currentTime = 0;

  if (currentAlarmIndex !== null && alarms[currentAlarmIndex]) {
    alarms[currentAlarmIndex].status = 'dismissed';
    saveToLocalStorage();
    renderAlarms();
    currentAlarmIndex = null;
  }
}

// Get current day as a string (e.g., "monday")
function getDayName(dayNumber) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[dayNumber];
}

// Main alarm matching function
export function matchAlarmTime() {
  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();
  const nowTimeStr = `${nowHours}:${nowMinutes}`;
  const currentDay = getDayName(now.getDay());

  alarms.forEach((alarm, index) => {
    // Parse alarm time into 24-hour format
    let alarmHours = parseInt(alarm.time.hours);
    let alarmMinutes = parseInt(alarm.time.minutes);
    if (alarm.time.ampm === 'PM' && alarmHours !== 12) alarmHours += 12;
    if (alarm.time.ampm === 'AM' && alarmHours === 12) alarmHours = 0;
    const alarmTimeStr = `${alarmHours}:${alarmMinutes}`;

    // ✅ Reset alarm status if current time is different (so it can ring next day)
    if (alarm.status === 'ringing' && nowTimeStr !== alarmTimeStr) {
      alarm.status = 'not ringing';
      saveToLocalStorage();
      return;
    }

    // ⛔ Skip dismissed alarms
    if (alarm.status === 'dismissed') return;

    // ⏰ Check if current time matches alarm time
    if (nowTimeStr !== alarmTimeStr) return;

    // ✅ Check if this alarm should ring today
    const schedule = alarm.sceduale;
    const shouldRing =
      schedule[0] === 'everyday' ||
      schedule[0] === 'once' ||
      schedule.includes(currentDay);

    if (!shouldRing) return;

    // 🛎️ Alarm should ring
    currentAlarmIndex = index;
    alarm.status = 'ringing';
    alarmSound.play().catch(err => console.error("Audio failed:", err));
    showAlarmPopup();

    // 🔁 If it's a "once" alarm, delete it
    if (schedule[0] === 'once' || (schedule.length === 1 && schedule[0] !== 'everyday')) {
      alarms.splice(index, 1);
    }

    saveToLocalStorage();
    renderAlarms();
  });
}

// Handle popup close button
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.alarm-popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideAlarmPopup);
  }
});
