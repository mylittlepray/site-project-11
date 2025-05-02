export default {
    props: ['tasks'],
    emits: ['delete-task', 'toggle-done'],
    template: `
        <ul class="list-group task-list mb-3">
            <li
                class="list-group-item d-flex justify-content-between align-items-center task-item"
                v-for="task in tasks"
                :key="task.id"
                :class="{ done: task.done, overdue: isOverdue(task) && !task.done }"
            >
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" :checked="task.done" @change="$emit('toggle-done', task)">
                </div>
                <div class="flex-grow-1 ms-3">
                    <strong>{{ task.text }}</strong>
                    <div class="text-muted small">до {{ task.deadline }}</div>
                </div>
                <button @click="$emit('delete-task', task)" class="btn btn-danger btn-sm">Удалить</button>
            </li>
        </ul>
    `,
    methods: {
        isOverdue(task) {
            const today = new Date();
            const deadlineDate = new Date(task.deadline);
            deadlineDate.setHours(23, 59, 59);
            return deadlineDate < today;
        }
    }
};
