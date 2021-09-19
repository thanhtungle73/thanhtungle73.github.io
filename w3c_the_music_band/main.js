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
const navListItems = $$("#nav > li > a");
const subnavListItems = $$(".subnav > li");
const subnav = $(".subnav");
const contactModalMsg = $(".contact-modal-value");

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
    let toggleSub = true;

    const toggleSubMenu = function () {
      if (toggleSub) {
        subnav.style.display = "block";
      } else {
        subnav.style.display = "none";
      }
      toggleSub = !toggleSub;
    };

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

    //handle check full fill and valid value when clicking pay btn
    payBtn.onclick = function () {
      let inputValidValue = Array.from(modalInput).every((e) => {
        return e.checkValidity();
      });

      if (inputValidValue) {
        _this.resetModal();
      } else {
        warningMsg.style.visibility = "visible";
      }
    };

    //handle when clicking send contact button
    sendBtn.onclick = function (e) {
      let hasValidValue = Array.from(contactInputs).every(function (element) {
        return element.checkValidity();
      });

      if (hasValidValue) {
        e.preventDefault();
        contactModal.style.display = "flex";
        Array.from(contactInputs).forEach(function (element) {
          if (element.getAttribute("placeholder") === "Message") {
            contactModalMsg.innerText = element.value;
          }
          return (element.value = "");
        });
      }
    };

    //handle when clicking close contact popup btn
    contactCloseBtn.onclick = function () {
      contactModal.style.display = "none";
    };

    /* Mobile responsive*/
    //handle when clicking mobile menu icon
    mobileMenuBtn.onclick = function () {
      subnav.style.display = "none";
      header.classList.toggle("activeMenuBtn");
      toggleSub = true;
    };

    //handle when clicking menu items
    Array.from(navListItems).forEach(function (element, index) {
      navListItems[index].onclick = function (e) {
        const isParent =
          e.target.nextElementSibling &&
          e.target.nextElementSibling.classList.contains("subnav");

        //Handle and check is parent menu
        if (isParent) {
          toggleSubMenu();
          e.preventDefault();
        } else {
          header.classList.remove("activeMenuBtn");
        }
      };
    });

    //handle when clicking sub menu
    Array.from(subnavListItems).forEach(function (element) {
      element.onclick = function (e) {
        header.classList.remove("activeMenuBtn");
      };
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
