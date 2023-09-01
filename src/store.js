import { pushScopeId, reactive } from "vue";


export const store = reactive({

    baseURL: 'http://localhost/TodoWave-server',
    logged_id: null,
    username: null,
    todos: {
        activeTodos: [],
        expiredTodos: []
    },
    notification: '',
    error: '',
    refreshTodos(data) {
        this.todos.activeTodos = [];
        this.todos.expiredTodos = [];

        const currentDate = new Date();

        data.forEach(todo => {
            const targetDate = todo.deadline ? new Date(todo.deadline) : null;
            if (targetDate) {
                const threeDaysBefore = new Date();
                threeDaysBefore.setDate(currentDate.getDate() + 3);

                if (targetDate <= currentDate) {
                    todo.expired = true;
                    this.todos.expiredTodos.push(todo);
                } else if (targetDate <= threeDaysBefore) {
                    todo.upcomingExpiration = true;

                    this.todos.activeTodos.push(todo);

                } else {
                    this.todos.activeTodos.push(todo);

                }

            } else if (!targetDate) {
                this.todos.activeTodos.push(todo);

            }
        });
    },

    timeoutNotification: null,
    setNotification(notification) {

        this.notification = notification;

        if (this.timeoutNotification) {
            clearTimeout(this.timeoutNotification);
        }

        // Imposta un nuovo timeout
        this.timeoutNotification = setTimeout(() => {
            this.notification = '';
        }, 4000);
    },

    timeoutError: null,
    setError(error) {

        this.error = error;

        if (this.timeoutError) {
            clearTimeout(this.timeoutError);
        }

        // Imposta un nuovo timeout
        this.timeoutError = setTimeout(() => {
            this.error = '';
        }, 4000);
    }




});
