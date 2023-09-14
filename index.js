const readline = require('readline');
const { listTasks, addTask, completeTask } = require('./controllers/taskController');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function displayMenu() {
    console.log('\nOptions:');
    console.log('1. List all tasks');
    console.log('2. Add a new task');
    console.log('3. Mark a task as completed (case sensitive)');
    console.log('4. Exit');
    console.log('9. Repeat Menu');
}

displayMenu();

rl.prompt();

rl.on('line', (input) => {
    switch (input.trim()) {
        case '1':
            listTasks();
            break;
        case '2':
            rl.question('Enter task title: ', (title) => {
                rl.question('Enter task description: ', (description) => {
                    addTask(title, description);
                    rl.prompt();
                });
            });
            break;
        case '3':
            rl.question('Enter task title to mark as completed: ', (title) => {
                completeTask(title);
                rl.prompt();
            });
            break;
        case '4':
            rl.close();
            break;
        case '9':
            displayMenu();
            break;
        default:
            console.log('Invalid option.');
            break;
    }
});
