const Storage = (function () {

  const Storage = function (onSortChange) {
    this.storage = window.localStorage;
  }

  Storage.prototype = {
    getInitialApp: function () {
      return {
        pageSize: JSON.parse(this.storage.getItem('pageSize')),
        todos: JSON.parse(this.storage.getItem('todos')),
        sortType: JSON.parse(this.storage.getItem('sortType')),
        filterType: JSON.parse(this.storage.getItem('filterType')),
        startPage: JSON.parse(this.storage.getItem('startPage')),
      }
    },

    getInitialProperties: function () {
      const initialApp = this.getInitialApp();
      return { ...initialApp
      };
    },

    savePageSize: function (pageSize) {
      this.storage.setItem('pageSize', pageSize);
    },

    saveTodoList: function (todos) {
      this.storage.setItem('todos', JSON.stringify(todos));
    },

    saveSortType: function (sortType) {
      this.storage.setItem('sortType', sortType);
    },

    saveFilterType: function (filterType) {
      this.storage.setItem('filterType', filterType);
    },

    saveStartPage: function (startPage) {
      this.storage.setItem('startPage', startPage);
    }
  }

  return Storage;
})()