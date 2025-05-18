const locator = require('../locators/loginLocators');

class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator(locator.usernameInput);
      this.passwordInput = page.locator(locator.passwordInput);
      this.loginButton = page.locator(locator.loginButton);
      this.errorMessage = page.locator(locator.errorMessage);
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  
    async getErrorMessage() {
      return this.errorMessage.textContent();
    }
  }
  
  module.exports = { LoginPage };
  