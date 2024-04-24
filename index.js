
const input = `(add 234 (subtract 4 29))`
// const output = `ad(2,subtract(4 2))`
// DFS depth first search 深度优先遍历
function tokenizer(input) {   // 词法分析
    let current = 0
    let tokens = []
    while (current < input.length) {
        let char = input[current]
        if (char === '(') {
            tokens.push({
                type: 'paren',
                value: '('
            })
            current++
            continue
        }
        if (char === ')') {
            tokens.push({
                type: 'paren',
                value: ')'
            })
            current++
            continue
        }
        // 对于某一类比较小的点 正则
        let WHITESPACE = /\s/
        if (WHITESPACE.test(char)) {  //遇到' ' 直接跳过
            current++
            continue
        }
        let NUMBERS = /[0-9]/
        if (NUMBERS.test(char)) {
            let value = ''
            while (/[0-9]/.test(char)) {
                value += char
                char = input[++current]
            }
            tokens.push({
                type: 'number',
                value: Number(value)
            })
        }
        if (char === '"') {
            let value = ''
            char = input[++current]
            while (char !== '"') {
                value += char
                char = input[++current]
            }
            char = input[++current]
            tokens.push({
                type: 'string',
                value: value
            })
            continue
        }

        let LETTERS = /[a-z]/
        if (LETTERS.test(char)) {
            let value = ''
            while (LETTERS.test(char)) {
                value += char
                char = input[++current]
            }
            tokens.push({
                type: 'name',
                value: value
            })
            continue
        }
        // throw new TypeError('我也不知道是什么类型')
    }
    return tokens
}
console.log(tokenizer(input))

// 语法分析
function parser(tokens) {
    let current = 0  // 数组下标
    function walk() {
        let token = tokens[current]
        if (token.type === 'number') {
            current++
            return {
                type: 'NumberLiteral',
                value: token.value
            }
        }

        if (token.type === 'string') {
            current++
            return {
                type: 'StringLiteral',
                value: token.value
            }
        }

        //层级关系产生
        if (token.type === 'paren' && token.value === '(') {
            token = token[++current]   // ++n  先加，然后返回加过后的值
            let node = {
                type: 'CallLiteral',
                name: token.value,
                params: []
            }
            token = token[++current]
            while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
                node.params.push(walk())
                token = tokens[current]
            }
            current++
            return node
        }
    }
    let ast = {
        type: 'Program',
        body: []
    }
    while (current<tokens.length){
        ast.body.push(walk())
    }
    return ast
}

