export class ToDoList {
  id?: string;
  name?: string;
  userId?: string;
  expanded?: boolean;
  editMode?: boolean;
  taskCount?: number;
  iconName?: string;
  isNew?: boolean;
  createdAt?: string;
}

export class ToDoListDTO {
  id?: number;
  name?: string;
  userId?: number;
  iconName?: string;
}

export class TodoListO {

  constructor(
    public id?: string,
    public name?: string,
    public tasks?: any
  ) {}
}
