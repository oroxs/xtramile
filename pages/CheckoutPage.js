const locators = require('../locators/checkoutLocators');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator(locators.firstNameInput);
    this.lastNameInput = page.locator(locators.lastNameInput);
    this.postalCodeInput = page.locator(locators.postalCodeInput);
    this.continueButton = page.locator(locators.continueButton);
    this.finishButton = page.locator(locators.finishButton);
    this.successHeader = page.locator(locators.successHeader);
    this.errorMessage = page.locator(locators.errorMessage);

  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async getSuccessMessage() {
    return this.successHeader.textContent();
  }

  async getErrorMessage() {
  return this.errorMessage.textContent();
}
}

module.exports = { CheckoutPage };
