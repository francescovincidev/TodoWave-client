import { pushScopeId, reactive } from "vue";


export const store = reactive({

    baseURL: 'http://localhost/TodoWave-server',
    logged_id: null,
    username: null,
    todos: {
        activeTodos: [],
        expiredTodos: []
    },
    refreshTodos(data) {
        this.todos.activeTodos = [];
        this.todos.expiredTodos = [];

        // const todos = response.data
        const currentDate = new Date();
        // currentDate = currentDate.toISOString().split('T')[0];
        data.forEach(todo => {
            const targetDate = todo.deadline ? new Date(todo.deadline) : null;
            if (targetDate) {
                const threeDaysBefore = new Date();
                threeDaysBefore.setDate(currentDate.getDate() + 3);

                if (targetDate <= currentDate) {
                    todo.expired = true;
                    console.log('expired');
                    this.todos.expiredTodos.push(todo);
                } else if (targetDate <= threeDaysBefore) {
                    todo.upcomingExpiration = true;
                    console.log('upexpired');

                    this.todos.activeTodos.push(todo);

                } else {

                    this.todos.activeTodos.push(todo);
                    console.log('good');

                }

            } else if (!targetDate) {
                console.log('nulla');

                this.todos.activeTodos.push(todo);

            }
        });
    }

});
