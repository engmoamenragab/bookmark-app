//ANCHOR declare global variable
var bookmarkName = document.getElementById("bookmarkName"),
  bookmarkUrl = document.getElementById("bookmarkUrl"),
  bookmarkNameAlert = document.querySelector(".bookmarkNameRow .form-alert"),
  bookmarkUrlAlert = document.querySelector(".bookmarkUrlRow .form-alert"),
  btnsAlert = document.querySelector(".btnsRow .form-alert"),
  addUpdateBtn = document.getElementById("addUpdateBtn"),
  cancelBtn = document.getElementById("cancelBtn"),
  searchInp = document.getElementById("searchInp"),
  tBody = document.getElementById("tBody"),
  updateIndexNumber = "",
  bookmarkNameValue,
  bookmarkUrlValue;
//ANCHOR check local storage
if (localStorage.getItem("bookmarksListData") != null) {
  var bookmarksList = JSON.parse(localStorage.getItem("bookmarksListData"));
} else {
  var bookmarksList = [];
}
displayBookmarksList();
//ANCHOR add and update bookmark list item function
function addUpdateBookmarksListItem() {
  var bookmarkNameValue = bookmarkName.value;
  var bookmarkUrlValue = bookmarkUrl.value;
  if (bookmarkNameValue != "" && bookmarkUrlValue != "") {
    if (validatebookmarkName() && validatebookmarkUrl()) {
      if (addUpdateBtn.innerHTML == "Add Bookmark") {
        var bookmarksListItem = {
          bookmarksListItemName: bookmarkName.value,
          bookmarksListItemUrl: bookmarkUrl.value
        };
        bookmarksList.push(bookmarksListItem);
        localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
        displayBookmarksList();
        clearForm();
        clearbookmarkNameValidation();
        clearbookmarkUrlValidation();
        btnsAlert.classList.add("d-none");
      } else if (addUpdateBtn.innerHTML == "Update Bookmark") {
        bookmarksList[updateIndexNumber].bookmarksListItemName = bookmarkName.value;
        bookmarksList[updateIndexNumber].bookmarksListItemUrl = bookmarkUrl.value;
        localStorage.setItem("bookmarksListData", JSON.stringify(bookmarksList));
        displayBookmarksList();
        clearForm();
        clearbookmarkNameValidation();
        clearbookmarkUrlValidation();
        btnsAlert.classList.add("d-none");
        cancelBtn.classList.add("invisible");
        addUpdateBtn.innerHTML = "Add Bookmark";
      }
    }
  } else {
    btnsAlert.classList.remove("d-none");
  }
}
//ANCHOR clear add Update Btn validation function
function clearAddUpdateValidation() {
  btnsAlert.classList.add("d-none");
}
//ANCHOR connect add Update Btn with add Bookmarks List Item function
addUpdateBtn.addEventListener("click", addUpdateBookmarksListItem);
//ANCHOR connect add Update Btn with clear add Update Btn validation function
addUpdateBtn.addEventListener("blur", clearAddUpdateValidation);
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
}
//ANCHOR clear form function
function clearForm() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}
//ANCHOR cancel update Function
function cancelUpdate() {
  clearForm();
  cancelBtn.classList.add("invisible");
  addUpdateBtn.innerHTML = "Add Bookmark";

}
//ANCHOR connect cancel btn with cancel update function
cancelBtn.addEventListener("click", cancelUpdate);
//ANCHOR delete btns operation
document.addEventListener("click", function (e) {
  var deleteIndex;
  if (e.target.className.includes("deleteBtn") || e.target.className.includes("fa-trash-alt")) {
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
  if (e.target.className.includes("updateBtn") || e.target.className.includes("fa-edit")) {
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
//ANCHOR real time search function
searchInp.addEventListener("keyup", function () {
  var searchedWord = searchInp.value.toLowerCase();
  var trs = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    if (bookmarksList[i].bookmarksListItemName.toLowerCase().includes(searchedWord) && searchedWord !== "") {
      var text = bookmarksList[i].bookmarksListItemName;
      var regexText = new RegExp(searchedWord, "gi");
      console.log(regexText);
      var newText = text.replace(regexText, `<mark style="padding: 0; background-color: yellow;">${searchedWord}</mark>`);
      trs += `<tr><td>${i}</td>
        <td>${newText}</td>
        <td><a href="${bookmarksList[i].bookmarksListItemUrl}" target="_blank" class="btn btn-info"><i class="fas fa-external-link-alt"></i></a></td>
        <td><button class="btn btn-warning updateBtn"><i class="fas fa-edit"></i></button></td>
        <td><button class="btn btn-danger deleteBtn"><i class="far fa-trash-alt"></i></button></td>
        </tr>`;
    } else if (bookmarksList[i].bookmarksListItemName.toLowerCase().includes(searchedWord)) {
      trs += `<tr>
      <td>${i}</td>
      <td>${bookmarksList[i].bookmarksListItemName}</td>
      <td><a href="${bookmarksList[i].bookmarksListItemUrl}" target="_blank" class="btn btn-info"><i class="fas fa-external-link-alt"></i></a></td>
      <td><button class="btn btn-warning updateBtn"><i class="fas fa-edit"></i></button></td>
      <td><button class="btn btn-danger deleteBtn"><i class="far fa-trash-alt"></i></button></td>
      </tr>`;
    }
  }
  tBody.innerHTML = trs;
});
//ANCHOR validate bookmark Name function
function validatebookmarkName() {
  var bookmarkNameRegex = /^[A-Z][a-z ]{3,20}$/;
  bookmarkNameValue = bookmarkName.value;
  validatebookmarkNameRegex = bookmarkNameRegex.test(bookmarkNameValue);
  if (validatebookmarkNameRegex == true) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    bookmarkNameAlert.classList.add("d-none");
    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    bookmarkNameAlert.classList.remove("d-none");
    return false;
  }
}
//ANCHOR clear bookmark name validation function
function clearbookmarkNameValidation() {
  bookmarkNameValue = bookmarkName.value;
  if (bookmarkNameValue == "") {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");
    bookmarkNameAlert.classList.add("d-none");
    return true;
  }
}
//ANCHOR connect clear bookmark name validation function with bookmark name input
bookmarkName.addEventListener("keyup", validatebookmarkName);
//ANCHOR connect clear validate bookmark name function with bookmark name input
bookmarkName.addEventListener("blur", clearbookmarkNameValidation);
//ANCHOR validate bookmark url function
function validatebookmarkUrl() {
  var bookmarkUrlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  bookmarkUrlValue = bookmarkUrl.value;
  validatebookmarkUrlRegex = bookmarkUrlRegex.test(bookmarkUrlValue);
  if (validatebookmarkUrlRegex == true) {
    bookmarkUrl.classList.add("is-valid");
    bookmarkUrl.classList.remove("is-invalid");
    bookmarkUrlAlert.classList.add("d-none");
    return true;
  } else {
    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.add("is-invalid");
    bookmarkUrlAlert.classList.remove("d-none");
    return false;
  }
}
//ANCHOR clear bookmark url validation function
function clearbookmarkUrlValidation() {
  bookmarkUrlValue = bookmarkUrl.value;
  if (bookmarkUrlValue == "") {
    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-invalid");
    bookmarkUrlAlert.classList.add("d-none");
    return true;
  }
}
//ANCHOR connect clear bookmark url validation function with bookmark url input
bookmarkUrl.addEventListener("keyup", validatebookmarkUrl);
//ANCHOR connect clear validate bookmark url function with bookmark url input
bookmarkUrl.addEventListener("blur", clearbookmarkUrlValidation);