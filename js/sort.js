const Sort = (function () {

  function setSort(newValue) {
    value = newValue;
    this.sortChanged(value);
  }

  function attachClassName() {
    this.sortButton.classList.toggle('up');
  }

  const mock = function () {};

  const Sort = function (onSortChange, saveSortType, defaultSortType) {
    this.sortChanged = onSortChange ? onSortChange : mock;
    this.saveSortType = saveSortType ? saveSortType : mock;
    this.sortButton = document.getElementById('sortButton');
    this.initFiltersEvents();
    setSort = setSort.bind(this);
    value = defaultSortType || Sort._ASC;
  }

  Sort._ASC = 1;
  Sort._DESC = 2;
  let value = Sort._ASC;

  Sort.prototype = {
    initFiltersEvents: function () {
      this.sortButton.addEventListener('click', this.setSortHandler.bind(this));
    },

    setSortHandler: function () {
      const sortOrder = value === Sort._ASC ? Sort._DESC : Sort._ASC;
      setSort(sortOrder);
      this.saveSortType(sortOrder);
      attachClassName();
    },

    getSortValue: function () {
      return value;
    },

    sortingByKey: function (key) {
      return function (a, b) {
        if (value === Sort._ASC) {
          return a[key].localeCompare(b[key])
        } else {
          return b[key].localeCompare(a[key])
        }
      }
    }
  }

  return Sort;
})()