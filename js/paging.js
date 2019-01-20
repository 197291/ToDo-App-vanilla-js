const Paging = (function () {
  function getpagingItem(number, isActive) {
    const a = document.createElement('a');
    a.href = '#';
    a.appendChild(document.createTextNode(number));
    a.className = isActive ? 'page active' : 'page'
    const selectPage = this.selectPage.bind(this);
    a.addEventListener('click', function () {
      selectPage(number);
    });
    return a;
  }

  function attachClassName(button) {
    this.allFilterButton.classList.remove('active');
    this.activeFilterButton.classList.remove('active');
    this.completedFilterButton.classList.remove('active');
    button.classList.add('active');
  }

  let onPageChangeCb = function () {};
  const initialStartPage = 1;

  const Paging = function (initialLength, initialItemsPerPage, onPageChange, startPage) {
    this.length = initialLength;
    onPageChangeCb = onPageChange ? onPageChange : onPageChangeCb;
    this.itemsPerPage = initialItemsPerPage;
    this.currentPage = startPage || initialStartPage;
    this.pagingContainer = document.getElementById('pagingcontainer');
    getpagingItem = getpagingItem.bind(this);
    this.render();
  }

  Paging.prototype = {
    setItemsPerPage: function (newPerPage) {
      this.itemsPerPage = newPerPage;
      this.render();
    },

    selectPage: function (number) {
      this.currentPage = number;
      onPageChangeCb(number);
    },

    setLength: function (newLength) {
      this.length = newLength;
      const lastPage = Math.ceil(this.length / this.itemsPerPage) || 1;
      if (lastPage < this.currentPage) {
        this.currentPage = lastPage;
      }
      this.render();
    },

    setCurrentPage: function (newPage) {
      this.currentPage = newPage;
      this.render();
    },

    render: function () {
      while (this.pagingContainer.lastChild) {
        this.pagingContainer.removeChild(this.pagingContainer.lastChild);
      }
      const buttonsLength = Math.ceil(this.length / this.itemsPerPage);
      if (buttonsLength === 1) return;
      const fragment = document.createDocumentFragment();
      for (let i = 1; i <= buttonsLength; i++) {
        const a = getpagingItem(i, this.currentPage === i);
        fragment.appendChild(a);
      }
      this.pagingContainer.appendChild(fragment);
    }
  }
  return Paging;
})()