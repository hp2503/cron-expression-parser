function parseField(field, min, max) {
    const result = new Set();
    const parts = field.split(',');

    for (const part of parts) {

        // *
        if (part === '*') {
            for (let i = min; i <= max; i++) result.add(i);
            continue;
        }

        // */5  OR  1-10/2
        if (part.includes('/')) {
            const [range, stepStr] = part.split('/');
            const step = parseInt(stepStr, 10);

            if (step <= 0 || isNaN(step)) {
                throw new Error(`Invalid step value '${stepStr}'`);
            }

            let start = min;
            let end = max;

            if (range !== '*') {
                const [rangeStart, rangeEnd] = range.split('-').map(Number);
                validateInRange(min, max, rangeStart);
                validateInRange(min, max, rangeEnd);
                start = rangeStart;
                end = rangeEnd;
            }

            for (let i = start; i <= end; i += step) {
                result.add(i);
            }
            continue;
        }

        // range: 1-5
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            validateInRange(min, max, start);
            validateInRange(min, max, end);

            for (let i = start; i <= end; i++) {
                result.add(i);
            }
            continue;
        }

        // single value
        const n = parseInt(part, 10);
        validateInRange(min, max, n);
        result.add(n);
    }

    return [...result].sort((a, b) => a - b).join(' ');
}

function formatOutput(parsed, padding = 14) {
    return Object.entries(parsed)
        .map(([key, value]) => `${key.padEnd(padding)}${value}`)
        .join("\n");
}

function validateInRange(min, max, n) {
    if (isNaN(n) || n < min || n > max) {
        throw new Error(`Invalid value '${n}' for range ${min}-${max}`);
    }
}

export { parseField, formatOutput };
