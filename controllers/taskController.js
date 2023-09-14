const fs = require('fs');
// const tasksFilePath = './tasks.json';

function getAllTasks(callback) {
    try{
        fs.readFile(tasksFilePath, 'utf8', (err, data) => {
            if (err) {
                return callback(err, null);
            }
    
            try {
                const tasks = JSON.parse(data);
                callback(null, tasks);
            } catch (parseError) {
                callback(parseError, null);
            }
        }); 
    } catch (fileReadError) {
        callback(fileReadError, null);
    }
}

function listTasks() {
    getAllTasks((err, tasks) => {
        if (err) {
            console.error('Error reading tasks:', err);
            return;
        }

        if (tasks.length === 0) {
            console.log('No tasks found.');
        } else {
            console.log('Tasks:');
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. Title: ${task.title}`);
                console.log(`\tDescription: ${task.description}`);
                console.log(`\tStatus: ${task.status}`);
            });
        }
    });
}

function addTask(title, description) {
    getAllTasks((err, tasks) => {
        if (err) {
            console.error('Error reading tasks:', err);
            return;
        }

        const newTask = {
            title,
            description,
            status: 'not completed',
        };

        tasks.push(newTask);

        fs.writeFile(
            tasksFilePath,
            JSON.stringify(tasks, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error('Error adding task:', writeErr);
                } else {
                    console.log('Task added successfully.');
                }
            }
        );
    });
}

function completeTask(title) {
    getAllTasks((err, tasks) => {
        if (err) {
            console.error('Error reading tasks:', err);
            return;
        }

        const task = tasks.find((t) => t.title === title);

        if (!task) {
            console.error('Task not found.');
            return;
        }

        task.status = 'completed';

        fs.writeFile(
            tasksFilePath,
            JSON.stringify(tasks, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error('Error marking task as completed:', writeErr);
                } else {
                    console.log('Task marked as completed.');
                }
            }
        );
    });
}

module.exports = {
    listTasks,
    addTask,
    completeTask,
};