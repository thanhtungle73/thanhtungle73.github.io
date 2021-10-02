const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const modal = $(".modal");
const modalBody = $(".modal__body");
const authForms = $$(".auth-form");
const registerModalForm = $(".auth-form.register-form");
const loginModalForm = $(".auth-form.login-form");
const navBarRegister = $(".header__navbar-register");
const navBarLogin = $(".header__navbar-login");
const closeModalFormBtn = $$(".auth-form__closeBtn");
const authFormLoginLink = $(".auth-form__help-login");
const authFormRegisterLink = $(".auth-form__help-register");
const authFormRegisterInput = $(".auth-form__input-js");
const authFormRegisterBtn = $(".auth-form__input-btn-js");

const app = {
  handleEvents: function () {
    const _this = this;

    //handle when click register menu
    navBarRegister.onclick = function () {
      _this.resetAuthForm();
      modal.style.display = "flex";
      registerModalForm.classList.add("active-form");
    };

    //handle when click login menu
    navBarLogin.onclick = function () {
      _this.resetAuthForm();
      modal.style.display = "flex";
      loginModalForm.classList.add("active-form");
    };

    //handle when click close form btn
    Array.from(closeModalFormBtn).forEach(function (e) {
      e.onclick = function () {
        _this.resetAuthForm();
      };
    });

    //handle when click outside modal form
    modalBody.onclick = function (e) {
        e.stopPropagation();
    };

    modal.onclick = function () {
        _this.resetAuthForm();
    };

    //handle when click login link in register form
    authFormLoginLink.onclick = function () {
        registerModalForm.classList.remove("active-form");
        loginModalForm.classList.add("active-form");
    }

    //handle when click register in login form
    authFormRegisterLink.onclick = function () {
        loginModalForm.classList.remove("active-form");
        registerModalForm.classList.add("active-form");
    }

    //validate register form phone number equal 10 number & first number is 0
    authFormRegisterInput.oninput = function (e) {
        if(e.target.value.length == 10 && e.target.value[0] == 0) {
            authFormRegisterBtn.style.backgroundColor = "rgb(238, 77, 45)";
            authFormRegisterBtn.style.cursor = "pointer";
        }else {
            authFormRegisterBtn.style.backgroundColor = "";
            authFormRegisterBtn.style.cursor = "";
        }
    }
  },

  resetAuthForm: function () {
    modal.style.display = "none";
    registerModalForm.classList.remove("active-form");
    loginModalForm.classList.remove("active-form");
  },

  start: function () {
    this.handleEvents();
  },
};

app.start();
