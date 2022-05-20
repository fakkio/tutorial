// https://prettier.io/docs/en/options.html
module.exports = {
  trailingComma: 'es5',
  bracketSpacing: false,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: 'always',
  overrides: [
    {
      files: 'Routes.*',
      options: {
        printWidth: 200,
      },
    },
  ],
}
