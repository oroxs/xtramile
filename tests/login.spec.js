const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const user = require ('../data/data-user');

test('Successful login with standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(user.standardUser.username,user.standardUser.password);

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login fails with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login(user.invalidUser.username,user.invalidUser.password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});

test('Login fails with empty username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login('', '');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username is required');
});

test('Logout from the app and verify redirect to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
  
    await loginPage.goto();
    await loginPage.login(user.standardUser.username,user.standardUser.password);
  
    await inventoryPage.logout();
  
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });

test('Login fails with locked out user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login(user.lockedOutUser.username,user.lockedOutUser.password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
});
