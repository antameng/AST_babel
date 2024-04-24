import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

const a = traverse(ast, {
    enter(path,state) {
        if (path.isIdentifier({ name: "n" })) {
            console.log('遇到n')
            path.node.name = "x";
        }
    },
});

a()