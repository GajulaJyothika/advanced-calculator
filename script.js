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
    let expression = display.value;

    // Handle power operator: x^y → Math.pow(x, y)
    expression = expression.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');

    // Handle square roots:
    // √(9+7) → Math.sqrt(9+7)
    expression = expression.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');

    // √9 → Math.sqrt(9)
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

    // sin(30) → Math.sin(...), convert to radians
    expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)');
    expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)');
    expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)');

    const result = eval(expression);
    display.value = result;
    addToHistory(expression + ' = ' + result);
  } catch (error) {
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
