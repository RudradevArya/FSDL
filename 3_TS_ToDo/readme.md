# Todo App in TS 
## Vanilla TypeScript vs. React + Tailwind + TS 


## Vanilla TypeScript Todo App

### Setup and Running (Vanilla TS)

1. Install Node.js from the official website (nodejs.org).

2. Open Terminal.

3. Install TypeScript globally:
   ```
   npm install -g typescript
   ```

4. Create a new project directory and navigate to it:
   ```
   mkdir my-ts-project
   cd my-ts-project
   ```

5. Initialize a new Node.js project:
   ```
   npm init -y
   ```

6. Install TypeScript as a dev dependency:
   ```
   npm install --save-dev typescript
   ```

7. Create a TypeScript configuration file:
   ```
   npx tsc --init
   ```

8. Create a src folder for your TypeScript files:
   ```
   mkdir src
   ```

9. Create a sample TypeScript file (e.g., src/index.ts).

10. Compile TypeScript to JavaScript:
    ```
    npx tsc
    ```
11. Ensure you have Node.js and npm installed on your system.
12. Open a terminal and navigate to the project directory.
13. Run the following commands:

   ```bash
   npm install
   npm run build
   ```

14. Open the `src/index.html` file in a web browser to run the application.

### Folder Structure (Vanilla TS)

```
ts-todo-app/
│
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.ts
│
├── dist/
│   └── app.js (created after build)
│
├── package.json
└── tsconfig.json
```


### Source Code Explanation (Vanilla TS)

#### `index.html`

This file provides the structure for the todo app.

```html
    <script src="../dist/app.js"></script>
```

- so that `index.html` can call the compiled `app.ts` file

#### `app.ts`

This TypeScript file contains all the logic for the todo application.

```typescript
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

    // ... (addTodo, deleteTodo, toggleTodo, renderTodos methods)
}

new TodoApp();
```


## React + TypeScript Todo App

### Setup and Running (React)

1. First, let's set up the project:

```bash
npx create-react-app todo-app --template typescript
cd todo-app
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

2. Configure Tailwind CSS by replacing the content of `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Replace the content of `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Ensure you have Node.js and npm installed on your system.
5. Open a terminal and navigate to the project directory.
6. Run the following commands:

   ```bash
   npm install
   npm start
   ```

7. The application will start and be available at `http://localhost:3000` in your web browser.

### Folder Structure (React)

```
todo-app/
│
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── App.tsx
│   ├── TodoApp.tsx
│   ├── index.tsx
│   ├── index.css
│   └── react-app-env.d.ts
│
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

### Information 

This project is a modern, responsive todo application built with React and TypeScript. It uses Tailwind CSS for styling, providing a clean and intuitive user interface. The app allows users to add, complete, and delete tasks.

Key features:
- React for component-based UI
- TypeScript for type safety
- Tailwind CSS for modern, utility-first styling
- Responsive design

### Source Code Explanation (React)

#### `App.tsx`

This is the main component that renders the `TodoApp` component.

```typescript
import React from 'react';
import TodoApp from './TodoApp';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
};

export default App;
```

- `React.FC` is used to type the functional component.
- The `App` component simply renders the `TodoApp` component.

#### `TodoApp.tsx`

This is the core component of the application, containing all the todo list logic.

```typescript
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // ... (addTodo, toggleTodo, deleteTodo functions)

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {/* ... (JSX for the todo app UI) */}
    </div>
  );
};

export default TodoApp;
```

- `useState` hook is used to manage the state of todos and input.
- `Todo` interface defines the shape of a todo item.
- The component includes functions for adding, toggling, and deleting todos.
- Tailwind CSS classes are used extensively for styling.


- The `Todo` interface defines the structure of a todo item.
- `TodoApp` class encapsulates all the functionality of the app.
- The constructor sets up event listeners for adding todos.
- Methods for adding, deleting, toggling, and rendering todos are defined within the class.
- DOM manipulation is done directly using TypeScript.

Both implementations provide similar functionality but showcase different approaches to building a web application. The React version leverages the power of a popular framework and its ecosystem, while the vanilla TypeScript version demonstrates how to build an application from scratch with just the language itself.