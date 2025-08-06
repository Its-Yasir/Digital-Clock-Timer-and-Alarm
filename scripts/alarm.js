import { matchAlarmTime } from "./utils/funs.js";

const closeAddAlarmMenuBtn = document.querySelector('.js-close');
const addAlarmBoxBg = document.querySelector('.add-alarm-box-bg');
const addAlarmBoxContent = document.querySelector('.add-alarm-box-content');
const addAlarmBtn = document.querySelector('.js-add-alarm');
const body = document.body;
const upHours = document.querySelector('.js-up-hours');
const upMinutes = document.querySelector('.js-up-minutes');
const downHours = document.querySelector('.js-down-hours');
const downMinutes = document.querySelector('.js-down-minutes');
const ampmSelectorUp = document.querySelector('.js-ampm-up');
const ampmSelectorDown = document.querySelector('.js-ampm-down');
const main = document.querySelector('.js-main');
const onceOption = document.querySelector('.js-once');
const everyDayOption = document.querySelector('.js-everyDay');
const customOption = document.querySelector('.js-custom');
const checkboxDays = document.querySelector('.js-checkbox-days');
const mondayInput = document.querySelector('.js-monday');
const tuesdayInput = document.querySelector('.js-tuesday');
const wednesdayInput = document.querySelector('.js-wednesday');
const thursdayInput = document.querySelector('.js-thursday');
const fridayInput = document.querySelector('.js-friday');
const saturdayInput = document.querySelector('.js-saturday');
const sundayInput = document.querySelector('.js-sunday');
const saveAlarmBtn = document.querySelector('.js-save-alarm');

addAlarmBtn.addEventListener('click', () => {
  addAlarmBoxBg.style.display = 'flex'; 
  body.style.overflowY = 'hidden';
});

closeAddAlarmMenuBtn.addEventListener('click', () => {
  addAlarmBoxBg.style.display = 'none';
  body.style.overflowY = 'auto';
});

body.addEventListener('click', (e) => {
  if (e.target === addAlarmBoxBg) {
    addAlarmBoxBg.style.display = 'none';
    body.style.overflowY = 'auto';
  }
});

function updateDays(array){
  let html = '';
  array.forEach((value, index)=>{
    html += `
      <div class="everyDay">${value.toUpperCase()}</div>
    `;
  });
  return html;
}

export let alarms = JSON.parse(localStorage.getItem('alarms')) || [{
  id: 'al1',
  time:{
    hours:'05',
    minutes:'00',
    ampm:'AM'
  },
  sceduale: [
    'everyday'
  ],
  timeString: '0500AM',
  status: 'not ringing'
}]
export function renderAlarms() {
  main.innerHTML = '';
  alarms.forEach((alarm,index) => {
    main.innerHTML += `
      <div class="alarm alarm${index + 1}">
        <div class="data">
          <div class="left">
            <div class="time">
              <div class="hours">${alarm.time.hours}</div>
              <div class="colon">:</div>
              <div class="minutes">${alarm.time.minutes}</div>
              <div class="ampm">${alarm.time.ampm}</div>
            </div>
            <div class="sceduale">
              ${updateDays(alarm.sceduale)}
            </div>
          </div>
        </div>
        <div class="edit">
          <button class="delete js-delete" data-delete-id="${alarm.id}">Delete Alarm</button>
        </div>
      </div>
    `
  });
  

  document.querySelectorAll('.js-delete').
    forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
      const alarmId = deleteBtn.dataset.deleteId;
      alarms = alarms.filter(alarm => alarm.id !== alarmId);
      renderAlarms();
      saveToLocalStorage();
    });
  });
}

let hours = 5;
let minutes = 0;
let ampm = 'AM';
let sceduale;

upHours.addEventListener('click', () => {
  if( hours < 12) {
    hours++;
  } else {
    hours = 1;  
  }
  document.querySelector('.js-hour-number').textContent = hours.toString().padStart(2, '0');
});
downHours.addEventListener('click', () => {
  if( hours > 1) {
    hours--;
  } else {
    hours = 12;  
  }
  document.querySelector('.js-hour-number').textContent = hours.toString().padStart(2, '0');
});
upMinutes.addEventListener('click', () => {
  if( minutes < 59) {
    minutes++;
  } else {
    minutes = 0;  
  }
  document.querySelector('.js-minute-number').textContent = minutes.toString().padStart(2, '0');
});
downMinutes.addEventListener('click', () => {
  if( minutes > 0) {
    minutes--;
  } else {
    minutes = 59;  
  }
  document.querySelector('.js-minute-number').textContent = minutes.toString().padStart(2, '0');
});
ampmSelectorUp.addEventListener('click', () => {
  ampm = ampm === 'AM' ? 'PM' : 'AM';
  document.querySelector('.js-ampm').textContent = ampm;
});
ampmSelectorDown.addEventListener('click', () => {
  ampm = ampm === 'AM' ? 'PM' : 'AM';
  document.querySelector('.js-ampm').textContent = ampm;
});

onceOption.addEventListener('click', () => {
  sceduale = 'once';
  checkboxDays.style.display = 'none';
});
everyDayOption.addEventListener('click', () => {
  sceduale = 'everyday';
  checkboxDays.style.display = 'none';
});
customOption.addEventListener('click', () => {
  checkboxDays.style.display = 'inline-block';
  sceduale = false;
});

let selectedDays = [];
checkboxDays.addEventListener('change', (event) => {
  const checkbox = event.target;
  if (checkbox.type === 'checkbox') {
    const day = checkbox.value.toLowerCase();

    if (checkbox.checked) {
      if (!selectedDays.includes(day)) {
        selectedDays.push(day);
      }
    } else {
      // Remove the unchecked day
      selectedDays = selectedDays.filter(d => d !== day);
    }
  }
});

function updateAlarmsArray(){
  let hoursValue = document.querySelector('.js-hour-number').textContent;
  let minutesValue = document.querySelector('.js-minute-number').textContent;
  let ampmValue = document.querySelector('.js-ampm').textContent;

  if(selectedDays.length !== 0) {
    sceduale = 'custom';
  }

  if(sceduale){
    alarms.push({
      id: `al${alarms.length + 1}`,
      time: {
        hours: hoursValue,
        minutes: minutesValue,
        ampm: ampmValue
      },
      sceduale: selectedDays.length !== 0 ? selectedDays : [sceduale],
      timeString: `${hoursValue}${minutesValue}${ampmValue}`,
      status: 'not ringing'
    });
    renderAlarms();
    addAlarmBoxBg.style.display = 'none';
    selectedDays = [];
  }else{
    alert('Please select specific days for the alarm.');
  }
  saveToLocalStorage();
}
saveAlarmBtn.addEventListener('click', () => {
  updateAlarmsArray();
  body.style.overflowY = 'auto';
});

export function saveToLocalStorage() {
  localStorage.setItem('alarms', JSON.stringify(alarms));
}
export let alarmIntervalID = setInterval(() => {
  matchAlarmTime();
}, 1000);
saveToLocalStorage();
renderAlarms();