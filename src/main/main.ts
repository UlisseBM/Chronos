
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { TaskService } from './services/TaskService';
ipcMain.handle("update-description", (_, id: number, description: string) => {
    taskService.updateDescription(id, description);
    return true;
});

const taskService = new TaskService();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../assets/icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle("add-task", (_, title: string) => {
    return taskService.addTask(title);
});

ipcMain.handle("get-tasks", () => {
    return taskService.getAll();
});

ipcMain.handle("complete-task", (_, id: number) => {
    taskService.completeTask(id);
    return true;
});

ipcMain.handle("delete-task", (_, id: number) => {
    taskService.deleteTask(id);
    return true;
});
