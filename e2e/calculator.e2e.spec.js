const { test, expect } = require("@playwright/test");
const path = require("path");

test.beforeEach(async ({ page }) => {
  // Charger le fichier index.html en local
  const filePath = "file://" + path.resolve(__dirname, "../public/index.html");
  await page.goto(filePath);
});

test("should perform addition and display result and history", async ({
  page,
}) => {
  await page.fill("#num1", "10");
  await page.fill("#num2", "5");
  await page.click('button[data-operation="add"]');
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
  let historyText = await page.textContent("#history");
  expect(historyText).toContain("20 * 4 = 80");

  // Cliquer sur le bouton de réinitialisation de l'historique
  await page.click("#clear-history");
  historyText = await page.textContent("#history");
  expect(historyText.trim()).toBe("History:");
});
