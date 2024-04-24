// const babelParser = require('@babel/parser');
// const code = `function square(n) {
//   return n * n;
// }`;
// const ast = babelParser.parse(code);
import babelParser from '@babel/parser'


const code = `function square(n) {
  return n * n;
}`;

const ast = babelParser.parseExpression(code,{
    sourceType: 'unambiguous',
});
console.log(ast)