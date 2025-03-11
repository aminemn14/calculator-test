const { test, expect } = require("@playwright/test");
const path = require("path");

test.beforeEach(async ({ page }) => {
  const filePath = "file://" + path.resolve(__dirname, "../index.html");
  await page.goto(filePath);
});

// Test 1 : Vérifie que les boutons numériques affichent correctement les chiffres saisis
test("should display numbers as they are pressed", async ({ page }) => {
  await page.click('button[data-value="1"]');
  await page.click('button[data-value="0"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("10");
});

// Test 2 : Vérifie que l'opérateur est correctement ajouté à l'expression affichée
test("should append operator and display the expression", async ({ page }) => {
  await page.click('button[data-value="1"]');
  await page.click('button[data-value="0"]');
  await page.click('button[data-action="add"]');
  await page.click('button[data-value="2"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("10+2");
});

// Test 3 : Vérifie que lorsqu'un opérateur est appuyé consécutivement, le dernier remplace le précédent
test("should replace operator if pressed consecutively", async ({ page }) => {
  await page.click('button[data-value="1"]');
  await page.click('button[data-action="add"]');
  await page.click('button[data-action="subtract"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("1−");
});

// Test 4 : Vérifie que le bouton "C" efface l'expression et affiche "0" en cas d'expression vide
test("should clear expression when C is pressed", async ({ page }) => {
  await page.click('button[data-value="1"]');
  await page.click('button[data-action="clear"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("0");
});

// Test 5 : Vérifie que le bouton "DEL" supprime le dernier caractère de l'expression affichée
test("should delete last character when DEL is pressed", async ({ page }) => {
  await page.click('button[data-value="1"]');
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="delete"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("1");
});

// Test 6 : Vérifie que la multiplication est correctement calculée (2×2 = 4)
test("should compute multiplication correctly", async ({ page }) => {
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="multiply"]');
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="calculate"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("4");
});

// Test 7 : Vérifie que l'expression avec des zéros en tête est correctement évaluée (exemple : "02×2" donne 4)
test("should handle expression with leading zeros", async ({ page }) => {
  await page.click('button[data-value="0"]');
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="multiply"]');
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="calculate"]');
  const display = await page.textContent("#calcDisplay");
  expect(display).toBe("4");
});

// Test 8 : Vérifie que l'historique se met à jour après le calcul d'une expression
test("should update history after computation", async ({ page }) => {
  await page.click('button[data-value="1"]');
  await page.click('button[data-value="0"]');
  await page.click('button[data-action="add"]');
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="calculate"]');
  const historyText = await page.textContent("#historyList");
  expect(historyText).toContain("10+2 = 12");
});

// Test 9 : Vérifie que le bouton d'effacement de l'historique vide bien la liste affichée
test("should clear history when the clear-history button is clicked", async ({
  page,
}) => {
  // Effectuer un calcul pour remplir l'historique
  await page.click('button[data-value="1"]');
  await page.click('button[data-value="0"]');
  await page.click('button[data-action="add"]');
  await page.click('button[data-value="2"]');
  await page.click('button[data-action="calculate"]');
  // Cliquer sur le bouton d'effacement de l'historique
  await page.click("#clear-history");
  const historyText = await page.textContent("#historyList");
  expect(historyText.trim()).toBe("");
});
