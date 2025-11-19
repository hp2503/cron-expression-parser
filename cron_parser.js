import { parseField } from './utils.js';

function parseCronExpression(cronExpression) {
    const parts = cronExpression.trim().split(/\s+/);

    if (parts.length < 6) {
        throw new Error("Cron expression must contain 5 fields plus a command.");
    }

    const [minute, hour, dom, month, dow, ...command] = parts;

    if (!command.length) {
        throw new Error("Missing command in cron expression.");
    }

    return {
        "minute": parseField(minute, 0, 59),
        "hour": parseField(hour, 0, 23),
        "day of month": parseField(dom, 1, 31),
        "month": parseField(month, 1, 12),
        "day of week": parseField(dow, 0, 6),
        "command": command.join(" ")
    };
}

export { parseCronExpression };
