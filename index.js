import { parseCronExpression } from './cron_parser.js';
import { formatOutput } from './utils.js';
import { runTests } from './tests.js';

// If the first argument is "test", run the tests
if(process.argv[2] === "test") {
    runTests()
    process.exit(0);
}

// Otherwise, parse the cron expression from command line
const cliInput = process.argv?.slice(2)?.join(" ");

if (!cliInput) {
    console.error("Usage: node index.js \"<cron expression>\"");
    process.exit(1);
}

try {
    const parsed = parseCronExpression(cliInput);
    console.log(formatOutput(parsed));
} catch (err) {
    console.error(`Error: ${err.message} Stack: ${err.stack}`);
    process.exit(1);
}

