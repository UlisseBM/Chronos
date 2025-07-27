"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    addTask: (title) => electron_1.ipcRenderer.invoke('add-task', title),
    getTasks: () => electron_1.ipcRenderer.invoke('get-tasks'),
    completeTask: (id) => electron_1.ipcRenderer.invoke('complete-task', id),
    deleteTask: (id) => electron_1.ipcRenderer.invoke('delete-task', id),
    updateDescription: (id, description) => electron_1.ipcRenderer.invoke('update-description', id, description)
});
//# sourceMappingURL=preload.js.map