const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const appendFile = promisify(fs.appendFile);

class CoinGame {
    constructor(logFile = 'game.log.json') {
        this.logFile = logFile;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.startGame();
    }

    async logResult(result) {
        try {
            await appendFile(this.logFile, JSON.stringify(result) + '\n');
        } catch (err) {
            console.error('Ошибка записи в лог:', err.message);
        }
    }

    async startGame() {
        const answer = await new Promise(resolve => {
            this.rl.question('Угадайте: орёл или решка? (введите "орёл" или "решка", "exit" для выхода): ', resolve);
        });

        if (answer.trim().toLowerCase() === 'exit') {
            this.rl.close();
            return;
        }

        const userChoice = answer.trim().toLowerCase();
        const correctAnswer = Math.random() > 0.5 ? 'орёл' : 'решка';
        const isCorrect = userChoice === correctAnswer;

        if (userChoice !== 'орёл' && userChoice !== 'решка') {
            console.log('Пожалуйста, введите "орёл" или "решка"');
            return this.startGame();
        }

        console.log(isCorrect ? 
            `Верно! Это был ${correctAnswer}` : 
            `Неверно! Это был ${correctAnswer}`
        );

        await this.logResult({
            timestamp: new Date().toISOString(),
            userChoice,
            correctAnswer,
            isCorrect
        });

        return this.startGame();
    }
}

new CoinGame(process.argv[2]);