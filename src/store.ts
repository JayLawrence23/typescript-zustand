import create from 'zustand';

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Zustand Implementation
type Store = {
  todos: Todo[];
  newTodo: string;
  addTodos: () => void;
  setNewTodo: (text: string) => void;
  update: (id: number, text: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  load: (todos: Todo[]) => void;
}

const useStore = create<Store>((set) => ({
  todos: [],
  newTodo: "",
  load(todos) {
    set((state) => ({
      ...state,
      todos,
    }))
  },
  addTodos() {
    set((state) => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo),
      newTodo: "",
    }))
  },
  setNewTodo(text) {
    set((state) => ({
      ...state,
      newTodo: text,
    }))
  },
  update(id, text) {
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }))
  },
  toggle(id) {
    set((state) => ({
      ...state,
      todos: toggleTodo(state.todos, id),
    }))
  },
  remove(id) {
    set((state) => ({
      ...state,
      todos: removeTodo(state.todos, id),
    }))
  },
}))

export default useStore;