# Cron Parser CLI Tool

A command-line tool for parsing cron expressions into human-readable format.

## Description

This tool parses standard cron expressions and expands them into lists of values for each field (minute, hour, day of month, month, day of week, and command). It supports various cron syntax including wildcards (*), ranges (1-5), lists (1,3,5), and steps (*/15 or 1-10/2).

## Installation

1. Ensure you have Node.js installed (version 14 or higher recommended).
2. Clone or download the project.
3. Navigate to the project directory: `cd cron-expression-parser`
4. No additional dependencies are required as this uses ES modules.

## Usage

### Parsing a Cron Expression

```bash
node index.js "<cron expression>"
```

Example:
```bash
node index.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

Output:
```
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find
```

### Running Tests

```bash
npm test
```

This runs the test suite to verify the parser functionality.

## Cron Expression Syntax

- `*` : Wildcard, matches all values in the field
- `1-5` : Range, matches values from 1 to 5
- `1,3,5` : List, matches specific values
- `*/15` : Step, matches every 15th value starting from the minimum
- `1-10/2` : Range with step, matches every 2nd value in the range 1-10

## Field Ranges

- Minute: 0-59
- Hour: 0-23
- Day of Month: 1-31
- Month: 1-12
- Day of Week: 0-6 (0 = Sunday)

## Examples

1. Every minute: `* * * * * command`
2. At 12:00 PM every day: `0 12 * * * command`
3. Every 15 minutes: `*/15 * * * * command`
4. Weekdays at 9 AM: `0 9 * * 1-5 command`
5. First day of month at midnight: `0 0 1 * * command`

## Error Handling

The tool validates cron expressions and throws errors for:
- Invalid field values
- Missing command
- Incorrect syntax

## License

ISC
