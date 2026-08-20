/**
 * MICROSUN MANAGEMENT - Enterprise Logging Framework
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');

class Logger {
    static logFile = path.join(config.paths.logs, 'automation.log');

    static init() {
        if (!fs.existsSync(config.paths.logs)) {
            fs.mkdirSync(config.paths.logs, { recursive: true });
        }
    }

    static write(level, message) {
        this.init();
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
        
        // Console output with color formatting
        if (level === 'INFO') {
            console.log(`\x1b[36m[INFO]\x1b[0m ${message}`);
        } else if (level === 'PASS') {
            console.log(`\x1b[32m[PASS]\x1b[0m ${message}`);
        } else if (level === 'FAIL') {
            console.log(`\x1b[31m[FAIL]\x1b[0m ${message}`);
        } else if (level === 'WARN') {
            console.log(`\x1b[33m[WARN]\x1b[0m ${message}`);
        } else {
            console.log(`[${level}] ${message}`);
        }

        try {
            fs.appendFileSync(this.logFile, logLine, 'utf-8');
        } catch (e) { }
    }

    static info(msg) { this.write('INFO', msg); }
    static pass(msg) { this.write('PASS', msg); }
    static fail(msg) { this.write('FAIL', msg); }
    static warn(msg) { this.write('WARN', msg); }
    static error(msg) { this.write('ERROR', msg); }
}

module.exports = Logger;
