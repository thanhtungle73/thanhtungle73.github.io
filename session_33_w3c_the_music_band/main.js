const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slides = $$(".slider");
const modal = $(".modal");
const buyBtns = $$(".place-buy-btn");
const closeBtn = $(".modal-icon-container");
const payBtn = $(".pay-btn");
const modalInput = $$(".modal-input");
const warningMsg = $(".warning-msg");
const modalContainer = $(".modal-container");
const sendBtn = $(".contact-send-btn");

const app = {
  currentIndex: 0,

  currentSendInputIndex: 0,

  resetImg: function () {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  },

  slideShow: function () {
    const maxLength = slides.length;
    const _this = this;
    this.resetImg();
    if (this.currentIndex > maxLength - 1) {
      this.currentIndex = 0;
    }

    this.currentIndex++;

    slides[this.currentIndex - 1].style.display = "block";
    setTimeout(function () {
      _this.slideShow();
    }, 3000);
  },

  handleEvent: function () {
    const _this = this;

    //Handle when click Buy Tickets button
    buyBtns.forEach((element) => {
      element.onclick = function (e) {
        e.preventDefault();

        _this.resetModal();

        modal.style.display = "flex";
      };
    });

    //Handle when click close ticket modal
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    //Handel to stopPropagation of modal
    modalContainer.onclick = function (e) {
      e.stopPropagation();
    };

    //Handel when click out side the model
    modal.onclick = function (e) {
      modal.style.display = "none";
    };

    //Handle check full fill value when click pay btn
    payBtn.onclick = function () {
      let inputValue = Array.from(modalInput).every((e) => {
        return e.value;
      });

      if (!inputValue) {
        warningMsg.style.visibility = "visible";
      } else {
        _this.resetModal();
      }
    };
    
   /*  //Handle when clicking send btn
    sendBtn.onclick = function (e) {
      //Ngan su kien noi bot tu the nay khi co element cha dang lang nghe
      e.stopPropagation();

      _this.resetContactFormPopup();

      let isValue = Array.from(contactInput).every(function (e, index) {
        if (!e.value) {
          _this.currentSendInputIndex = index;
        }
        return e.value;
      });

      if (!isValue) {
        popup[_this.currentSendInputIndex].style.display = "block";
      } else {
      }
    };

    //Handle when clicking outside to close the popup
    main.onclick = function () {
      Array.from(contactInput).forEach(function (element) {
        element.onclick = function (e) {
          //Chan su kien noi bot khi lang nghe su kien o the cha
          e.stopPropagation();
        };
      });

      _this.resetContactFormPopup();
    }; */
  },

  resetModal: function () {
    warningMsg.style.visibility = "hidden";
    Array.from(modalInput).forEach((e) => {
      e.value = "";
    });
  },

  resetContactFormPopup: function () {
    Array.from(popup).forEach(function (e) {
      e.style.display = "none";
    });
  },

  start: function () {
    this.slideShow();

    this.handleEvent();
  },
};

app.start();
