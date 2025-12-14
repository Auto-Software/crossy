class Lexer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }

    currentChar() {
        return this.input[this.pos];
    }

    advance() {
        this.pos++;
    }

    readWhile(regex) {
        let value = "";
        while (this.currentChar() && regex.test(this.currentChar())) {
            value += this.currentChar();
            this.advance();
        }
        return value;
    }

    readString() {
        this.advance(); // "
        const value = this.readWhile(/[^"]/);
        this.advance(); // "
        return { type: "STRING", value };
    }

    getNextToken() {
        while (this.currentChar()) {

            if (this.currentChar() === "<") {
                this.advance();
                return { type: "LT" };
            }

            if (this.currentChar() === ">") {
                this.advance();
                return { type: "GT" };
            }

            if (this.currentChar() === "/") {
                this.advance();
                return { type: "SLASH" };
            }

            if (this.currentChar() === "=") {
                this.advance();
                return { type: "EQUAL" };
            }

            if (this.currentChar() === `"`) {
                return this.readString();
            }

            if (/[a-zA-Z]/.test(this.currentChar())) {
                const value = this.readWhile(/[a-zA-Z]/);
                return { type: "IDENTIFIER", value };
            }

            const value = this.readWhile(/[^<]/);
            if (value.trim()) {
                return { type: "TEXT", value };
            }

            this.advance();
        }

        return { type: "EOF" };
    }
}
