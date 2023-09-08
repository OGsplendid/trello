import Memory from '../memory/Memory';

export default class NoteController {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.memory = new Memory();
    this.actualElement = undefined;

    // this.onMouseOver = this.onMouseOver.bind(this);
    // this.onMouseOut = this.onMouseOut.bind(this);
    // this.removeNote = this.removeNote.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.wrapper.addEventListener('mouseover', NoteController.onMouseOver);
    this.wrapper.addEventListener('mouseout', NoteController.onMouseOut);
    this.wrapper.addEventListener('click', NoteController.removeNote);
    this.wrapper.addEventListener('click', this.showForm);
    this.wrapper.addEventListener('click', this.hideForm);
    this.wrapper.addEventListener('mousedown', this.onMouseDown);
  }

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
          <span class="note-text">${text}</span>
          <span class="close-note hidden">x</span>
        </div>
      </div>
    `;
    return note;
  }

  static removeNote(e) {
    if (!e.target.classList.contains('close-note')) {
      return;
    }
    const deletable = e.target.closest('.note');
    deletable.remove();
  }

  static onMouseOver(e) {
    if (!e.target.classList.contains('note')) {
      return;
    }
    const closeNote = e.target.closest('.note').querySelector('.close-note');
    closeNote.classList.toggle('hidden');
  }

  static onMouseOut(e) {
    if (!e.target.classList.contains('note')) {
      return;
    }
    const closeNote = e.target.closest('.note').querySelector('.close-note');
    closeNote.classList.toggle('hidden');
  }

  showForm(e) {
    if (!e.target.classList.contains('column-footer')) {
      return;
    }
    const formHTML = NoteController.form;
    e.target.insertAdjacentHTML('afterend', formHTML);
    const form = e.target.closest('.column').querySelector('.add-note');
    form.addEventListener('submit', this.onSubmit);
    e.target.classList.toggle('hidden');
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

  static onSubmit(e) {
    e.preventDefault();

    const text = e.target.closest('.column').querySelector('.textarea').value;
    const cleanText = text.trim();
    if (cleanText) {
      const html = NoteController.makeNote(cleanText);
      const aim = e.target.closest('.column').querySelector('.column-main');
      const footer = e.target.closest('.column').querySelector('.column-footer');
      aim.insertAdjacentHTML('beforeend', html);
      e.target.remove();
      footer.classList.toggle('hidden');
    }
  }

  onMouseUp(e) {
    const mouseUpTarget = e.target;
    console.log(mouseUpTarget);

    this.actualElement.classList.remove('dragged');
    this.actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', this.onMouseUp);
    document.documentElement.removeEventListener('mouseover', this.secondOnMouseOver);
  }

  onMouseDown(e) {
    if (!e.target.classList.contains('note')) {
      return;
    }

    e.preventDefault();

    this.actualElement = e.target.closest('.note-container');

    let shiftX = e.clientX - this.actualElement.getBoundingClientRect().left;
    let shiftY = e.clientY - this.actualElement.getBoundingClientRect().top;

    this.actualElement.classList.add('dragged');
    document.documentElement.addEventListener('mouseup', this.onMouseUp);
    document.documentElement.addEventListener('mouseover', (e) => {
      this.actualElement.style.top = e.pageY - shiftY + 'px';
      this.actualElement.style.left = e.pageX - shiftX + 'px';
    });
    // const note = e.target.closest('.note-container');

    // let shiftX = e.clientX - note.getBoundingClientRect().left;
    // let shiftY = e.clientY - note.getBoundingClientRect().top;

    // note.style.position = 'absolute';
    // note.style.cursor = 'grabbing';
    // note.style.zIndex = 1000;
    // document.body.append(note);

    // moveAt(e.pageX, e.pageY);

    // function moveAt(pageX, pageY) {
    //   note.style.left = pageX - shiftX + 'px';
    //   note.style.top = pageY - shiftY + 'px';
    // }

    // function onMouseMove(event) {
    //   moveAt(event.pageX, event.pageY);
    // }
    // document.addEventListener('mousemove', onMouseMove);

    // note.onmouseup = function() {
    //   document.removeEventListener('mousemove', onMouseMove);
    //   note.onmouseup = null;
    //   note.style.cursor = 'auto';
    // };

    // note.ondragstart = function() {
    //   return false;
    // };
  }
}
