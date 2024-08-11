"use strict";
class TodoApp {
    constructor() {
        this.todos = [];
        this.todoInput = document.getElementById('todoInput');
        this.addButton = document.getElementById('addButton');
        this.todoList = document.getElementById('todoList');
        this.addButton.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }
    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (todoText) {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            this.todos.push(newTodo);
            this.renderTodos();
            this.todoInput.value = '';
        }
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.renderTodos();
    }
    toggleTodo(id) {
        this.todos = this.todos.map(todo => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
        this.renderTodos();
    }
    renderTodos() {
        this.todoList.innerHTML = '';
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button>Delete</button>
            `;
            const checkbox = li.querySelector('input');
            const deleteButton = li.querySelector('button');
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteButton.addEventListener('click', () => this.deleteTodo(todo.id));
            this.todoList.appendChild(li);
        });
    }
}
new TodoApp();
