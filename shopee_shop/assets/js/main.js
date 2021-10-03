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
const authFormRegisterBtn = $(".register-form .auth-form__input-btn-js");
const authFormRegisterValidateMsg = $(".auth-form__inputs-msg");
const authFormLoginInputs = $$(".login-form .auth-form__input-js");
const authFormLoginBtn = $(".login-form .auth-form__input-btn-js");
const authFormPwIcon = $(".auth-form__password-icon");

const app = {
  handleEvents: function () {
    const _this = this;

    //validate message hide and active btn
    const activeRegisterModalBtn = function () {
      authFormRegisterBtn.classList.add("auth-form__input--active");
      authFormLoginBtn.classList.add("auth-form__input--active");
      authFormRegisterBtn.removeAttribute("disabled");
      authFormLoginBtn.removeAttribute("disabled");
      authFormRegisterInput.classList.remove("auth-form__input--validate");
      authFormRegisterValidateMsg.style.visibility = "";
    };

    //validate message show and disable btn
    const disableRegisterModalBtn = function () {
      authFormRegisterBtn.classList.remove("auth-form__input--active");
      authFormLoginBtn.classList.remove("auth-form__input--active");
      authFormRegisterInput.classList.add("auth-form__input--validate");
      authFormRegisterValidateMsg.style.visibility = "visible";
    };

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
    };

    //handle when click register in login form
    authFormRegisterLink.onclick = function () {
      loginModalForm.classList.remove("active-form");
      registerModalForm.classList.add("active-form");
    };

    //validate register form phone number equal 10 number & first number is 0
    authFormRegisterInput.oninput = function (e) {
      if (e.target.value.length == 10 && e.target.value[0] == 0) {
        activeRegisterModalBtn();
      } else {
        disableRegisterModalBtn();
      }
    };

    //handle limit 16 character of password in Modal Login form
    Array.from(authFormLoginInputs).forEach(function (element) {
      element.oninput = function () {
        const hasFullLoginValue = Array.from(authFormLoginInputs).every(
          function (element) {
            return element.value;
          }
        );

        if (hasFullLoginValue) {
          activeRegisterModalBtn();
        } else {
          disableRegisterModalBtn();
        }
      };
    });

    //handle when clicking show/hide authForm password login
    authFormPwIcon.onclick = function (e) {
      if (e.target.classList.contains("fa-eye-slash")) {
        e.target.classList.remove("fa-eye-slash");
        e.target.classList.add("fa-eye");
        e.target.previousElementSibling.type = "text";
      } else {
        e.target.classList.remove("fa-eye");
        e.target.classList.add("fa-eye-slash");
        e.target.previousElementSibling.type = "password";
      }
    };
  },

  resetAuthForm: function () {
    modal.style.display = "none";
    registerModalForm.classList.remove("active-form");
    loginModalForm.classList.remove("active-form");

    authFormRegisterInput.value = null;
    Array.from(authFormLoginInputs).forEach(function (element) {
      element.value = null;
    });

    authFormRegisterBtn.classList.remove("auth-form__input--active");
    authFormLoginBtn.classList.remove("auth-form__input--active");

    authFormRegisterValidateMsg.style.visibility = "";
    authFormRegisterInput.classList.remove("auth-form__input--validate");
  },

  start: function () {
    this.handleEvents();
  },
};

app.start();
