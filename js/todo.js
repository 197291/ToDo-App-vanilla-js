const Todo = function (text) {
  this.id = +new Date();
  this.text = text;
  this.isCompleted = false;
  this.isDeleted = false;
}