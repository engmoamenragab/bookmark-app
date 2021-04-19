//ANCHOR declare global variable
var bookmarkName = document.getElementById("bookmarkName"),
  bookmarkUrl = document.getElementById("bookmarkUrl"),
  addUpdateBtn = document.getElementById("addUpdateBtn"),
  cancelBtn = document.getElementById("cancelBtn"),
  deleteBtnsArr = [],
  updateBtnsArr = [],
  searchInp = document.getElementById("searchInp"),
  tBody = document.getElementById("tBody"),
  updateIndexNumber = "";
//ANCHOR check local storage
if (localStorage.getItem("bookmarksListData") != null) {
  var bookmarksList = JSON.parse(localStorage.getItem("bookmarksListData"));
} else {
  var bookmarksList = [];
}
displayBookmarksList();
//ANCHOR add and update bookmark list item function
function addUpdateBookmarksListItem() {
  if (addUpdateBtn.innerHTML == "Add Bookmark") {
    var bookmarksListItem = {
      bookmarksListItemName: bookmarkName.value,
      bookmarksListItemUrl: bookmarkUrl.value
    };
    bookmarksList.push(bookmarksListItem);
    localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
    displayBookmarksList();
    clearForm();
  } else if (addUpdateBtn.innerHTML == "Update Bookmark") {
    bookmarksList[updateIndexNumber].bookmarksListItemName = bookmarkName.value;
    bookmarksList[updateIndexNumber].bookmarksListItemUrl = bookmarkUrl.value;
    localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
    displayBookmarksList();
    clearForm();
    cancelBtn.classList.add("invisible");
    addUpdateBtn.innerHTML = "Add Bookmark";
  }
}
//ANCHOR connect addUpdateBtn with addBookmarksListItem() function
addUpdateBtn.addEventListener("click", addUpdateBookmarksListItem);
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
//ANCHOR clear form function
function clearForm() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}
//ANCHOR delete btns operation
document.addEventListener("click", function (e) {
  var deleteIndex;
  if (e.target.className.includes("deleteBtn") || e.target.className.includes("far")) {
    if (e.target.className.includes("deleteBtn")) {
      deleteIndex = e.target.parentNode.parentNode.firstElementChild.innerHTML;
      e.target.parentNode.parentNode.remove();
      bookmarksList.splice(deleteIndex, 1);
      localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
      displayBookmarksList();
    } else {
      deleteIndex = e.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
      e.target.parentNode.parentNode.parentNode.remove();
      bookmarksList.splice(deleteIndex, 1);
      localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
      displayBookmarksList();
    }
  }
});
//ANCHOR update btns operation
document.addEventListener("click", function (e) {
  var updateIndex;
  if (e.target.className.includes("updateBtn") || e.target.className.includes("fas")) {
    if (e.target.className.includes("updateBtn")) {
      updateIndex = e.target.parentNode.parentNode.firstElementChild.innerHTML;
      bookmarkName.value = bookmarksList[updateIndex].bookmarksListItemName;
      bookmarkUrl.value = bookmarksList[updateIndex].bookmarksListItemUrl;
      addUpdateBtn.innerHTML = "Update Bookmark";
      cancelBtn.classList.remove("invisible");
      updateIndexNumber = updateIndex;
    } else {
      updateIndex = e.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
      bookmarkName.value = bookmarksList[updateIndex].bookmarksListItemName;
      bookmarkUrl.value = bookmarksList[updateIndex].bookmarksListItemUrl;
      addUpdateBtn.innerHTML = "Update Bookmark";
      cancelBtn.classList.remove("invisible");
      updateIndexNumber = updateIndex;
    }
  }
});