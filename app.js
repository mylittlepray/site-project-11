import TaskForm from './components/TaskForm.js';
import TaskList from './components/TaskList.js';

let nextId = 1;

const app = Vue.createApp({
    components: { TaskForm, TaskList },
    data() {
        return {
            tasks: [],
            filter: 'all'
        };
    },
    computed: {
        filteredTasks() {
            if (this.filter === 'done') return this.tasks.filter(t => t.done);
            if (this.filter === 'active') return this.tasks.filter(t => !t.done);
            return this.tasks;
        }
    },
    created() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
            const maxId = this.tasks.reduce((max, t) => Math.max(max, t.id || 0), 0);
            nextId = maxId + 1;
        }
    },
    methods: {
        addTask(task) {
            this.tasks.push({ ...task, done: false, id: nextId++ });
            this.saveTasks();
        },
        deleteTask(task) {
            this.tasks = this.tasks.filter(t => t.id !== task.id);
            this.saveTasks();
        },
        toggleDone(task) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                this.tasks[index].done = !this.tasks[index].done;
                this.saveTasks();
            }
        },
        saveTasks() {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        },
        exportTasks() {
            const dataStr = JSON.stringify(this.tasks, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "tasks.json";
            link.click();

            URL.revokeObjectURL(url);
        },
        importTasks(newTasks) {
            const imported = newTasks.map(t => ({ ...t, id: nextId++ }));
            this.tasks = imported;
            this.saveTasks();
        }
    }
});

app.mount('#app');
