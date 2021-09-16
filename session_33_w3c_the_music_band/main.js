const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slides = $$(".slider");
const modal = $(".place-modal");
const buyBtns = $$(".place-buy-btn");
const closeBtn = $(".modal-icon-container");
const payBtn = $(".pay-btn");
const modalInput = $$(".modal-input");
const warningMsg = $(".warning-msg");
const modalContainer = $(".modal-container");
const sendBtn = $(".content-section button");
const contactCloseBtn = $(".contact-close-popup");
const contactModal = $(".contact-modal");
const contactInputs = $$(".contact-form-item");
const mobileMenuBtn = $(".mobile-menu-btn");
const header = $("#header");
const navListItems = $$("#nav > li");
const subnavListItems = $$('.subnav > li')

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

    //Handle when clicking Buy Tickets button
    buyBtns.forEach((element) => {
      element.onclick = function (e) {
        e.preventDefault();

        _this.resetModal();

        modal.style.display = "flex";
      };
    });

    //handle when clicking close ticket modal
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    //handle to stopPropagation of modal
    modalContainer.onclick = function (e) {
      e.stopPropagation();
    };

    //handle when clicking out side the modal
    modal.onclick = function () {
      modal.style.display = "none";
    };

    //handle check full fill value when clicking pay popup btn
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

    //handle when clicking send contact button
    sendBtn.onclick = function (e) {
      let hasValue = Array.from(contactInputs).every(function (element) {
        return element.value;
      });

      if (hasValue) {
        e.preventDefault();
        contactModal.style.display = "flex";
        Array.from(contactInputs).forEach(function (element) {
          return (element.value = "");
        });
      }
    };

    //handle when clicking close contact popup btn
    contactCloseBtn.onclick = function () {
      contactModal.style.display = "none";
    };

    /* Mobile responsive*/
    //Handle when clicking mobile menu icon
    mobileMenuBtn.onclick = function () {
      header.classList.toggle("activeMenuBtn");
    };

    //Handel when clicking menu items
    Array.from(navListItems).forEach(function (element, index) {
      if (index < navListItems.length - 1) {
        navListItems[index].onclick = function () {
          header.classList.remove("activeMenuBtn");
        };
      }
    });

    Array.from(subnavListItems).forEach(function (element) {
      element.onclick = function (e) {
        header.classList.remove("activeMenuBtn");
      }
    });
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
