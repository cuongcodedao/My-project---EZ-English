
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
    showCoupleWordInSlide(flashcards, flashcards.length); 
    englishWordInput.value = "";
    vietnameseWordInput.value = "";
  }
});


// Hàm hiển thị flashcards trong slide và gọi callback khi hoàn thành

function showFlashcardsInSlide(flashcards, callback) {
  var listWordAddedWrap = document.querySelector('.list_word_added_wrap');
  for (var i = 0; i < flashcards.length; i++) {
    var flashcard = flashcards[i];
    var flashcardElement = document.createElement("div");
    var coupleWordElement = document.createElement("div");
    coupleWordElement.classList.add("coupleWordElement_wrap");
    flashcardElement.classList.add("flashcard_wrap");
    if (i === 0) {
      flashcardElement.classList.add("active");
    }
    flashcardElement.innerHTML = `
        <div class="slide_item_flashcard active term">
              ${flashcard.term}
              <i class="fa-solid fa-volume-high slide_item_flashcard_icon"></i>
        </div>
        <div class="slide_item_flashcard definition">
              ${flashcard.definition}
              <i class="fa-solid fa-volume-high slide_item_flashcard_icon"></i>
        </div>
        `;
    coupleWordElement.innerHTML = `
        <div class="box_word">
              <i class="fa-solid fa-pen penOfWord_left"></i>
              ${flashcard.term}
        </div>
        <div class="box_word">
              ${flashcard.definition}
              <i class="fa-solid fa-pen penOfWord_right"></i>
        </div>
        `;
    flashcardSlide.appendChild(flashcardElement);
    listWordAddedWrap.appendChild(coupleWordElement);
  }

  if (typeof callback === "function") {
    // Gọi callback sau khi flashcards được hiển thị trong slide
    setTimeout(callback, 0);
  }
}

function showCoupleWordInSlide(flashcards, indexCurrent) {
  var listWordAddedWrap = document.querySelector('.list_word_added_wrap');
    var flashcard = flashcards[indexCurrent-1];
    var coupleWordElement = document.createElement("div");
    coupleWordElement.classList.add("coupleWordElement_wrap");
    coupleWordElement.innerHTML = `
        <div class="box_word">
              <i class="fa-solid fa-pen penOfWord_left"></i>
              ${flashcard.term}
        </div>
        <div class="box_word">
              ${flashcard.definition}
              <i class="fa-solid fa-pen penOfWord_right"></i>
        </div>
        `;
    listWordAddedWrap.appendChild(coupleWordElement);
}

function soundForWord(){
  var clickBell = document.querySelectorAll('.slide_item_flashcard_icon');
  clickBell.forEach(bell => {
      bell.addEventListener('click', function(event){
        const speech = new SpeechSynthesisUtterance();
        speech.text = document.querySelector('.flashcard_wrap.active').querySelector('.slide_item_flashcard.active').textContent;
        speech.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
        // Replace 'en-US' with the language code of the desired voice

        // Optional: Set additional properties
        speech.volume = 1;    // Volume range: 0 to 1
        speech.rate = 1;      // Speed rate range: 0.1 to 10
        speech.pitch = 2;     // Pitch range: 0 to 2
        window.speechSynthesis.speak(speech);
        event.stopPropagation();
      });
  });
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

//Xử lý không bấm được chuyển page
function Inuseal(index, length){
  if(length==1){
    var backInuseal = document.querySelector('.shiftingSlide_item.back');
      backInuseal.classList.add('inuseal');
    var nextInuseal = document.querySelector('.shiftingSlide_item.next');
    nextInuseal.classList.add('inuseal');
  }
  else{
    if(index==0){
      var backInuseal = document.querySelector('.shiftingSlide_item.back');
      backInuseal.classList.add('inuseal');
    }
    if(index==1){
        var backInuseal = document.querySelector('.shiftingSlide_item.back.inuseal');
        if(backInuseal!=null) backInuseal.classList.remove('inuseal');
    }
    if(index==length-1){
      var nextInuseal = document.querySelector('.shiftingSlide_item.next');
      nextInuseal.classList.add('inuseal');
   }
    else if(index==length-2){
    var nextInuseal = document.querySelector('.shiftingSlide_item.next.inuseal');
    if(nextInuseal!=null) nextInuseal.classList.remove('inuseal');
   }
  }
}

//GetPageFlashcard 

function getPageFlashcard(indexPage, maxPage){
    var getFageHTML = document.querySelector('.page_flashcard');
    getFageHTML.innerHTML = `<span> ${indexPage+1}/${maxPage} </span>`;
}

//Chuyển đổi pageFlashcard
function ShiftingSlideFunction(){
  var shiftingSlides = document.querySelectorAll('.shiftingSlide_item');
  var index = 0;
  HanderAllFlashcard();
  var flashcards = getFlashcardsFromLocalStorage();
  Inuseal(0, flashcards.length);
  getPageFlashcard(0, flashcards.length);
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
            else{
              index--;
            }
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
      getPageFlashcard(index, flashcards.length);
      Inuseal(index, flashcards.length);
    });
}); 
}
function reload(){
  location.reload();
 }
