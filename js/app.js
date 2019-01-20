const App = (function () {

  const App = function () {}

  App.prototype = {
    run: function () {
      this.initMembers();
      this.attachEventsToControls();
      this.render();
    },

    initMembers: function () {

      const defaultPagingSize = 5;
      this.storage = new Storage();
      const {
        pageSize,
        todos,
        sortType,
        filterType,
        startPage
      } = this.storage.getInitialProperties();
      this.todos = todos || [];
      this.todoTextInput = document.getElementById('todotitle');
      this.todoAddButton = document.getElementById('addtodo')
      this.todoListUl = document.getElementById('todolist');
      this.setPagingButton = document.getElementById('setpaging');
      this.pagingInput = document.getElementById('pagingsize');
      this.pagingInput.value = pageSize || defaultPagingSize;
      this.paging = new Paging(
        this.todos.length,
        pageSize || defaultPagingSize,
        this.pageChanged.bind(this),
        startPage
      );
      this.filter = new Filter(this.filterChanged.bind(this), filterType);
      this.sort = new Sort(
        this.sortChanged.bind(this),
        this.saveSortType.bind(this),
        sortType
      );
    },

    attachEventsToControls: function () {
      this.initAddButtonEvents();
      this.initPaginationEvents();
    },

    initAddButtonEvents: function () {
      this.todoAddButton.addEventListener('click', this.addNewTodo.bind(this));
    },

    initPaginationEvents: function () {
      this.setPagingButton.addEventListener('click', this.setPagingSize.bind(this))
    },

    setPagingSize: function () {
      this.paging.setItemsPerPage(+this.pagingInput.value);
      this.storage.savePageSize(+this.pagingInput.value);
      this.render();
    },

    addNewTodo: function () {
      if (!this.todoTextInput.value) {
        alert('Please fill in the todo description');
        return;
      }
      const todo = new Todo(this.todoTextInput.value);
      this.todos.unshift(todo);
      this.todoTextInput.value = '';
      this.render();
    },

    toggeleCompleteTodo: function (row) {
      row.todo.isCompleted = !row.todo.isCompleted;
      row.setIsCompleted(row.todo.isCompleted);
      this.render();
    },

    sortChanged: function () {
      this.render();
    },

    pageChanged: function (startPage) {
      this.storage.saveStartPage(startPage);
      this.render();
    },

    filterChanged: function (filterType) {
      this.storage.saveFilterType(filterType);
      this.render();
    },

    saveSortType: function (sortType) {
      this.storage.saveSortType(sortType);
    },

    deleteTodo: function (row) {
      const len = this.todos.length;
      for (let i = 0; i < len; i++) {
        if (this.todos[i].id === row.todo.id) {
          this.todos.splice(i, 1);
          break;
        }
      }
      this.render();
    },

    getSortedTodos: function (todos) {
      const sortValue = this.sort.getSortValue();
      return todos.sort(this.sort.sortingByKey('text'));
    },

    getFilteredTodos: function () {
      const filterValue = this.filter.getFilterValue();
      if (filterValue === Filter._ALL) {
        return this.getSortedTodos(this.todos);
      }
      const todos = this.todos.filter(function (item) {
        return filterValue === Filter._ACTIVE ? item.isCompleted === false : item.isCompleted === true;
      })
      return this.getSortedTodos(todos);
    },

    getPagedTodos: function (filteredTodos) {
      const begin = (this.paging.currentPage - 1) * this.paging.itemsPerPage;
      const end = begin + this.paging.itemsPerPage;
      return filteredTodos.slice(begin, end);
    },

    render: function () {
      while (this.todoListUl.lastChild) {
        this.todoListUl.removeChild(this.todoListUl.lastChild);
      }
      let todos = this.getFilteredTodos();
      this.paging.setLength(todos.length);
      todos = this.getPagedTodos(todos);
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const todoRow = new TodoRow(todo, this.toggeleCompleteTodo.bind(this), this.deleteTodo.bind(this));
        fragment.appendChild(todoRow.li);
      };

      this.storage.saveTodoList(this.todos);
      this.todoListUl.appendChild(fragment);
    }
  }
  return new App();
})()