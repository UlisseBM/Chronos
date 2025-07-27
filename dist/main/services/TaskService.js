"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const Task_1 = require("../models/Task");
class TaskService {
    constructor() {
        this.tasks = [];
    }
    getAll() {
        return this.tasks;
    }
    addTask(title) {
        const id = Date.now();
        const newTask = new Task_1.Task(id, title);
        this.tasks.push(newTask);
        return newTask;
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task)
            task.toggleDone();
    }
    updateTask(id, newTitle) {
        const task = this.tasks.find(t => t.id === id);
        if (task)
            task.updateTitle(newTitle);
    }
    updateDescription(id, newDescription) {
        const task = this.tasks.find(t => t.id === id);
        if (task)
            task.updateDescription(newDescription);
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=TaskService.js.map