#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

let command = 'unknown';
const currentDate = new Date();

const argv = yargs(hideBin(process.argv))
    .command('current', 'current command', (yargs) => {
        command = 'current';
        setOptions(yargs, "boolean", 'current');
    })
    .command('add', 'add command', (yargs) => {
        command = 'add';
        setOptions(yargs, 'number', 'add');
    })
    .command('sub', 'sub command', (yargs) => {
        command = 'sub';
        setOptions(yargs, 'number', 'sub');
    })
    .argv;

function setOptions(yargs, type, describe) {
    yargs
        .option('year', {
            alias: 'y',
            type: type,
            describe: `${describe} year`,
        })
        .option('month', {
            alias: 'm',
            type: type,
            describe: `${describe} month`
        })
        .option('date', {
            alias: 'd',
            type: type,
            describe: `${describe} date`
        });
}

function getDateByCommand() {
    if (command === 'current') {
        return getCurrentDate();
    } else if (command === 'add') {
        return getChangedDate('add');
    } else if (command === 'sub') {
        return getChangedDate('sub');
    } else {
        return 'Write command';
    }
}

function getChangedDate(cmd) {
    const changedDate = new Date(currentDate);
    if (!isNaN(argv.year)) {
        changedDate.setFullYear(changeDate(cmd, changedDate.getFullYear(), argv.year));
    } else if (!isNaN(argv.month)) {
        changedDate.setMonth(changeDate(cmd, changedDate.getMonth(), argv.month));
    } else if (!isNaN(argv.date)) {
        changedDate.setDate(changeDate(cmd, changedDate.getDate(), argv.date));
    }
    return changedDate;
}

function changeDate(cmd, date, target) {
    if (cmd === 'add') {
        return date + target;
    } else if (cmd === 'sub') {
        return date - target;
    }
    return date;
}

function getCurrentDate() {
    if (argv.year) {
        return currentDate.getFullYear();
    } else if (argv.month) {
        return currentDate.getMonth();
    } else if (argv.date) {
        return currentDate.getDate();
    }
    return currentDate.toISOString();
}

console.log(getDateByCommand());