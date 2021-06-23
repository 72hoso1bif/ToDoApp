import { browser, by, element } from 'protractor';

export class ToDoListTasksPage {

  navigateTo() {
    return browser.get('/toDoList?daily=daily') as Promise<any>;
  }

  getTodoTaskCardElements() {
    return element.all(by.css('.todo-list-tasks-container--board--todo--card'));
  }

  getFirstTodoTaskCardElement() {
    return element(by.css('.todo-list-tasks-container--board--todo--card'));
  }

  getOpenModalElement() {
    return element(by.tagName('app-to-do-list-task-modal'));
  }

  getOpenModalHeadingElement() {
    return element(by.css('app-to-do-list-task-modal h2'));
  }

}
