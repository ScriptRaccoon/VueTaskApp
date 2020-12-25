const app = Vue.createApp({
    data() {
        return {
            formVisible: false,
            creatingTask: false,
            editingTask: false,
            currentTaskIndex: null,
            deleteText: "Delete Task",
            error: null,
            tasks: [
                {
                    title: "Reduce your carbon footprint",
                    description:
                        "For example by choosing a vegan diet, going by bike more often, avoiding planes, buying only stuff you actually need. Get active!",
                    prio: "highPrio",
                    status: "open",
                },
                {
                    title: "Educate yourself about structural racism",
                    description: "... because it is still deeply rooted in our society.",
                    prio: "mediumPrio",
                    status: "open",
                },
                {
                    title: "Try to be a nice person",
                    description: "You also like to be around nice people, right? :)",
                    prio: "lowPrio",
                    status: "finished",
                },
            ],
            titleInput: "",
            descInput: "",
            prioInput: "medium",
            statusInput: "open",
        };
    },
    methods: {
        getIndex(task) {
            return this.tasks.findIndex((x) => x === task);
        },
        showForm(task) {
            this.formVisible = true;
            if (task) {
                this.editingTask = true;
                this.titleInput = task.title;
                this.descInput = task.description;
                this.prioInput = task.prio;
                this.statusInput = task.status;
                this.currentTaskIndex = this.getIndex(task);
                this.deleteStep = 0;
                this.deleteText = "Delete Task";
            } else {
                this.creatingTask = true;
                this.titleInput = "";
                this.descInput = "";
                this.prioInput = "mediumPrio";
                this.statusInput = "open";
            }
        },
        hideForm() {
            this.editingTask = false;
            this.creatingTask = false;
            this.formVisible = false;
            this.currentTaskIndex = null;
            this.error = null;
        },
        createTask() {
            if (!this.titleInput) {
                this.error = "There is no title";
                return;
            }
            const task = {
                title: this.titleInput,
                description: this.descInput,
                prio: this.prioInput,
                status: this.statusInput,
            };
            this.tasks.push(task);
            this.hideForm();
        },
        updateTask() {
            if (!this.titleInput) {
                this.error = "There is no title";
                return;
            }
            const task = {
                title: this.titleInput,
                description: this.descInput,
                prio: this.prioInput,
                status: this.statusInput,
            };
            this.tasks[this.currentTaskIndex] = task;
            this.hideForm();
        },
        deleteTask() {
            if (this.deleteText == "Delete Task") {
                this.deleteText = "Are you sure?";
            } else {
                this.tasks.splice(this.currentTaskIndex, 1);
                this.editingTask = false;
                this.hideForm();
            }
        },
        moveTaskUp(task) {
            const index = this.getIndex(task);
            if (index === 0) return;
            this.tasks.splice(index, 1);
            this.tasks.splice(index - 1, 0, task);
        },
        moveTaskDown(task) {
            const index = this.getIndex(task);
            if (index === this.tasks.length - 1) return;
            this.tasks.splice(index, 1);
            this.tasks.splice(index + 1, 0, task);
        },
    },
}).mount("#container");
