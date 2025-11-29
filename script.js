const exprEl = document.getElementById("expr");
const resultEl = document.getElementById("result");

let expr = "";

function safeEval(expression) {
  expression = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/log/g, "Math.log10")
    .replace(/√/g, "Math.sqrt");

  return Function("return " + expression)();
}

function updateUI() {
  exprEl.textContent = expr || "";

  const last = expr.slice(-1);
  const ops = "+-*/";

  if (!expr.trim() || ops.includes(last)) {
    resultEl.textContent = "0";
    return;
  }

  try {
    const out = safeEval(expr);
    resultEl.textContent = out;
  } catch {
    resultEl.textContent = "Error";
  }
}

document.addEventListener("click", e => {
  if (!e.target.matches("button")) return;

  const value = e.target.dataset.value;
  const func = e.target.dataset.func;
  const action = e.target.dataset.action;

  if (action === "clear") {
    expr = "";
    updateUI();
    return;
  }

  if (action === "equals") {
    try {
      expr = String(safeEval(expr));
      updateUI();
    } catch {
      resultEl.textContent = "Error";
    }
    return;
  }

  if (func) {
    if (func === "square") expr += "²";
    else if (func === "percent") expr += "/100";
    else expr += func + "(";
    updateUI();
    return;
  }

  if (value) {
    expr += value;
    updateUI();
  }
});