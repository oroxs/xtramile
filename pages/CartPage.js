const locators = require('../locators/cartLocators');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator(locators.cartIcon);
    this.checkoutButton = page.locator(locators.checkoutButton);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
