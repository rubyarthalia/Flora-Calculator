const history = document.querySelector("#history");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let justCalculated = false;

function formatResult(value) {
  let num = Number(value);

  // if number is too long → convert to exponential
  if (num.toString().length > 12) {
    return num.toExponential(4); // 4 decimal places
  }

  return num;
}

function pressButton(id) {
  const btn = document.getElementById(id);
  if (btn) {
    btn.click();
  }
}

buttons.forEach((item) => {
  item.onclick = () => {

    // clear
    if (item.id == "clear") {
        display.innerText = "";
        history.innerText = "";
        justCalculated = false;
    // backspace
    } else if (item.id == "backspace") {
        let string = display.innerText.toString();
        display.innerText = string.substr(0, string.length - 1);
    // equal
    } else if (display.innerText != "" && item.id == "equal") {
        try {
            let expression = display.innerText;
            let result = eval(expression);
            history.innerText = expression + " =";
            display.innerText = formatResult(result);
            justCalculated = true;
        } catch {
            display.innerText = "Error";
            setTimeout(() => (display.innerText = ""), 2000);
        }
    } else if (display.innerText == "" && item.id == "equal") {
        display.innerText = "Empty!";
        setTimeout(() => (display.innerText = ""), 2000);
    // percent
    } else if (item.id == "percent") {
        let value = parseFloat(display.innerText);
        if (!isNaN(value)) {
            display.innerText = value / 100;
        }
    // plus minus
    } else if (item.id == "plusMinus") {
        let value = display.innerText;

        if (value.startsWith("-")) {
            display.innerText = value.substring(1);
        } else if (value !== "") {
            display.innerText = "-" + value;
        }
    // decimal
    } else if (item.id == "decimal") {
        let current = display.innerText;

        // split by operators to get the last number
        let parts = current.split(/[\+\-\*\/]/);
        let lastNumber = parts[parts.length - 1];

        // only allow decimal if last number doesn't have one
        if (!lastNumber.includes(".")) {
            display.innerText += ".";
        }
    // numbers and operators
    } else {
        const operators = ["+", "-", "*", "/"];

        // if just calculated
        if (justCalculated) {

        if (operators.includes(item.id)) {
            display.innerText += item.id;
        } 
        else if (!isNaN(item.id)) {
            display.innerText = item.id;
            history.innerText = ""; // 🔥 CLEAR HISTORY HERE
        } 
        else {
            display.innerText += item.id;
        }

        justCalculated = false;
    }else {
            display.innerText += item.id;
        }
    }
  };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");

const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark = !isDark;
    if (calculator.classList.contains("dark")) {
        toggleIcon.classList.remove("fa-leaf");
        toggleIcon.classList.add("fa-spa");
    } else {
        toggleIcon.classList.remove("fa-spa");
        toggleIcon.classList.add("fa-leaf");
    }
};

// keypad
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    pressButton(key);
  }

  else if (["+", "-", "*", "/"].includes(key)) {
    pressButton(key);
  }

  else if (key === ".") {
    pressButton("decimal");
  }

  else if (key === "Enter") {
    pressButton("equal");
  }

  else if (key === "Backspace") {
    pressButton("backspace");
  }

  else if (key === "Escape") {
    pressButton("clear");
  }
});