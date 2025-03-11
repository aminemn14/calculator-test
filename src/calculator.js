// Classe Calculator : une calculatrice simple avec historique
class Calculator {
  constructor() {
    this.expression = "";
    this.history = [];
  }

  // Ajoute un caractère, en évitant les opérateurs successifs
  append(char) {
    const operators = ["+", "−", "×"];
    const lastChar = this.expression.slice(-1);
    if (operators.includes(char) && operators.includes(lastChar)) {
      this.expression = this.expression.slice(0, -1) + char;
    } else {
      this.expression += char;
    }
  }

  // Réinitialise l'expression
  clear() {
    this.expression = "";
  }

  // Supprime le dernier caractère
  delete() {
    this.expression = this.expression.slice(0, -1);
  }

  // Calcule l'expression et met à jour l'historique
  compute() {
    try {
      let expr = this.expression.replace(/×/g, "*").replace(/−/g, "-");
      expr = expr.replace(/\d+(\.\d+)?/g, (num) => String(Number(num)));
      let result = eval(expr);
      this.history.push({ expr: this.expression, result });
      this.expression = result.toString();
    } catch (e) {
      this.expression = "Error";
    }
  }

  // Renvoie l'historique
  getHistory() {
    return this.history;
  }

  // Efface l'historique
  clearHistory() {
    this.history = [];
    return this.history;
  }
}

module.exports = Calculator;
