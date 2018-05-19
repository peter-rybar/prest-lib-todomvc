import { Hash } from "../node_modules/prest-lib/src/main/hash";
import { TodoWidget, Todo } from "./todowidget";
import { TodoActionsImpl } from "./todoactions";
import { Store } from "./store";

export class TodoApp {

    store: Store<Todo[]>;
    todoWidget: TodoWidget;
    hash: Hash<string>;

    constructor(element: HTMLElement, todos: Todo[] = []) {
        this._initStore(todos);
        this._initWidget(element);
        this._initRouting();
    }

    private _initStore(todos: Todo[]): void {
        this.store = new Store<Todo[]>(todos);
    }

    private _initWidget(element: HTMLElement): void {
        this.todoWidget = new TodoWidget()
            .setState({
                todo: "",
                todos: this.store.read(),
                filter: "",
                edit: null
            });
        this.todoWidget
            .setActions(new TodoActionsImpl(this.todoWidget, this.store))
            .mount(element);
    }

    private _initRouting(): void {
        this.hash = new Hash<string>()
            .coders(
                data => encodeURIComponent(data),
                str => decodeURIComponent(str)
            )
            .onChange(data => {
                switch (data) {
                    case "":
                    case "active":
                    case "completed":
                        this.todoWidget.getActions().filter(data);
                        break;
                    default:
                        this.todoWidget.getActions().filter(data);
                        this.hash.write("");
                        break;
                }
            });
        this.hash.start();
    }

}
