let display = document.getElementById('display');
let historyList = document.getElementById('historyList');

function toggleTheme() {
  document.body.classList.toggle('light-theme');
}

function appendValue(value) {
  display.value += value;
  updatePreview(display.value);
}

function updatePreview(input) {
  try {
    let previewExp = input;

    previewExp = previewExp.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
    previewExp = previewExp.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
    previewExp = previewExp.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
    previewExp = previewExp.replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)');
    previewExp = previewExp.replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)');
    previewExp = previewExp.replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)');
    previewExp = previewExp.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
    previewExp = previewExp.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');
    previewExp = previewExp.replace(/π/g, 'Math.PI');
    previewExp = previewExp.replace(/\be\b/g, 'Math.E');

    const previewResult = eval(previewExp);
    document.getElementById("preview").innerText = "= " + previewResult.toFixed(4);
  } catch {
    document.getElementById("preview").innerText = "";
  }
}


function clearDisplay() {
  display.value = '';
  updatePreview('');
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    // Replace ^ with Math.pow
    expression = expression.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');

    // √(expression)
    expression = expression.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

    // Trig functions (in degrees)
    expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)');
    expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)');
    expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)');

    // Logarithmic functions
    expression = expression.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
    expression = expression.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');

    // π and e constants
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/\be\b/g, 'Math.E');

    const result = eval(expression);

    // Format result to 4 decimal places (optional: change to 2 or 6 if you want)
    display.value = parseFloat(result.toFixed(4));

    addToHistory(display.value);
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