function resetLocalStorage(reload) {
  localStorage.removeItem("flashcards");
}
 var reloadBtn = document.querySelector('.add_word_submit.comfirm');
 reloadBtn.addEventListener('click', reload);
 var deleteAllBtn = document.querySelector('.add_word_submit.delete_all');
 deleteAllBtn.addEventListener('click', function(){
  resetLocalStorage();
  reload();
 });
document.addEventListener("DOMContentLoaded", function() {
  var flashcards = getFlashcardsFromLocalStorage();
  showFlashcardsInSlide(flashcards, function() {
    soundForWord();
    ShiftingSlideFunction();
  });
});

// Hoc tu
var mark = [];
for(var i =0;i<100;i++){
  mark.push(i);
  mark[i]=0;
}
var indextest = 0;
var indexP = 1;
function learnActive(){
  var getLearnBtn = document.querySelector('.method_learn_item.learn');
  var getAnswerBtns = document.querySelectorAll('.card_answer_item');
  var key;
  var flashcards = getFlashcardsFromLocalStorage();
  document.querySelector('.progressLearn').setAttribute('max', flashcards.length);
  function showLearnTest(){
    var array = [];
    for(var i=0;i<flashcards.length;i++){
      array.push(i);
    }
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    do {
      shuffleArray(array);
      if(mark[array[0]]==0){
        indextest++;
        mark[array[0]]=1;
        break;
      }
    }while(indextest<flashcards.length);
    var array1 = array.slice(0, 4);
    shuffleArray(array1);
    key = flashcards[array[0]].definition;
    document.querySelector('.description_question').textContent = `${flashcards[array[0]].term}`;
    document.querySelector('.card_answer_item.a1').textContent = `${flashcards[array1[0]].definition}`;
    document.querySelector('.card_answer_item.a2').textContent = `${flashcards[array1[1]].definition}`;
    document.querySelector('.card_answer_item.a3').textContent = `${flashcards[array1[2]].definition}`;
    document.querySelector('.card_answer_item.a4').textContent = `${flashcards[array1[3]].definition}`;
  };
  getLearnBtn.addEventListener('click', showLearnTest);
  getAnswerBtns.forEach((answerBtn, index) => {
    answerBtn.addEventListener("click", function(){  
      var getActiveAnswer = document.querySelector('.incorrect');
      var getNoticeStatus = document.querySelector('.noticeStatus');
      getNoticeStatus.classList.add('active');
      if(getActiveAnswer != null) getActiveAnswer.classList.remove('incorrect');
      if(answerBtn.textContent == key) {
        document.body.style.pointerEvents = 'none';
        function myFunction() {
          document.querySelector(".progressLearn").value = indexP;    
          indexP++;                                   
        }
        myFunction();
        answerBtn.classList.add('correct');
        getNoticeStatus.textContent = 'Exactly';
        if(indexP!=flashcards.length+1){
          setTimeout(handler =>{
            document.body.style.pointerEvents = 'auto';
            answerBtn.classList.remove('correct');
            getNoticeStatus.textContent = '';
            getNoticeStatus.classList.remove('active');
            showLearnTest()
          }, 1000);
        }
        else{
          document.body.style.pointerEvents = 'auto';
          setTimeout(handler =>{
            document.querySelector('.modalLearnAgain').classList.add('active');
          }, 1500);
          var learnAgainBtn = document.querySelector('.button_modalLearnAgain');
          learnAgainBtn.addEventListener('click', function(){
            indexP=0;
            myFunction();
            document.querySelector('.progressLearn').setAttribute('value', 0);
            getNoticeStatus.classList.remove('active');
            answerBtn.classList.remove('correct');
            document.querySelector('.modalLearnAgain').classList.remove('active');
            showLearnTest();
          });
        }
      }
      else{
        getNoticeStatus.textContent = 'Answer Again';
        answerBtn.classList.add('incorrect');
        setTimeout(handler =>{
          getNoticeStatus.classList.remove('active');
        }, 1200);
      }
    });
  });
}
learnActive();
