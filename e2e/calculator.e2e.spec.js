const { test, expect } = require("@playwright/test");
const path = require("path");

test.beforeEach(async ({ page }) => {
  // Charger le fichier index.html
  const filePath = "file://" + path.resolve(__dirname, "../index.html");
  await page.goto(filePath);
});

test("should perform addition and display result and history", async ({
  page,
}) => {
  await page.fill("#num1", "10");
  await page.fill("#num2", "5");
  // Sélectionner l'opération addition
  await page.click('button[data-operation="add"]');
  // Cliquer sur le bouton Calculate pour effectuer le calcul
  await page.click("#calculate");

  // Vérifier le résultat affiché
  const resultText = await page.textContent("#result");
  expect(resultText).toContain("15");

  // Vérifier que l'historique affiche l'opération
  const historyText = await page.textContent("#history");
  expect(historyText).toContain("10 + 5 = 15");
});

test("should clear history when clear button is clicked", async ({ page }) => {
  // Effectuer une opération pour ajouter une entrée à l'historique
  await page.fill("#num1", "20");
  await page.fill("#num2", "4");
  await page.click('button[data-operation="multiply"]');
  await page.click("#calculate");

  let historyText = await page.textContent("#history");
  // Pour la multiplication, l'opérateur affiché est "×"
  expect(historyText).toContain("20 × 4 = 80");

  // Cliquer sur le bouton Clear History
  await page.click("#clear-history");
  historyText = await page.textContent("#history");
  // Après effacement, le header "History:" est affiché (si vous modifiez le code pour toujours afficher ce header)
  expect(historyText.trim()).toBe("History:");
});
