"use strict";
/// <reference path="./renderer.d.ts" />
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeAddTaskModal = document.getElementById('closeAddTaskModal');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const newTaskTitle = document.getElementById('newTaskTitle');
    const newTaskDesc = document.getElementById('newTaskDesc');
    addBtn.addEventListener('click', () => {
        newTaskTitle.value = '';
        newTaskDesc.value = '';
        addTaskModal.style.display = 'flex';
        newTaskTitle.focus();
    });
    closeAddTaskModal.addEventListener('click', () => {
        addTaskModal.style.display = 'none';
    });
    addTaskModal.addEventListener('click', (e) => {
        if (e.target === addTaskModal)
            addTaskModal.style.display = 'none';
    });
    saveTaskBtn.addEventListener('click', async () => {
        const title = newTaskTitle.value.trim();
        const desc = newTaskDesc.value.trim();
        if (!title) {
            newTaskTitle.focus();
            return;
        }
        const task = await window.api.addTask(title);
        if (desc) {
            await window.api.updateDescription(task.id, desc);
        }
        addTaskModal.style.display = 'none';
        await renderTasks();
    });
    async function renderTasks() {
        const tasks = await window.api.getTasks();
        taskList.innerHTML = '';
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            const checkSpan = document.createElement('span');
            checkSpan.textContent = task.done ? '✅' : '⬜️';
            checkSpan.style.cursor = 'pointer';
            checkSpan.style.marginRight = '8px';
            checkSpan.addEventListener('click', async (e) => {
                e.stopPropagation();
                await window.api.completeTask(task.id);
                await renderTasks();
            });
            const titleSpan = document.createElement('span');
            titleSpan.textContent = task.title;
            titleSpan.className = 'task-title' + (task.done ? ' done' : '');
            titleSpan.style.cursor = 'pointer';
            titleSpan.title = 'Click to view or edit description';
            titleSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                showDescModal(task, false);
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await window.api.deleteTask(task.id);
                await renderTasks();
            });
            li.appendChild(checkSpan);
            li.appendChild(titleSpan);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
    const descModal = document.getElementById('descModal');
    const descInput = document.getElementById('descInput');
    const saveDescBtn = document.getElementById('saveDescBtn');
    const closeModal = document.getElementById('closeModal');
    const descText = document.getElementById('descText');
    const editDescBtn = document.getElementById('editDescBtn');
    const descLabel = document.querySelector('.desc-label');
    let editingTask = null;
    let isEditingDesc = false;
    function showDescModal(task, editMode = false) {
        editingTask = task;
        isEditingDesc = editMode;
        descModal.style.display = 'flex';
        renderDescModal();
    }
    function hideDescModal() {
        descModal.style.display = 'none';
        editingTask = null;
        isEditingDesc = false;
    }
    function renderDescModal() {
        if (!editingTask)
            return;
        if (isEditingDesc) {
            descInput.value = editingTask.description || '';
            descInput.classList.remove('desc-input-hidden');
            saveDescBtn.classList.remove('desc-save-hidden');
            descLabel.classList.remove('desc-label-hidden');
            descText.style.display = 'none';
            editDescBtn.style.display = 'none';
            descInput.focus();
        }
        else {
            descText.textContent = editingTask.description || '(No description)';
            descText.style.display = 'block';
            editDescBtn.style.display = 'inline-block';
            descInput.classList.add('desc-input-hidden');
            saveDescBtn.classList.add('desc-save-hidden');
            descLabel.classList.add('desc-label-hidden');
        }
    }
    saveDescBtn.addEventListener('click', async () => {
        if (editingTask) {
            await window.api.updateDescription(editingTask.id, descInput.value);
            await renderTasks();
            hideDescModal();
        }
    });
    editDescBtn.addEventListener('click', () => {
        isEditingDesc = true;
        renderDescModal();
    });
    closeModal.addEventListener('click', hideDescModal);
    descModal.addEventListener('click', (e) => {
        if (e.target === descModal)
            hideDescModal();
    });
    renderTasks();
});
//# sourceMappingURL=renderer.js.map