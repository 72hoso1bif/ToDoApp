import { browser, logging } from 'protractor';
import {ToDoListTasksPage} from "./to-do-list-tasks.po";

describe('workspace-project App', () => {
  let page: ToDoListTasksPage;

  beforeEach(() => {
    page = new ToDoListTasksPage();
  });

  it('should display a list of todos', () => {
    page.navigateTo();
    expect(page.getTodoTaskCardElements().count()).toBeGreaterThan(1);
  });

  it('should open and view a particular task', () => {
    page.navigateTo();
    page.getFirstTodoTaskCardElement().click();

    expect(page.getOpenModalElement()).toBeTruthy();
    expect(page.getOpenModalHeadingElement().getText()).toBe('Kategorie');
  });

});
