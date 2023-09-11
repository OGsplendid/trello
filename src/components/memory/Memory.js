export default class Memory {
  constructor() {
    this.columns = ['left', 'center', 'right'];

    this.saveItems = this.saveItems.bind(this);
    this.getItems = this.getItems.bind(this);

    window.addEventListener('beforeunload', this.saveItems);
    document.addEventListener('DOMContentLoaded', this.getItems);
  }

  saveItems() {
    this.columns.forEach((column) => {
      const arr = [];
      const items = document.querySelector(`.column-${column}`).querySelectorAll('.note-text');
      if (items) {
        items.forEach((item) => arr.push(item.textContent));
        localStorage.setItem(`data-${column}`, JSON.stringify(arr));
      }
    });
  }

  getItems() {
    this.columns.forEach((column) => {
      let data;
      try {
        data = JSON.parse(localStorage.getItem(`data-${column}`));
      } catch (error) {
        console.log(error);
      }
      if (data) {
        data.forEach((item) => {
          const html = Memory.makeNote(item);
          document.querySelector(`.column-${column}`).querySelector('.column-main').insertAdjacentHTML('beforeend', html);
        });
      }
    });
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
}
