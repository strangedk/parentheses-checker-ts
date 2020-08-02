class Parse {
  private stack: Array<string> = new Array<string>();

  constructor(private input: string) {
    this.parse(input);
  }

  private parse(input: string) {
    const {stack} = this;
    const iterator = this.iterateStringGenerator(input);

    let success = true;

    // Iterate with for loop is easy and comfortable
    for (let i = iterator.next(); !i.done; i = iterator.next()) {
      const char = i.value;

      if (char === '(') {
        stack.push(char);
      }
      if (char === ')') {
        if (stack[stack.length-1] === '(') {
          stack.pop();
        } else {
          success = false;
          break;
        }
      }
    }

    if (!success || stack.length !== 0) {
      console.log(`incorrect: ${input} `);
    } else {
      console.log(`correct sequence: ${input}`);
    }
  }

  /**
   * Generator to iterate input string by char
   */
  private *iterateStringGenerator(input: string) {
    let currentIndex = 0;

    while (currentIndex < input.length) {
      yield input.charAt(currentIndex++);
    }
  }
}

new Parse("((1 + (2)) * (5 + 4) / ((2.5 * 4) + (1 + 0)))");
new Parse("(((((((((())))))))))");
new Parse(")))");
new Parse("()()()()()()()((())())");
new Parse("()()()()()()()((())())(");

