const locators = require('../locators/inventoryLocators');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator(locators.addToCartButton);
    this.removeButton = page.locator(locators.removeButton);
    this.cartBadge = page.locator(locators.cartBadge);
    this.menuButton = page.locator(locators.menuButton);
    this.logoutLink = page.locator(locators.logoutLink);
  }

  async addItemToCart() {
    await this.addToCartButton.click();
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }
  
  async removeItemFromCart() {
    await this.removeButton.click();
  }

  async isCartBadgeVisible() {
    return await this.cartBadge.isVisible();
  }
  
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
