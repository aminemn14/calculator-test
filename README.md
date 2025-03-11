# Calculator Project

This project is a calculator application developed using Test Driven Development (TDD). It performs basic arithmetic operations (addition, subtraction, multiplication) and manages an operation history that is persisted in localStorage. The user interface is styled with Tailwind CSS, and the project includes both unit tests (using Jest) and end-to-end tests (using Playwright).

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/aminemn14/calculator-test.git
cd calculator-test
```

2. **Install dependencies:**

```bash
npm install
```

## Running the tests

### Unit Tests (Jest)

To run the unit tests, use:

```bash
npm run test:unit
```

### End-to-End Tests (Playwright)

To run the end-to-end tests, use:

```bash
npm run test:e2e
```

### All Tests (Unit + E2E)

To run all tests, use:

```bash
npm run test
```

### Linting

To check the code quality with ESLint, use:

```bash
npm run lint
```

### Project Structure

• root/: Contains the index.html file with the user interface.
• src/: Contains the business logic (e.g., calculator.js).
• tests/: Contains unit tests written with Jest.
• e2e/: Contains end-to-end tests written with Playwright.
• jest.config.js: Jest configuration file to ignore E2E tests.
• playwright.config.js: Playwright configuration file to limit tests to the e2e folder.
• .eslintrc.json: ESLint configuration file.

### Features

• Basic Arithmetic Operations: Addition, subtraction, multiplication.
• History Management: Operations are saved and persisted using localStorage.
• Improved UI/UX:
• Operation buttons are enabled only when both input fields have valid values.
• The operation is selected first, then applied by clicking the “Calculate” button.
• The history header (“History:”) is displayed only when there are saved entries.
• Unit tests ensure the business logic works as expected.
• End-to-end tests validate the user interface behavior.
• Code Quality: Linting is integrated to enforce coding standards.

### Usage

1. Open the index.html file in your browser.
2. Enter numbers into the input fields.
3. Select an arithmetic operation by clicking the corresponding button (enabled only if both numbers are provided).
4. Click on the Calculate button to perform the operation.
5. View the result and the history of calculations (which persists across page reloads).
6. Use the Clear History button to remove all saved calculations.
