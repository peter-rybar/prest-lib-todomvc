import { TodoActions, Todo, TodoWidget } from "./todowidget";
import { Store } from "./store";

export class TodoActionsImpl implements TodoActions {

    readonly widget: TodoWidget;
    readonly store: Store<Todo[]>;

    constructor(widget: TodoWidget, store: Store<Todo[]>) {
        this.widget = widget;
        this.store = store;
    }

    insert(title: string) {
        const todo = {
            id: new Date().getTime(),
            title: title,
            completed: false
        } as Todo;
        this.widget.getState().todos.push(todo);
        this.widget.getState().todo = "";
        this.widget.update();
        this.store.write(this.widget.getState().todos);
    }

    completeAll(complete: boolean) {
        this.widget.getState().todos.forEach(t => t.completed = complete);
        this.widget.update();
        this.store.write(this.widget.getState().todos);
    }

    complete(id: number) {
        this.widget.getState().todos.forEach(t => t.id === id ? t.completed = !t.completed : null);
        this.widget.update();
        this.store.write(this.widget.getState().todos);
    }

    delete(id: number) {
        this.widget.getState().todos = this.widget.getState().todos.filter(t => t.id !== id);
        this.widget.update();
        this.store.write(this.widget.getState().todos);
    }

    clearCompleted() {
        this.widget.getState().todos = this.widget.getState().todos.filter(t => !t.completed);
        this.widget.update();
        this.store.write(this.widget.getState().todos);
    }

    edit(id: number) {
        this.widget.getState().edit = id;
        this.widget.update();
    }

    edited(title: string) {
        this.widget.getState().todos.forEach(t => t.id === this.widget.getState().edit ? t.title = title : null);
        this.widget.getState().edit = null;
        this.widget.update();
        this.store.write(this.widget.getState().todos);
    }

    filter(type: string) {
        this.widget.getState().filter = type;
        this.widget.update();
    }

}
