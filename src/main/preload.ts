import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    addTask: (title: string) => ipcRenderer.invoke('add-task', title),
    getTasks: () => ipcRenderer.invoke('get-tasks'),
    completeTask: (id: number) => ipcRenderer.invoke('complete-task', id),
    deleteTask: (id: number) => ipcRenderer.invoke('delete-task', id),
    updateDescription: (id: number, description: string) => ipcRenderer.invoke('update-description', id, description)
});
