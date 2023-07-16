var courses = document.querySelectorAll(".body_course");
for(var course of courses){
    function subClass(){
        var modal = document.querySelector(".modal_course");
        modal.classList.remove('close');
    }
    course.addEventListener('click', subClass);
}
var methods = document.querySelectorAll('.method_learn_item');
var courses = document.querySelectorAll('.body_method');

methods.forEach((tab, id) => {
    const course = courses[id];
    tab.addEventListener('click', function() {
        document.querySelector('.body_method.active').classList.remove('active');
        document.querySelector('.method_learn_item.active').classList.remove('active');
        course.classList.add('active');
        tab.classList.add('active');
    })
});
var modal_close = document.querySelector('.modal_course');
function delete_modal(){
    modal_close.classList.add('close');
}
var modal_btn_close1 = document.querySelector('.modal_course_close');
var modal_btn_close2 = document.querySelector('.modal_course');
modal_btn_close1.addEventListener('click', delete_modal);
document.querySelector('.modal_course_container').addEventListener('click', function (event){
    event.stopPropagation();
});
modal_btn_close2.addEventListener('click', delete_modal);



// Slide in flashcards

function isLocalStorageSupported() {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return true;
    } catch (e) {
      return false;
    }
  }

function getFlashcardsFromLocalStorage() {
    var flashcardsJSON = localStorage.getItem("flashcards");
    if (flashcardsJSON) {
      return JSON.parse(flashcardsJSON);
    } else {
      return [];
    }
  }
  
  // Lưu danh sách flashcards vào localStorage
  function saveFlashcardsToLocalStorage(flashcards) {
    var flashcardsJSON = JSON.stringify(flashcards);
    localStorage.setItem("flashcards", flashcardsJSON);
  }
  
  // Gọi hàm để hiển thị flashcards trong slide khi trang web được tải
  // window.addEventListener("DOMContentLoaded", function() {
  //   var flashcards = getFlashcardsFromLocalStorage();
  //   showFlashcardsInSlide(flashcards);
  // });
  
// Lấy phần tử HTML cần sử dụng
var addWordButton = document.querySelector(".add_word_submit");
var flashcardSlide = document.querySelector(".flashcard_container");

// Sự kiện khi người dùng nhấp vào nút "ADD FLASHCARD"
addWordButton.addEventListener("click", function() {
  var englishWordInput = document.querySelector(".new_word.english input");
  var vietnameseWordInput = document.querySelector(".new_word.vietnamese input");

  var englishWord = englishWordInput.value.trim();
  var vietnameseWord = vietnameseWordInput.value.trim();

  if (englishWord !== "" && vietnameseWord !== "") {
    var flashcard = {
      term: englishWord,
      definition: vietnameseWord
    };

    var flashcards = getFlashcardsFromLocalStorage();
    flashcards.push(flashcard);
    saveFlashcardsToLocalStorage(flashcards);
    showFlashcardsInSlide(flashcards);

    englishWordInput.value = "";
    vietnameseWordInput.value = "";
  }
});


// Hàm hiển thị flashcards trong slide và gọi callback khi hoàn thành

function showFlashcardsInSlide(flashcards, callback) {
  // flashcardSlide.innerHTML="";
  for (var i = 0; i < flashcards.length; i++) {
    var flashcard = flashcards[i];
    var flashcardElement = document.createElement("div");
    flashcardElement.classList.add("flashcard_wrap");
    if (i === 0) {
      flashcardElement.classList.add("active");
    }
    flashcardElement.innerHTML = `
        <div class="slide_item_flashcard active term">${flashcard.term}</div>
        <div class="slide_item_flashcard definition">${flashcard.definition}</div>
        `;
    flashcardSlide.appendChild(flashcardElement);
  }

  if (typeof callback === "function") {
    // Gọi callback sau khi flashcards được hiển thị trong slide
    setTimeout(callback, 0);
  }
}

// Hàm lấy tất cả các flashcards từ slide
function HanderAllFlashcard() {
  var changeFlashcardSurface = document.querySelector('.flashcard_wrap.active');
  changeFlashcardSurface.addEventListener('click', function(event){
    var cards = changeFlashcardSurface.querySelectorAll('.slide_item_flashcard');
    cards.forEach(card =>{
      card.classList.toggle('active');
    });
    event.stopPropagation();
  });
}

// Xử lý sự kiện "DOMContentLoaded"
document.addEventListener("DOMContentLoaded", function() {
  var flashcards = getFlashcardsFromLocalStorage();
  showFlashcardsInSlide(flashcards, function() {
    ShiftingSlideFunction();
  });
});

// Hàm xóa toàn bộ flashcards trong localStorage
function resetLocalStorage() {
  localStorage.removeItem("flashcards");
}

// Gọi hàm để reset localStorage
// resetLocalStorage();

function ShiftingSlideFunction(){
  var shiftingSlides = document.querySelectorAll('.shiftingSlide_item');
  var index = 0;
  HanderAllFlashcard();
  var flashcards = getFlashcardsFromLocalStorage();
  shiftingSlides.forEach(slide => {
    slide.addEventListener('click', function(){
      var getSlide = document.querySelectorAll('.flashcard_wrap');
      var getSlideActive = document.querySelector('.flashcard_wrap.active');
      if(slide.classList.contains('next')){
          if(index>=0 && index<flashcards.length){
            HanderAllFlashcard();
            index++;
            if(index!=flashcards.length){
              getSlideActive.classList.remove('active');
              getSlide[index].classList.add('active');
            }
            else index--;
            HanderAllFlashcard();
          }
      }
      else{
          if(index>=0 && index<flashcards.length){
            HanderAllFlashcard();
            index--;
            if(index!=-1){
              getSlideActive.classList.remove('active');
              getSlide[index].classList.add('active');
            }
            else{
              index++;
            }
            HanderAllFlashcard();
          }
      }
    });
});
}



