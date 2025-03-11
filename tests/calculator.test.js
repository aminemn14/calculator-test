const Calculator = require("../src/calculator");

describe("Calculator", () => {
  let calc;

  // Avant chaque test, on crée une nouvelle instance de Calculator
  beforeEach(() => {
    calc = new Calculator();
  });

  // Test 1 : Vérifie que l'ajout de chiffres et d'opérateurs se fait correctement et que l'expression est construite comme attendu
  test("should append numbers and operators correctly", () => {
    calc.append("1");
    calc.append("0");
    calc.append("+");
    calc.append("2");
    expect(calc.expression).toBe("10+2");
  });

  // Test 2 : Vérifie que lorsqu'un opérateur est appuyé consécutivement, le dernier remplace le précédent dans l'expression
  test("should replace operator if pressed consecutively", () => {
    calc.append("1");
    calc.append("+");
    calc.append("−");
    expect(calc.expression).toBe("1−");
  });

  // Test 3 : Vérifie que la méthode delete supprime correctement le dernier caractère de l'expression
  test("should delete last character", () => {
    calc.append("1");
    calc.append("2");
    calc.delete();
    expect(calc.expression).toBe("1");
  });

  // Test 4 : Vérifie que la méthode clear efface complètement l'expression en cours
  test("should clear expression", () => {
    calc.append("1");
    calc.append("2");
    calc.clear();
    expect(calc.expression).toBe("");
  });

  // Test 5 : Vérifie que le calcul d'une addition se fait correctement et que l'expression est mise à jour avec le résultat
  test("should compute addition correctly", () => {
    calc.append("1");
    calc.append("0");
    calc.append("+");
    calc.append("2");
    calc.compute();
    expect(calc.expression).toBe("12");
  });

  // Test 6 : Vérifie que le calcul d'une soustraction se fait correctement et que l'expression est mise à jour avec le résultat
  test("should compute subtraction correctly", () => {
    calc.append("5");
    calc.append("−");
    calc.append("3");
    calc.compute();
    expect(calc.expression).toBe("2");
  });

  // Test 7 : Vérifie que le calcul d'une multiplication se fait correctement et que l'expression est mise à jour avec le résultat
  test("should compute multiplication correctly", () => {
    calc.append("4");
    calc.append("×");
    calc.append("3");
    calc.compute();
    expect(calc.expression).toBe("12");
  });

  // Test 8 : Vérifie que l'expression avec des zéros en tête est correctement évaluée (ex: "02×2" doit donner 4)
  test("should handle expression with leading zeros", () => {
    calc.append("0");
    calc.append("2");
    calc.append("×");
    calc.append("2");
    calc.compute();
    expect(calc.expression).toBe("4");
  });

  // Test 9 : Vérifie que l'historique est mis à jour après le calcul, en enregistrant l'expression et le résultat
  test("should update history on compute", () => {
    calc.append("1");
    calc.append("0");
    calc.append("+");
    calc.append("2");
    calc.compute();
    expect(calc.getHistory().length).toBe(1);
    expect(calc.getHistory()[0]).toEqual({ expr: "10+2", result: 12 });
  });

  // Test 10 : Vérifie que la méthode clearHistory efface correctement l'historique
  test("should clear history", () => {
    calc.append("1");
    calc.append("+");
    calc.append("2");
    calc.compute();
    calc.append("3");
    calc.append("×");
    calc.append("4");
    calc.compute();
    expect(calc.getHistory().length).toBe(2);
    calc.clearHistory();
    expect(calc.getHistory().length).toBe(0);
  });
});
