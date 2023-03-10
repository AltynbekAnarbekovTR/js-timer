const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
// const timerEl = document.querySelector("span");
// Timers
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
// Buttons
const btnStart = document.querySelector(".btn-start-resume");
const btnPause = document.querySelector(".btn-pause");
const btnStop = document.querySelector(".btn-stop");
const btnReset = document.querySelector(".btn-reset");
// Variables
let pause = false;
let seconds = 0;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    startTimer(seconds);
    btnStart.style.display = "none";
    btnPause.style.display = "inline-block";
    btnStop.style.display = "inline-block";
    btnReset.style.display = "inline-block";
  };
};

const startTimer = (seconds) => {
  let interval = setInterval(() => {
    console.log("here");
    if (pause === true) {
      return;
    }
    seconds--;
    updateInputs(seconds);
    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const updateInputs = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  hoursEl.innerHTML = hours;
  minutesEl.innerHTML = minutes;
  secondsEl.innerHTML = seconds;
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});

btnPause.addEventListener("click", () => {
  pause = !pause;
  if (pause) {
    btnPause.innerHTML = "Resume";
  }
  if (!pause) {
    btnPause.innerHTML = "Pause";
  }
});
