import Sortable from 'sortablejs';
import Memory from '../memory/Memory';

export default class NoteController {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.memory = new Memory();

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.wrapper.addEventListener('click', NoteController.removeNote);
    this.wrapper.addEventListener('click', this.showForm);
    this.wrapper.addEventListener('click', this.hideForm);
    this.wrapper.addEventListener('mousedown', this.onMouseDown);
    // document.documentElement.addEventListener('mousedown', NoteController.ifGrabbed);
    // document.documentElement.addEventListener('mouseup', NoteController.ifUngrabbed);
  }

  // static ifGrabbed(e) {
  //   if (e.target.closest('.note-container')) {
  //     document.documentElement.style.cursor = 'grabbing';
  //   }
  // }

  // static ifUngrabbed(e) {
  //   document.documentElement.style.cursor = 'auto';
  // }

  static get form() {
    return `
      <form class="add-note">
        <textarea class="textarea" placeholder="Enter a title for this card..." cols="34" rows="3" required></textarea>
        <div class="add-note-footer">
          <button class="add-note-button" type="submit">Add Card</button>
          <span class="add-note-close">&#10006;</span>
        </div>
      </form>
    `;
  }

  static makeNote(text) {
    const note = `
      <div class="note-container">
        <div class="note">
          <div class="note-text">${text}</div>
          <button type="button" class="close-note">✖</button>
        </div>
      </div>
    `;
    return note;
  }

  static removeNote(e) {
    if (!e.target.classList.contains('close-note')) {
      return;
    }
    const deletable = e.target.closest('.note-container');
    deletable.remove();
  }

  showForm(e) {
    if (!e.target.classList.contains('column-footer')) {
      return;
    }
    const formHTML = NoteController.form;
    e.target.insertAdjacentHTML('afterend', formHTML);
    const form = e.target.closest('.column').querySelector('.add-note');
    e.target.classList.toggle('hidden');
    form.addEventListener('submit', this.onSubmit);
  }

  hideForm(e) {
    if (!e.target.classList.contains('add-note-close')) {
      return;
    }
    const form = e.target.closest('.add-note');
    e.target.closest('.column').querySelector('.column-footer').classList.toggle('hidden');
    form.removeEventListener('submit', this.onSubmit);
    form.remove();
  }

  onSubmit(e) {
    e.preventDefault();

    const text = e.target.closest('.add-note').querySelector('.textarea').value;
    const cleanText = text.trim();
    if (cleanText) {
      const html = NoteController.makeNote(cleanText);
      const aim = e.target.closest('section').querySelector('.column-main');
      const footer = e.target.closest('.column').querySelector('.column-footer');
      aim.insertAdjacentHTML('beforeend', html);
      e.target.remove();
      footer.classList.toggle('hidden');
    }
    this.memory.saveItems();
  }

  onMouseDown() {
    const sortableLeft = new Sortable(this.wrapper.querySelector('.main-left'), {
      group: 'trello',
      sort: true,
      animation: 300,
      ghostClass: 'ghost',
      dragClass: 'dragged',
    });
    const sortableCenter = new Sortable(this.wrapper.querySelector('.main-center'), {
      group: 'trello',
      sort: true,
      animation: 300,
      ghostClass: 'ghost',
      dragClass: 'dragged',
    });
    const sortableRight = new Sortable(this.wrapper.querySelector('.main-right'), {
      group: 'trello',
      sort: true,
      animation: 300,
      ghostClass: 'ghost',
      dragClass: 'dragged',
    });
  }
}
