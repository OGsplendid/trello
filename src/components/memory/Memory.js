export default class Memory {
  constructor() {
    this.array = [];

    this.saveDataInLocalStorage = this.save.bind(this);
    this.getDataFromLocalStorage = this.get.bind(this);

    window.addEventListener('beforeunload', this.save);
    document.addEventListener('DOMContentLoaded', this.get);
  }

  static save() {
    const obj = {
      left: [],
      center: [],
      right: [],
    };
    obj.left = document.querySelector('.column-left').querySelectorAll('.note');
    obj.center = document.querySelector('.column-center').querySelectorAll('.note');
    obj.right = document.querySelector('.column-right').querySelectorAll('.note');

    localStorage.setItem('data', JSON.stringify(obj));
  }

  get() {
    let json;
    let obj = null;

    try {
      json = localStorage.getItem('data');
      obj = JSON.parse(json);
    } catch(error) {
      console.log(error);
    }

    if (obj) {
      Object.keys(obj).forEach((key) => {
        for (let item of obj[key]) {
          document.querySelector(`[id="${key}"]`).insertAdjacentHTML('beforeend', item);
        }
      });
    }
  }
}
