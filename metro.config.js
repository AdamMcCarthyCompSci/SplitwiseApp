const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  // Optional, but may be useful when using mapping customization feature.
  customMappingPath: './SplitwiseTheme.json',
};

module.exports = MetroConfig.create(evaConfig, {
  // Whatever was previously specified
});