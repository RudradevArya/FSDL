interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

class TodoApp {
    private todos: Todo[] = [];
    private todoInput: HTMLInputElement;
    private addButton: HTMLButtonElement;
    private todoList: HTMLUListElement;

    constructor() {
        this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
        this.addButton = document.getElementById('addButton') as HTMLButtonElement;
        this.todoList = document.getElementById('todoList') as HTMLUListElement;

        this.addButton.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    private addTodo(): void {
        const todoText = this.todoInput.value.trim();
        if (todoText) {
            const newTodo: Todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            this.todos.push(newTodo);
            this.renderTodos();
            this.todoInput.value = '';
        }
    }

    private deleteTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.renderTodos();
    }

    private toggleTodo(id: number): void {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.renderTodos();
    }

    private renderTodos(): void {
        this.todoList.innerHTML = '';
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button>Delete</button>
            `;
            const checkbox = li.querySelector('input') as HTMLInputElement;
            const deleteButton = li.querySelector('button') as HTMLButtonElement;

            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteButton.addEventListener('click', () => this.deleteTodo(todo.id));

            this.todoList.appendChild(li);
        });
    }
}

new TodoApp();