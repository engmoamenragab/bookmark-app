//ANCHOR decleare global variable
var bookmarkName = document.getElementById("bookmarkName"),
  bookmarkUrl = document.getElementById("bookmarkUrl"),
  addUpdateBtn = document.getElementById("addUpdateBtn"),
  cancelBtn = document.getElementById("cancelBtn"),
  deleteBtnsArr = [],
  updateBtnsArr = [],
  searchInp = document.getElementById("searchInp"),
  tBody = document.getElementById("tBody");
//ANCHOR check local storage
if (localStorage.getItem("bookmarksListData") != null) {
  var bookmarksList = JSON.parse(localStorage.getItem("bookmarksListData"));
} else {
  var bookmarksList = [];
}
displayBookmarksList();
//ANCHOR add bookmark list item function
function addBookmarksListItem() {
  var bookmarksListItem = {
    bookmarksListItemName: bookmarkName.value,
    bookmarksListItemUrl: bookmarkUrl.value
  };
  bookmarksList.push(bookmarksListItem);
  localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
  displayBookmarksList();
  clearForm();
}
//ANCHOR connect addUpdateBtn with addBookmarksListItem() function
addUpdateBtn.addEventListener("click", addBookmarksListItem);
//ANCHOR display bookmark list function
function displayBookmarksList() {
  var trs = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    trs += `<tr>
    <td>${i}</td>
    <td>${bookmarksList[i].bookmarksListItemName}</td>
    <td><a href="${bookmarksList[i].bookmarksListItemUrl}" target="_blank" class="btn btn-info"><i class="fas fa-external-link-alt"></i></a></td>
    <td><button class="btn btn-warning updateBtn"><i class="fas fa-edit"></i></button></td>
    <td><button class="btn btn-danger deleteBtn"><i class="far fa-trash-alt"></i></button></td>
    </tr>`;
  }
  tBody.innerHTML = trs;
  deleteBtnsArr = Array.from(document.querySelectorAll(".deleteBtn"));
  updateBtnsArr = Array.from(document.querySelectorAll(".updateBtn"));
}
//ANCHOR delete bookmarks list item function
function deleteBookmarksListItem(x) {
  console.log(x);
  bookmarksList.splice(x, 1);
  console.log(bookmarksList);
  localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
  displayBookmarksList();
}
//ANCHOR connect delete bookmarks list item function with delete btns
for (var i = 0; i < deleteBtnsArr.length; i++) {
  deleteBtnsArr[i].addEventListener("click", function () {
    deleteBookmarksListItem(i);
  });
}
//ANCHOR for update bookmarks list item function
function forUpdateBookmarksListItem(x) {
  console.log(x);
  bookmarkName.value = bookmarksList[x].bookmarksListItemName;
  bookmarkUrl.value = bookmarksList[x].bookmarksListItemUrl;
}
//ANCHOR connect for update bookmarks list item function with update btns
for (var i = 0; i < updateBtnsArr.length; i++) {
  updateBtnsArr[i].addEventListener("click", function () {
    forUpdateBookmarksListItem(i);
  });
}
//ANCHOR clear form function
function clearForm() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}