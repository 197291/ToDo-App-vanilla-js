const Filter = (function () {

  function setFilter(newValue) {
    value = newValue;
    this.filterChangeCb(value);
  }

  function attachClassName(button) {
    this.allFilterButton.classList.remove('active');
    this.activeFilterButton.classList.remove('active');
    this.completedFilterButton.classList.remove('active');
    button.classList.add('active');
  }

  const mapBtn = {
    3: 'allFilterButton',
    1: 'activeFilterButton',
    2: 'completedFilterButton'
  }


  const Filter = function (onFilterChange, filterType) {

    this.filterChangeCb = onFilterChange ? onFilterChange : function () {};
    this.allFilterButton = document.getElementById('allfilter');
    this.activeFilterButton = document.getElementById('activefilter');
    this.completedFilterButton = document.getElementById('completedfilter');
    this.initFiltersEvents();
    setFilter = setFilter.bind(this);
    attachClassName = attachClassName.bind(this);
    const keyFilterBtn = mapBtn[filterType || Filter._ALL];
    attachClassName(this[keyFilterBtn]);
    value = filterType || Filter._ALL;
  }

  Filter._ALL = 3;
  Filter._ACTIVE = 1;
  Filter._COMPLETED = 2;
  let value = Filter._ALL;



  Filter.prototype = {
    initFiltersEvents: function () {
      this.allFilterButton.addEventListener('click', this.setAllFilter.bind(this));
      this.activeFilterButton.addEventListener('click', this.setActiveFilter.bind(this));
      this.completedFilterButton.addEventListener('click', this.setCompletedFilter.bind(this));
    },

    setAllFilter: function () {
      setFilter(Filter._ALL);
      attachClassName(this.allFilterButton);
    },

    setActiveFilter: function () {
      setFilter(Filter._ACTIVE);
      attachClassName(this.activeFilterButton);
    },

    setCompletedFilter: function () {
      setFilter(Filter._COMPLETED);
      attachClassName(this.completedFilterButton);
    },

    getFilterValue: function () {
      return value;
    }
  }
  return Filter;
})()