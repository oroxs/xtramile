# Playwright Automation Project – SauceDemo.com

This project is an end-to-end test automation suite built with **Playwright + JavaScript**.  

---

## Tech Stack

| Tool        | Description                       |
|-------------|-----------------------------------|
| Playwright| Browser automation framework |
| JavaScript  | Scripting language                |
| Node.js     | Runtime for JS                    |
| Page Object Model | Test architecture           |
| Fixtures    | Shared login/data setup           |
| Visual Testing | Screenshot-based regression    |

---

## Folder Structure

```
playwright-saucedemo/
├── fixtures/
│   └── users.js                # User data (valid & invalid)
├── locators/                  # Element selectors
│   ├── loginLocators.js
│   ├── inventoryLocators.js
│   ├── cartLocators.js
│   ├── checkoutLocators.js
│   └── menuLocators.js
├── pages/                     # Page Object Model files
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── MenuPage.js
├── tests/                     # Test cases
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── logout.spec.js
│   ├── negative-login.spec.js
│   ├── negative-checkout.spec.js
│   ├── checkout-with-fixture.spec.js
│   └── param-login.spec.js
├── tests/fixtures.js          # Custom Playwright test fixture
├── playwright.config.js       # Playwright config
└── README.md
```

---

## Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/oroxs/xtramile.git
cd xtramile
```

2. **Install dependencies**

```bash
npm install
```

3. **Run all tests**

```bash
npx playwright test
```

4. **Run specific test**

```bash
npx playwright test tests/login.spec.js
```

5. **View HTML report**

```bash
npx playwright show-report
```

---

## Test Scenarios

### Login Tests

- Valid user login
- Negative login (invalid user, blank input)

### Cart & Checkout Tests

- Add to cart & verify badge
- Remove item from cart
- Complete checkout with name/address
- Negative checkout (blank name or zip)

### Logout

- User can log out and redirect to the  login page

---

## Architecture & Features

### Page Object Model

To improve maintainability, each screen (Login, Cart, Checkout, etc.) is separated into its own class.


### Visual Testing & Debugging

Configured via `playwright.config.js`:

```js
use: {
  screenshot: 'only-on-failure',
  trace: 'on-first-retry',
  video: 'retain-on-failure',
}
```

Run with trace:

```bash
npx playwright test --trace on
```

View the detailed report:

```bash
npx playwright show-report
```

---

## Sample Users (fixtures/users.js)

| User             | Password      | Description         |
|------------------|---------------|---------------------|
| `standard_user`  | `secret_sauce`| Valid user          |
| `locked_out_user`| `secret_sauce`| Blocked user        |
| `problem_user`   | `secret_sauce`| Fails edge cases    |
| `invalid_user`   | `wrong_pass`  | Invalid credentials |

