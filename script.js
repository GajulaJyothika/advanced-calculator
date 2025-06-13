let display = document.getElementById('display');
let historyList = document.getElementById('historyList');

function toggleTheme() {
  document.body.classList.toggle('light-theme');
}

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}
function clearHistory() {
  historyList.innerHTML = '';
}


// Keyboard Support
document.addEventListener('keydown', function (e) {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'c' || key === 'C') {
    clearDisplay();
  }
});
