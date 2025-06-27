const channel = new BroadcastChannel('volley-scorer');
let state = {
  teamAName: 'Team A',
  teamBName: 'Team B',
  teamAScore: 0,
  teamBScore: 0,
  mainTimer: 0,
  timerRunning: false,
  timeoutA: 0,
  timeoutB: 0,
  timeoutDuration: 30
};
let timerInterval = null;

function broadcast() {
  channel.postMessage(state);
}

function updateDisplay() {
  if (typeof document === 'undefined') return;
  const aName = document.getElementById('teamANameDisp');
  const bName = document.getElementById('teamBNameDisp');
  const aScore = document.getElementById('teamAScoreDisp');
  const bScore = document.getElementById('teamBScoreDisp');
  const timer = document.getElementById('mainTimerDisp');
  const timeoutA = document.getElementById('timeoutADisp');
  const timeoutB = document.getElementById('timeoutBDisp');
  if (aName) aName.textContent = state.teamAName;
  if (bName) bName.textContent = state.teamBName;
  if (aScore) aScore.textContent = state.teamAScore;
  if (bScore) bScore.textContent = state.teamBScore;
  if (timer) timer.textContent = formatTime(state.mainTimer);
  if (timeoutA) timeoutA.textContent = state.timeoutA > 0 ? formatTime(state.timeoutA) : '';
  if (timeoutB) timeoutB.textContent = state.timeoutB > 0 ? formatTime(state.timeoutB) : '';
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  if (timerInterval) return;
  state.timerRunning = true;
  timerInterval = setInterval(() => {
    if (state.timerRunning && state.mainTimer > 0) {
      state.mainTimer--;
    }
    if (state.timeoutA > 0) state.timeoutA--;
    if (state.timeoutB > 0) state.timeoutB--;
    if (state.mainTimer === 0) state.timerRunning = false;
    updateDisplay();
    broadcast();
  }, 1000);
}

function stopTimer() {
  state.timerRunning = false;
}

function resetTimer(seconds) {
  state.mainTimer = seconds;
  updateDisplay();
  broadcast();
}

function setTeamNames(a, b) {
  state.teamAName = a;
  state.teamBName = b;
  updateDisplay();
  broadcast();
}

function addScore(team, delta) {
  if (team === 'A') {
    state.teamAScore = Math.max(0, state.teamAScore + delta);
  } else {
    state.teamBScore = Math.max(0, state.teamBScore + delta);
  }
  updateDisplay();
  broadcast();
}

function startTimeout(team) {
  if (team === 'A') {
    state.timeoutA = state.timeoutDuration;
  } else {
    state.timeoutB = state.timeoutDuration;
  }
  updateDisplay();
  broadcast();
}

channel.onmessage = (ev) => {
  Object.assign(state, ev.data);
  updateDisplay();
};

window.addEventListener('load', () => {
  updateDisplay();
  startTimer();
});
