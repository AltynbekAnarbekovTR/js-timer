const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
// const timerEl = document.querySelector("span");
// Timer
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
let secondsInitial = 0;
let interval;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    secondsInitial = seconds;
    pause = false;
    startTimer();
    btnStart.style.display = "none";
    btnPause.style.display = "inline-block";
    btnStop.style.display = "inline-block";
    btnReset.style.display = "inline-block";
  };
};

const startTimer = () => {
  interval = setInterval(() => {
    if (pause) {
      return;
    }
    seconds--;
    updateInputs();
    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const updateInputs = () => {
  const hoursValue = Math.floor(seconds / 60 / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutesValue = Math.floor((seconds / 60) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const secondssValue = Math.floor(seconds % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  hoursEl.innerHTML = hoursValue;
  minutesEl.innerHTML = minutesValue;
  secondsEl.innerHTML = secondssValue;
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/\D/g, "");
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener("click", () => {
  seconds = Number(inputEl.value);
  if (seconds <= 0) {
    return;
  }
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

btnReset.addEventListener("click", () => {
  seconds = secondsInitial;
  updateInputs();
});

btnStop.addEventListener("click", () => {
  stopTimer();
  seconds = secondsInitial;
  updateInputs();
  pause = false;
  btnPause.innerHTML = "Pause";

  btnStart.style.display = "inline-block";
  btnPause.style.display = "none";
  btnStop.style.display = "none";
  btnReset.style.display = "none";
});

const stopTimer = () => {
  clearInterval(interval);
};
