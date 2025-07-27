import { Task } from '../models/Task';

export class TaskService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    addTask(title: string): Task {
        const id = Date.now();
        const newTask = new Task(id, title);
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    completeTask(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.toggleDone();
    }

    updateTask(id: number, newTitle: string): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.updateTitle(newTitle);
    }

    updateDescription(id: number, newDescription: string): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.updateDescription(newDescription);
    }
}
