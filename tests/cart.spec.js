const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const user = require ('../data/data-user');

test('Add item to cart and verify cart badge shows 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login(user.standardUser.username, user.standardUser.password);

  // Step 2: Add item to cart
  await inventoryPage.addItemToCart();

  // Step 3: Verify badge shows "1"
  await expect(inventoryPage.cartBadge).toBeVisible();
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('Remove item from cart and verify badge disappears', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login(user.standardUser.username, user.standardUser.password);

  // Step 2: Add item
  await inventoryPage.addItemToCart();
  await expect(inventoryPage.cartBadge).toBeVisible();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // Step 3: Remove item
  await inventoryPage.removeItemFromCart();

  // Step 4: Verify cart badge disappears
  await expect(inventoryPage.cartBadge).not.toBeVisible();
});