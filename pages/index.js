import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: ({ name, date }) => {
    const parsedDate = new Date(date);
    parsedDate.setMinutes(
      parsedDate.getMinutes() + parsedDate.getTimezoneOffset()
    );

    const id = uuidv4();
    const todoData = { name, date: parsedDate, id };

    const newTodo = generateTodo(todoData);
    section.addItem(newTodo);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);

  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    return generateTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
