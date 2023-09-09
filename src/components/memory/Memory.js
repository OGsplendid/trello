export default class Memory {
  constructor() {
    // this.saveDataInLocalStorage = this.save.bind(this);
    // this.getDataFromLocalStorage = this.get.bind(this);

    window.addEventListener('beforeunload', Memory.save);
    document.addEventListener('DOMContentLoaded', Memory.get);
  }

  static save() {
    localStorage.clear();
    const itemsLeft = document.querySelector('.column-left').querySelectorAll('.note-text');
    const itemsCenter = document.querySelector('.column-center').querySelectorAll('.note-text');
    const itemsRight = document.querySelector('.column-right').querySelectorAll('.note-text');
    if (itemsLeft) {
      const arr = [];
      for (const item of itemsLeft) {
        arr.push(item.textContent);
        localStorage.setItem('data-left', JSON.stringify(arr));
        console.log(arr);
      }
    }
    if (itemsCenter) {
      const arr = [];
      for (const item of itemsCenter) {
        arr.push(item.textContent);
        localStorage.setItem('data-center', JSON.stringify(arr));
      }
    }
    if (itemsRight) {
      const arr = [];
      for (const item of itemsRight) {
        arr.push(item.textContent);
        localStorage.setItem('data-right', JSON.stringify(arr));
      }
    }
  }

  static get() {
    let json;
    let obj = null;
    const note = (text) => {
      const html = `
      <div class="note-container">
        <div class="note">
          <span class="note-text">${text}</span>
          <span class="close-note hidden">x</span>
        </div>
      </div>
    `;
    };

    try {
      json = localStorage.getItem('data-left');
      obj = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }
    if (obj) {
      for (const item of obj) {
        const html = Memory.makeNote(item);
        document.querySelector('.column-left').querySelector('.column-main').insertAdjacentHTML('beforeend', html);
      }
    }
    try {
      json = localStorage.getItem('data-center');
      obj = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }
    if (obj) {
      for (const item of obj) {
        const html = Memory.makeNote(item);
        document.querySelector('.column-center').querySelector('.column-main').insertAdjacentHTML('beforeend', html);
      }
    }
    try {
      json = localStorage.getItem('data-right');
      obj = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }
    if (obj) {
      for (const item of obj) {
        const html = Memory.makeNote(item);
        document.querySelector('.column-right').querySelector('.column-main').insertAdjacentHTML('beforeend', html);
      }
    }
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
}
