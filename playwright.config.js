const config = {
  use: {
    screenshot: 'only-on-failure',  // 'on', 'off', or 'only-on-failure'
    trace: 'on-first-retry',        // or 'on' to always collect
    video: 'retain-on-failure',     // optional: capture videos too
  },
  reporter: [['html', { open: 'never' }]], // generates an HTML report
};

module.exports = config;