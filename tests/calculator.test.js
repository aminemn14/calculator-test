const Calculator = require("../src/calculator");

describe("Calculator", () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  test("should add two numbers", () => {
    expect(calc.add(2, 3)).toBe(5);
    expect(calc.getHistory()[0]).toEqual({
      a: 2,
      operator: "+",
      b: 3,
      result: 5,
    });
  });

  test("should subtract two numbers", () => {
    expect(calc.subtract(5, 3)).toBe(2);
    expect(calc.getHistory()[0]).toEqual({
      a: 5,
      operator: "-",
      b: 3,
      result: 2,
    });
  });

  test("should multiply two numbers", () => {
    expect(calc.multiply(4, 3)).toBe(12);
    expect(calc.getHistory()[0]).toEqual({
      a: 4,
      operator: "*",
      b: 3,
      result: 12,
    });
  });

  test("should clear history", () => {
    calc.add(1, 2);
    calc.subtract(5, 3);
    expect(calc.getHistory().length).toBe(2);
    calc.clearHistory();
    expect(calc.getHistory().length).toBe(0);
  });
});
