const stopBtn = document.querySelector('.js-stop');
const resumeBtn = document.querySelector('.js-resume');
const playBtn = document.querySelector('.js-play');

function stopColor(color){
  stopBtn.style.backgroundColor = color;
  resumeBtn.style.backgroundColor = `var(--primary-color)`;
  playBtn.style.backgroundColor = `var(--primary-color)`;
}
function resumeColor(color){
  stopBtn.style.backgroundColor = `var(--primary-color)`;
  resumeBtn.style.backgroundColor = color;
  playBtn.style.backgroundColor = `var(--primary-color)`;
}
function playColor(color){
  stopBtn.style.backgroundColor = `var(--primary-color)`;
  resumeBtn.style.backgroundColor = `var(--primary-color)`;
  playBtn.style.backgroundColor = color;
} 
stopBtn.addEventListener('click', () => {
  console.log('Stop button clicked');
  stopColor('#f51616')
});
resumeBtn.addEventListener('click', () => {
  console.log('Resume button clicked');
  resumeColor('#4caf50')
});
playBtn.addEventListener('click', () => {
  console.log('Play button clicked');
  playColor('#2196f3')
});