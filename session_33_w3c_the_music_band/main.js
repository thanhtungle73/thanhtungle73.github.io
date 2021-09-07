const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slides = $$(".slider");

const app = {
  currentIndex: 0,

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

  start: function () {
    this.slideShow();
  },
};

app.start();
