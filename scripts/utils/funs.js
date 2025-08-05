import { alarms, alarmIntervalID, renderAlarms, saveToLocalStorage } from "../alarm.js";
const alarmSound = new Audio('assets/bedside-clock-alarm-95792.mp3');
export function matchAlarmTime(){
  alarms.forEach((alarm,index)=>{
    let timeNow = new Date();
    let hoursNow = timeNow.getHours();
    let minutesNow = timeNow.getMinutes();
    let alarmHours, alarmMinutes;
    if(alarm.time.ampm === 'AM'){
      alarmHours = parseInt(alarm.time.hours);
    }
    else if(alarm.time.ampm === 'PM'){
      alarmHours = parseInt(alarm.time.hours) + 12;
    }
    let today = timeNow.getDay();

    if(today === 1){
      today = 'monday'
    }
    else if(today === 2){
      today = 'tuesday'
    }
    else if(today === 3){
      today = 'wednesday'
    }
    else if(today === 4){
      today = 'thursday'
    }
    else if(today === 5){
      today = 'friday'
    }
    else if(today === 6){
      today = 'saturday'
    }
    else if(today === 7){
      today = 'sunday'
    }

    alarmMinutes = parseInt(alarm.time.minutes);

    if(alarm.sceduale[0] !== 'everyday' && alarm.sceduale[0] !== 'once'){
      alarm.sceduale.forEach((day)=>{
        if(day === today && alarmHours === hoursNow && alarmMinutes === minutesNow){
          alarmSound.play().catch(err => {
            console.error("Audio playback failed:", err);
          });
          clearInterval(alarmIntervalID);
          alarmIntervalID = null;
          console.log(`Alarm rang at ${hoursNow} : ${minutesNow}`);
        }
      })
    }

    if(alarmHours === hoursNow && alarmMinutes === minutesNow && alarm.sceduale[0] === 'everyday'){
      alarmSound.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
      clearInterval(alarmIntervalID);
      alarmIntervalID = null;
      console.log(`Alarm rang at ${hoursNow} : ${minutesNow}`);
    }
    if(alarmHours === hoursNow && alarmMinutes === minutesNow && alarm.sceduale[0] === 'once'){
      alarms.splice(index, 1);
      saveToLocalStorage();
      renderAlarms();
      alarmSound.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
      clearInterval(alarmIntervalID);
      alarmIntervalID = null;
      console.log(`Alarm rang at ${hoursNow} : ${minutesNow}`);
    }
  })
}