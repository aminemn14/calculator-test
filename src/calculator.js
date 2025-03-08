class Calculator {
  constructor() {
    this.history = [];
  }

  add(a, b) {
    const result = a + b;
    this._saveToHistory(a, "+", b, result);
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this._saveToHistory(a, "-", b, result);
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this._saveToHistory(a, "*", b, result);
    return result;
  }

  _saveToHistory(a, operator, b, result) {
    this.history.push({ a, operator, b, result });
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
