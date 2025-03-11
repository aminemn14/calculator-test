class Calculator {
  constructor() {
    this.expression = "";
    this.history = [];
  }

  append(char) {
    const operators = ["+", "−", "×"];
    const lastChar = this.expression.slice(-1);
    if (operators.includes(char) && operators.includes(lastChar)) {
      this.expression = this.expression.slice(0, -1) + char;
    } else {
      this.expression += char;
    }
  }

  clear() {
    this.expression = "";
  }

  delete() {
    this.expression = this.expression.slice(0, -1);
  }

  compute() {
    try {
      let expr = this.expression.replace(/×/g, "*").replace(/−/g, "-");
      // Convertit chaque nombre dans l'expression en sa représentation standard
      expr = expr.replace(/\d+(\.\d+)?/g, (num) => String(Number(num)));
      let result = eval(expr);
      this.history.push({ expr: this.expression, result });
      this.expression = result.toString();
    } catch (e) {
      this.expression = "Error";
    }
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    return this.history;
  }
}

module.exports = Calculator;
