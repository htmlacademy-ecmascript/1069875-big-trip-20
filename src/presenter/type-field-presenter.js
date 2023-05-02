import TypeFieldView from '../view/type-field-view.js';
import TypesListView from '../view/types-list-view.js';
import TypesListItemView from '../view/types-list-item-view.js';
import { render, RenderPosition } from '../render.js';

export default class TypeFieldPresenter {
  typeFieldComponent = new TypeFieldView();
  typesListComponent = new TypesListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.typeFieldComponent, this.container, RenderPosition.AFTERBEGIN);
    render(this.typesListComponent, this.typeFieldComponent.getElement().lastElementChild);
    for (let i = 1; i <= 3; i++) {
      render(new TypesListItemView(), this.typesListComponent.getElement());
    }
  }
}
