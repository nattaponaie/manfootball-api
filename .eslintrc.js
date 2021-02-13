module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "babel-module": {
        "alias": {
          "utils": "./src/utils",
          "middleware": "./src/middleware",
          "templates": "./src/templates",
          "models": "./src/models",
          "services": "./src/services",
          "database": "./src/database"
        }
      }
    }
  },
  "rules": {}
};