"use strict";

const fs = require("fs").promises;

let MEM_SIZE = 128;
let verbose = false;

const description = "A toy BrainFuck interpreter implemented in JavaScript.";
const usage = `
Usage: node ${process.argv[1].replace("\\", "/").split("/").pop()} [-h | --help] [-v] [-m <size>] [<file.bf> | [-c <code>]]

Options:
  -h, --help  Print this help message (ignore other options)
  -v          Enable verbose mode
  -m <size>   Set memory size (default: ${MEM_SIZE})
  -c <code>   Run the Brainfuck code from a string
`.trim();

const args = process.argv.slice(2);

async function parseArgs() {
	let codeInput = "";

	if (args.length === 0) {
		console.log("Invalid number of arguments");
		console.log(usage);
		process.exit(0);
	}

	for (let i = 0; i < args.length; i++) {
		if (args[i][0] === "-") { // options
			if (args[i][1] === "m" && /^\d+$/.test(args[i + 1])) {
				MEM_SIZE = parseInt(args[i + 1]);
				i += 1;
			} else if ((args[i][1] === "h" || args[i] === "--help") && i === 0) {
				console.log(description);
				console.log(usage);
				process.exit(0);
			} else if (args[i][1] === "v") {
				verbose = true;
			} else if (args[i][1] === "c" && args[i + 1] !== undefined) {
				if (codeInput !== "") {
					console.log("Code already specified by file name");
					console.log(usage);
					process.exit(0);
				}
				codeInput = args[i + 1];
				i += 1;
			} else {
				console.log("Invalid option: " + args[i]);
				console.log(usage);
				process.exit(0);
			}
		} else { // run file
			if (codeInput !== "") {
				console.log("Code already specified by -c option");
				console.log(usage);
				process.exit(0);
			}
			await fs.readFile(args[i], "utf8")
				.then(code => codeInput = code)
				.catch(() => {
					console.log(`Failed to read file: "${args[i]}"`);
					process.exit(0);
				});
		}
	}

	if(verbose){
		console.log("Memory size: " + MEM_SIZE);
		console.log("Input bf code: \n\n" + codeInput + "\n");
	}
	return codeInput;
}

function bf(code) {
	let ptr = 0;
	let mem = new Array(MEM_SIZE).fill(0);
	for (let i = 0; i < code.length; i++) {
		const t = code[i];
		switch (t) {
			case ">": {
				ptr += 1;
				if (ptr >= MEM_SIZE) {
					console.log("[Error] Memory overflow at character " + i);
					process.exit(0);
				}
				break;
			}
			case "<": {
				ptr -= 1;
				if (ptr < 0) {
					console.log("[Error] Memory underflow at character " + i);
					process.exit(0);
				}
				break;
			}
			case "+": {
				mem[ptr] += 1;
				break;
			}
			case "-": {
				mem[ptr] -= 1;
				break;
			}
			case ".": {
				process.stdout.write(String.fromCharCode(mem[ptr]));
				break;
			}
			case ",": {
				mem[ptr] = process.stdin.read();
				break;
			}
			case "[": {
				if (mem[ptr] == 0) {
					let level = 1;
					while (level > 0) {
						i += 1;
						if (code[i] == "[") level++;
						if (code[i] == "]") level--;
					}
				}
				break;
			}
			case "]": {
				if (mem[ptr] != 0) {
					let level = 1;
					while (level > 0) {
						i -= 1;
						if (code[i] == "]") level++;
						if (code[i] == "[") level--;
					}
				}
				break;
			}
		}
	}
}

parseArgs().then(code => bf(code));

