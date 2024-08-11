
# Brainfuck Interpreter (JavaScript)

A toy Brainfuck interpreter implemented in JavaScript.

## Overview

This is a toy project that brings a JavaScript implementation of the Brainfuck interpreter without any dependencies besides Node.js.

## Usage

To run the interpreter, use the following command:

```
node bf.cjs [-h | --help] [-v] [-m <size>] [<file.bf> | [-c <code>]]
```

### Options

- `-h`, `--help`: Print help message and exit.
- `-v`: Enable verbose mode.
- `-m <size>`: Set the memory size (default: 128).
- `<file.bf>`: Run the Brainfuck code from a file.
- `-c <code>`: Run the Brainfuck code from a string.

### Example Use Cases

- Run a Brainfuck program from a file: 

    ```
    node bf.cjs hello-world.bf
    ```

- Run a Brainfuck program from a string: 

    ```
    node bf.cjs -c '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.'
    ```

## Project Structure

* `bf.cjs`: The Brainfuck interpreter implementation.
* `hello-world.bf`: An example Brainfuck program, obtained from [Wikipedia](https://en.wikipedia.org/wiki/Brainfuck).
* `README.md`: This file.

---

Last update: Aug. 10, 2024
