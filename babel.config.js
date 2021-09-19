module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', 
    ],
    plugins: [["inline-dotenv", {
        unsafe: true,
      }]]
    }
    // plugins: [
    //   "module:react-native-dotenv",
    // ]
  };
