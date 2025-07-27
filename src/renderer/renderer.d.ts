export { };

declare global {
    interface Window {
        api: {
            addTask: (title: string) => Promise<Task>;
            getTasks: () => Promise<Task[]>;
            completeTask: (id: number) => Promise<void>;
            deleteTask: (id: number) => Promise<void>;
            updateDescription: (id: number, description: string) => Promise<void>;
        };
    }

    interface Task {
        id: number;
        title: string;
        done: boolean;
        description?: string;
    }
}
