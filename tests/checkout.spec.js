const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const user = require ('../data/data-user');
const customer = require ('../data/data-customer');

test('Complete checkout flow successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login(user.standardUser.username, user.standardUser.password);

  // Add item
  await inventoryPage.addItemToCart();

  // Go to cart & checkout
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();

  // Fill checkout info
  await checkoutPage.fillCustomerInfo(customer.customer1.firstName, customer.customer1.lastName, customer.customer1.postCode);

  // Finish order
  await checkoutPage.completeOrder();

  // Assert success
  await expect(checkoutPage.successHeader).toBeVisible();
  await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
});

test('Checkout fails when required fields are empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login & add item
  await loginPage.goto();
  await loginPage.login(user.standardUser.username, user.standardUser.password);
  await inventoryPage.addItemToCart();

  // Go to cart and checkout
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();

  // Submit empty form
  await checkoutPage.fillCustomerInfo('', '', '');

  // Verify error
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
});

test('Checkout fails when only first name is fields for required', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login & add item
  await loginPage.goto();
  await loginPage.login(user.standardUser.username, user.standardUser.password);
  await inventoryPage.addItemToCart();

  // Go to cart and checkout
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();

  // Submit empty form
  await checkoutPage.fillCustomerInfo(customer.customer1.firstName, '', '');

  // Verify error
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toContainText('Error: Last Name is required');
});

test('Checkout fails when only first name and last name is fields for required', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login & add item
  await loginPage.goto();
  await loginPage.login(user.standardUser.username, user.standardUser.password);
  await inventoryPage.addItemToCart();

  // Go to cart and checkout
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();

  // Submit empty form
  await checkoutPage.fillCustomerInfo(customer.customer1.firstName, customer.customer1.lastName, '');

  // Verify error
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toContainText('Error: Postal Code is required');
});