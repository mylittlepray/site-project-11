export default {
    template: `
        <form @submit.prevent="submit" class="mb-4">
            <div class="mb-3">
                <label class="form-label">Новая задача</label>
                <input type="text" v-model="text" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Срок исполнения</label>
                <input type="date" v-model="deadline" class="form-control" required />
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-dark">Добавить</button>
                <input type="file" @change="handleImport" class="form-control" accept=".json" />
            </div>
        </form>
    `,
    data() {
        return {
            text: '',
            deadline: ''
        };
    },
    methods: {
        submit() {
            this.$emit('add-task', {
                text: this.text,
                deadline: this.deadline
            });
            this.text = '';
            this.deadline = '';
        },
        handleImport(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (Array.isArray(imported)) {
                        this.$emit('import-tasks', imported);
                    }
                } catch (err) {
                    alert('Неверный JSON файл');
                }
            };
            reader.readAsText(file);
        }
    }
};
