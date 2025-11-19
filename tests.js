import { parseCronExpression } from './cron_parser.js';
import { formatOutput } from './utils.js';

// All cron parser test cases as an array of objects

const testCases = [
    // 1. Basic constant test
    {
        name: "Simple fixed values",
        input: "0 0 1 1 0 /bin/run",
        expected: {
            minute: "0",
            hour: "0",
            "day of month": "1",
            month: "1",
            "day of week": "0",
            command: "/bin/run"
        }
    },

    // 2. Wildcard: all values
    {
        name: "Wildcard all fields",
        input: "* * * * * echo Hello",
        expected: {
            minute: Array.from({ length: 60 }, (_, i) => i).join(" "),
            hour: Array.from({ length: 24 }, (_, i) => i).join(" "),
            "day of month": Array.from({ length: 31 }, (_, i) => i + 1).join(" "),
            month: Array.from({ length: 12 }, (_, i) => i + 1).join(" "),
            "day of week": "0 1 2 3 4 5 6",
            command: "echo Hello"
        }
    },

    // 3. Step test
    {
        name: "Step values */15",
        input: "*/15 0 1 1 1 /usr/bin/find",
        expected: {
            minute: "0 15 30 45",
            hour: "0",
            "day of month": "1",
            month: "1",
            "day of week": "1",
            command: "/usr/bin/find"
        }
    },

    // 4. Range test
    {
        name: "Day of week range",
        input: "0 12 * * 1-5 script.sh",
        expected: {
            minute: "0",
            hour: "12",
            "day of month": Array.from({ length: 31 }, (_, i) => i + 1).join(" "),
            month: Array.from({ length: 12 }, (_, i) => i + 1).join(" "),
            "day of week": "1 2 3 4 5",
            command: "script.sh"
        }
    },

    // 5. List test
    {
        name: "Comma list values",
        input: "10 3 5,10,15 9 0 run",
        expected: {
            minute: "10",
            hour: "3",
            "day of month": "5 10 15",
            month: "6",
            "day of week": "0",
            command: "run"
        }
    },

    // 6. Combined patterns
    {
        name: "Mixed lists + steps + ranges",
        input: "1-10/2 0 1,15 * 0-3/1 job.sh",
        expected: {
            minute: "1 3 5 7 9",
            hour: "0",
            "day of month": "1 15",
            month: Array.from({ length: 12 }, (_, i) => i + 1).join(" "),
            "day of week": "0 1 2 3",
            command: "job.sh"
        }
    },

    // 7. Error: Missing command
    {
        name: "Error: Missing command",
        input: "* * * * *",
        error: "Missing command"
    },

    // 8. Error: Invalid minute
    {
        name: "Error: Invalid minute",
        input: "90 * * * * cmd",
        error: "Invalid value"
    },

    // 9. Error: Invalid step
    {
        name: "Error: Invalid step",
        input: "*/0 * * * * cmd",
        error: "Invalid step value"
    }
];


function runTests() {
    console.log("\n==============================");
    console.log(" RUNNING CRON PARSER TESTS ");
    console.log("==============================\n");

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        try {
            if (tc.error) {
                // Expecting an error
                let threw = false;
                try {
                    parseCronExpression(tc.input);
                } catch (err) {
                    threw = true;
                }

                if (threw) {
                    console.log(`✔ PASS: ${tc.name}`);
                    passed++;
                } else {
                    console.log(`✖ FAIL: ${tc.name} — Expected error but got success`);
                    failed++;
                }

            } else {
                // Expecting valid output
                const parsed = parseCronExpression(tc.input);
                // console.log(formatOutput(parsed));
 

                let ok = true;

                for (const key of Object.keys(tc.expected)) {
                    if (parsed[key] !== tc.expected[key]) {
                        ok = false;
                        console.log(`✖ FAIL: ${tc.name}`);
                        console.log(`   Field: ${key}`);
                        console.log(`   Expected: ${tc.expected[key]}`);
                        console.log(`   Got:      ${parsed[key]}`);
                        break;
                    }
                }

                if (ok) {
                    console.log(`✔ PASS: ${tc.name}`);
                    passed++;
                } else {
                    failed++;
                }
            }

        } catch (err) {
            console.log(`✖ FAIL: ${tc.name}`);
            console.log(`   Error: ${err.message}`);
            failed++;
        }
    }

    console.log("\n------------------------------");
    console.log(` TOTAL PASSED: ${passed}`);
    console.log(` TOTAL FAILED: ${failed}`);
    console.log("------------------------------\n");

    if (failed > 0) process.exit(1);
    process.exit(0);
}


export { runTests };