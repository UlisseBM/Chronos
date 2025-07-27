export class Task {
    constructor(
        public id: number,
        public title: string,
        public done: boolean = false,
        public description: string = ''
    ) { }

    toggleDone() {
        this.done = !this.done;
    }

    updateTitle(newTitle: string) {
        this.title = newTitle;
    }

    updateDescription(newDescription: string) {
        this.description = newDescription;
    }
}
