const DEFAULT_VALUE = 10_531;

const counterEl = document.querySelector('.counter');
let currentValue = Number(localStorage.getItem('counter')) || DEFAULT_VALUE;

counterEl.style.setProperty('--num', currentValue);

setInterval(() => {
  currentValue += Math.round(Math.random() * 2000);
  counterEl.style.setProperty('--num', currentValue);
  localStorage.setItem('counter', currentValue);
}, 5 * 1000);
