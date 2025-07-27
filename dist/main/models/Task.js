"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(id, title, done = false, description = '') {
        this.id = id;
        this.title = title;
        this.done = done;
        this.description = description;
    }
    toggleDone() {
        this.done = !this.done;
    }
    updateTitle(newTitle) {
        this.title = newTitle;
    }
    updateDescription(newDescription) {
        this.description = newDescription;
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map