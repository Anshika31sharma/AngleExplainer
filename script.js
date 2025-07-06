const canvas = document.getElementById('polygon-canvas');
const ctx = canvas.getContext('2d');
const formulaText = document.getElementById('angle-formula');
const sidesDisplay = document.getElementById('sides-display');
const toggleThemeBtn = document.getElementById('toggle-theme');
const toggleVoiceBtn = document.getElementById('toggle-voice');

let sides = 3;
let voiceOn = false;
let currentTheme = 'light';

function drawPolygon(n) {
  const radius = 130;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const angle = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = '#ff6f91';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#ff6f91';
  ctx.shadowBlur = 10;
  ctx.stroke();

  ctx.shadowBlur = 0;
}

function updateInfo() {
  const sum = (sides - 2) * 180;
  formulaText.innerHTML = `Sum of interior angles: <strong>${sum}°</strong>`;
  sidesDisplay.textContent = `Sides: ${sides}`;

  drawPolygon(sides);

  if (voiceOn) {
    speak(`For a polygon with ${sides} sides, the sum of interior angles is ${sum} degrees.`);
  }
}

document.getElementById('increase').addEventListener('click', () => {
  if (sides < 12) {
    sides++;
    updateInfo();
  }
});

document.getElementById('decrease').addEventListener('click', () => {
  if (sides > 3) {
    sides--;
    updateInfo();
  }
});

toggleThemeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleThemeBtn.textContent = currentTheme === 'dark' ? '🌙 Toggle Theme' : '🌞 Toggle Theme';
});

toggleVoiceBtn.addEventListener('click', () => {
  voiceOn = !voiceOn;
  toggleVoiceBtn.textContent = voiceOn ? '🔇 Voice Off' : '🔊 Voice Over';
});

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1.2;
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

document.documentElement.setAttribute('data-theme', currentTheme);
updateInfo();
