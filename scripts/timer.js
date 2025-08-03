let minutesValue;
let hoursValue;
let secondsValue;
let timeArray;
let btnPressed = 'stop';
let timerInterval;
const stopBtn = document.querySelector('.js-stop');
const resumeBtn = document.querySelector('.js-resume');
const playBtn = document.querySelector('.js-play');
const upBtn = document.querySelector('.js-up');
const downBtn = document.querySelector('.js-down');

let timer = 'stopped';
if(timer !== 'stopped'){
  upBtn.style.display = 'none';
  downBtn.style.display = 'none';
}else{
  upBtn.style.display = 'flex';
  downBtn.style.display = 'flex';
}
function setBtn(){
  if(timer === 'stopped'){
    upBtn.style.display = 'flex';
    downBtn.style.display = 'flex';
    stopBtn.style.backgroundColor = '#f51616';
    resumeBtn.style.backgroundColor = `var(--primary-color)`;
    playBtn.style.backgroundColor = `var(--primary-color)`;
  }else if(timer === 'resume'){
    upBtn.style.display = 'none';
    downBtn.style.display = 'none';
    stopBtn.style.backgroundColor = `var(--primary-color)`;
    resumeBtn.style.backgroundColor = '#4caf50';
    playBtn.style.backgroundColor = `var(--primary-color)`; 
  }else if(timer === 'play'){
    upBtn.style.display = 'none';
    downBtn.style.display = 'none';
    stopBtn.style.backgroundColor = `var(--primary-color)`;
    resumeBtn.style.backgroundColor = `var(--primary-color)`;
    playBtn.style.backgroundColor = '#2196f3';
  }
}
setBtn();

function stopColor(color){
  stopBtn.style.backgroundColor = color;
  resumeBtn.style.backgroundColor = `var(--primary-color)`;
  playBtn.style.backgroundColor = `var(--primary-color)`;
  timer = 'stopped';
  setBtn();
}
function resumeColor(color){
  stopBtn.style.backgroundColor = `var(--primary-color)`;
  resumeBtn.style.backgroundColor = color;
  playBtn.style.backgroundColor = `var(--primary-color)`;
  timer = 'resume';
  setBtn();
}
function playColor(color){
  stopBtn.style.backgroundColor = `var(--primary-color)`;
  resumeBtn.style.backgroundColor = `var(--primary-color)`;
  playBtn.style.backgroundColor = color;
  timer = 'play';
  setBtn();
} 
stopBtn.addEventListener('click', () => {
  stopColor('#f51616')
});
resumeBtn.addEventListener('click', () => {
  resumeColor('#4caf50');
});
playBtn.addEventListener('click', () => {
  playColor('#2196f3')
});

const hourNumber = document.querySelector('.js-hour-number');
const minuteNumber = document.querySelector('.js-minute-number');
const secondNumber = document.querySelector('.js-second-number');
const upHours = document.querySelector('.js-up-hours');
const upMinutes = document.querySelector('.js-up-minutes');
const upSeconds = document.querySelector('.js-up-seconds');
const downHours = document.querySelector('.js-down-hours');
const downMinutes = document.querySelector('.js-down-minutes');
const downSeconds = document.querySelector('.js-down-seconds');

function updateTime(unit, value){
  if(unit === 'hours' && value === 'up'){
    if(hoursValue <= 23){
    hoursValue++;
    }else{
      hoursValue = 0;
    }
  }else if(unit === 'hours' && value === 'down'){
    if(hoursValue > 0){
      hoursValue--;
    }else{
      hoursValue = 24;
    }
  }else if(unit === 'minutes' && value === 'up'){
    if(minutesValue < 59){
    minutesValue++;
    }else{
      minutesValue = 0;
    }
  }else if(unit === 'minutes' && value === 'down'){
    if(minutesValue > 0){
      minutesValue--;
    }else{
      minutesValue = 59;
    }
  }else if(unit === 'seconds' && value === 'up'){
    if(secondsValue < 59){
    secondsValue++;
    }else{
      secondsValue = 0;
    }
  }else if(unit === 'seconds' && value === 'down'){
    if(secondsValue > 0){
      secondsValue--;
    }else{
      secondsValue = 59;
    }
  }
  saveToLocalStorage();
  updateHTML(); 
}

upHours.addEventListener('click', () => {
  updateTime('hours', 'up');
});
downHours.addEventListener('click', () => {
  updateTime('hours', 'down');
});
upMinutes.addEventListener('click', () => {
  updateTime('minutes', 'up');
});
downMinutes.addEventListener('click', () => {
  updateTime('minutes', 'down');
});
upSeconds.addEventListener('click', () => {
  updateTime('seconds', 'up');
});
downSeconds.addEventListener('click', () => {
  updateTime('seconds', 'down');
}); 

function updateHTML(){
  hourNumber.textContent = hoursValue<10 ? `0${hoursValue}` : hoursValue;
  minuteNumber.textContent = minutesValue<10 ? `0${minutesValue}` : minutesValue;
  secondNumber.textContent = secondsValue<10 ? `0${secondsValue}` : secondsValue;
}
updateHTML();





function saveToLocalStorage(){
  timeArray = [hoursValue, minutesValue, secondsValue];
  localStorage.setItem('time', JSON.stringify(timeArray));
}
function loadFromLocalStorage(){
  const savedTime = localStorage.getItem('time');
  if(savedTime){
    timeArray = JSON.parse(savedTime);
    hoursValue = timeArray[0];
    minutesValue = timeArray[1];
    secondsValue = timeArray[2];
  }
  else{
    hoursValue = 0;
    minutesValue = 5;
    secondsValue = 0;
    timeArray = [hoursValue, minutesValue, secondsValue];
  }
}
playBtn.addEventListener('click', () => {
  startTimer();
})

function matchTimer(h,m,s,timeString){
  let timerTimeString = `${h}${m}${s}`;
  if(timerTimeString === timeString){
    clearInterval(timerInterval);
    //timerInterval = null;
    btnPressed = 'stop';
    updateHTML();
    loadFromLocalStorage();
    stopColor('#f51616');
  }
}
let timeString;
function startTimer(){
  if(timer==='play'){
    console.log(btnPressed)
    if(btnPressed === 'stop'){
      timeString = `${hoursValue}${minutesValue}${secondsValue}`;
      hoursValue = 0;
      minutesValue = 0;
      secondsValue = 0;
    }   
      updateHTML();
      btnPressed = 'play';
      timerInterval = setInterval(() => {
        if(secondsValue < 59){
          secondsValue++;
          matchTimer(hoursValue, minutesValue, secondsValue, timeString);
          console.log(timeString);
          updateHTML();
        }else{
          secondsValue = 0;
          matchTimer(hoursValue, minutesValue, secondsValue, timeString);
          if(minutesValue < 59){
            minutesValue++;
            updateHTML();
          }else{
            minutesValue = 0;
            if(hoursValue < 23){
              hoursValue++;
              updateHTML();
            }else{
              hoursValue = 0;
            }
          }
        }
        updateHTML();
      }, 1000);
  }
}


stopBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    //timerInterval = null;
    loadFromLocalStorage();
    updateHTML();
    btnPressed = 'stop';
});
resumeBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    btnPressed = 'pause';
});

loadFromLocalStorage();
updateHTML();