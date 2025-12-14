
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    eat(type) {
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw new Error(`Esperado ${type}`);
        }
    }

    parseAttributes() {
        const attrs = {};

        while (this.currentToken.type === "IDENTIFIER") {
            const key = this.currentToken.value;
            this.eat("IDENTIFIER");
            this.eat("EQUAL");
            const value = this.currentToken.value;
            this.eat("STRING");
            attrs[key] = value;
        }

        return attrs;
    }

    parseBlock(name) {
        this.eat("LT");
        this.eat("IDENTIFIER");

        const attrs = this.parseAttributes();

        this.eat("GT");

        let content = "";

        if (this.currentToken.type === "TEXT") {
            content = this.currentToken.value;
            this.eat("TEXT");
        }

        this.eat("LT");
        this.eat("SLASH");
        this.eat("IDENTIFIER");
        this.eat("GT");

        return { attrs, content };
    }

    parse() {
        const ast = {};

        while (this.currentToken.type !== "EOF") {
            const blockName = this.currentToken.value;
            this.eat("LT");
            this.eat("IDENTIFIER");

            const attrs = this.parseAttributes();
            this.eat("GT");

            let content = "";
            if (this.currentToken.type === "TEXT") {
                content = this.currentToken.value;
                this.eat("TEXT");
            }

            this.eat("LT");
            this.eat("SLASH");
            this.eat("IDENTIFIER");
            this.eat("GT");

            ast[blockName] = { attrs, content };
        }

        return ast;
    }
}
