document.querySelector(".footer_button").addEventListener("click", () => {
  document.querySelector(".form_signin-active").classList.add("form_signin");
  document.querySelector(".form_signup").classList.add("form_signup-active");
});
document.getElementById("btnSignIn").addEventListener("click", () => {
  document.querySelector(".form_signin-active").classList.remove("form_signin");
  document.querySelector(".form_signup").classList.remove("form_signup-active");
});

/*Вывод значений input в соседний блок
let btnSignIn = document.getElementById("signIn");

btnSignIn.addEventListener("click", outputSignIn);
function outputSignIn() {
  let login = document.getElementById("login");
  let outputLog = document.getElementById("outputLog");
  outputLog.textContent = login.value;

  let password = document.getElementById("password");
  let outputPass = document.getElementById("outputPass");
  outputPass.textContent = password.value;
}

let btnSignUp = document.getElementById("signUp");
btnSignUp.addEventListener("click", outputSignUp);

function outputSignUp() {
  let login = document.getElementById("login2");
  let outputLog = document.getElementById("outputLog2");
  outputLog.textContent = login.value;

  let mail = document.getElementById("mail");
  let outputMail = document.getElementById("outputMail");
  outputMail.textContent = mail.value;

  let password = document.getElementById("password2");
  let outputPass = document.getElementById("outputPass2");
  outputPass.textContent = password.value;

  let password2 = document.getElementById("passwordRepeat");
  let outputRepPass = document.getElementById("outputRepPass");
  outputRepPass.textContent = password2.value;

  let outputPolicy = document.getElementById("outputPolicy");
  if (document.getElementById("policy").checked) {
    outputPolicy.textContent = "Checkbox is pressed";
  } else {
    outputPolicy.textContent = "Checkbox is not pressed";
  }
}*/

/*Подключение библиотеки i18n*/
import ru from "../src/ru.js";
import en from "../src/en.js";

const signinLanguageSelector = document.getElementById(
  "signin-language-selector"
);
const signupLanguageSelector = document.getElementById(
  "signup-language-selector"
);

const signinOutput = (err, t) => {
  if (err) {
    return console.log("something went wrong loading", err);
  }
  document.querySelector(".form_signin_title").innerHTML = t("signinHeader");
  document.querySelector(".form_signin_main_login").placeholder =
    t("signinLogin");
  document.querySelector(".form_signin_main_password").placeholder =
    t("signinPassword");
  document.querySelector(".form_signin_main_button").innerHTML =
    t("signinButton");
  document.querySelector(".footer_suggestion").innerHTML =
    t("signinSuggestion");
  document.querySelector(".footer_button").innerHTML = t("signinFooterBtn");
};

const signupOutput = (err, t) => {
  if (err) {
    return console.log("something went wrong loading", err);
  }
  document.querySelector(".form_signup_title").innerHTML = t("signupHeader");
  document.querySelector(".form_signup_main_FLN").placeholder =
    t("signupFLN");
  document.querySelector(".form_signup_main_login").placeholder =
    t("signupLogin");
  document.querySelector(".form_signup_main_email").placeholder =
    t("signupMail");
  document.querySelector(".form_signup_main_password").placeholder =
    t("signupPassword");
  document.querySelector(".form_signup_main_password_repeat").placeholder = t(
    "signupPasswordRepeat"
  );
  document.querySelector(".policy").innerHTML = t("signupPolicy");
  document.querySelector(".mailing").innerHTML = t("signupMailing");
  document.querySelector(".form_signup_main_button").innerHTML =
    t("signupButton");
    
  document.getElementById("btnSignIn").innerHTML = t("signupFooterBtn");
};
i18next.init({
  lng: "en",
  fallbackLng: ["en", "ru"],
  resources: {
    en,
    ru,
  },
  signinOutput,
  signupOutput,
});

signinLanguageSelector.addEventListener("change", (event) => {
  const lang = i18next.language === "en" ? "ru" : "en";
  i18next.changeLanguage(lang, signinOutput);
});

signupLanguageSelector.addEventListener("change", (event) => {
  const lang = i18next.language === "en" ? "ru" : "en";
  i18next.changeLanguage(lang, signupOutput);
});

// Валидация полей ввода
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll('.error');
const btnSignIn = document.getElementById("signIn");
const btnSignUp = document.getElementById("signUp");
const required = ["email", "password", "name", "passwordRepeat"];

btnSignIn.addEventListener("click", validation);
btnSignUp.addEventListener("click", validation);
function validation(e) {
  let data = {};
  e.preventDefault();
  errors.forEach(function(item) {
    item.classList.add("hide");
  })
  let error = false;
  inputs.forEach(function (el) {
    let tempName = el.getAttribute("name");
    if (tempName != null) {
      el.style.borderColor = "rgb(131, 179, 164)";
      if (el.value.length == 0 && required.includes(tempName)) {
        addError(el, "Required Field", tempName);
        error = true;
      }
      if (tempName == "name") {
        let exp = /([A-Za-z-\s])+/;   //Поскольку форма на английском, проверка на латинские буквы, а не на кириллицу
        let result = exp.test(el.value);
        if (!result){
          addError(el, "Invalid characters. Only letters, hyphen or whitespaces", tempName);
          error = true;
        }
        if (el.value.length < 4) {
          addError(el, "Needs to be more characters", tempName);
          error = true;
        }
      }
      if (tempName == "email") {
        let exp = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+)\w+/;
        let result = exp.test(el.value);
        if (!result){
          addError(el, "Invalid Email", tempName);
          error = true;
        }
      }
      if (tempName == "password") {
        let exp = /[A-Za-z0-9]+$/;
        let result = exp.test(el.value);
        if (!result){
          addError(el, "Only numbers and Letters", tempName);
          error = true;
        }
        if (el.value.length < 4) {
          addError(el, "Needs to be more then 3 characters", tempName);
          error = true;
        }
      }
      let pass = document.getElementById('password2').value;
      console.log(pass)
      if (tempName == "passwordRepeat") {
        if (el.value != pass) {
          console.log(pass)
          addError(el, "Passwords don't match", tempName);
          error = true;
        }
      }
      
      data[tempName] = el.value;
    }
  })
  if (!error) {
    document.querySelector(".form_signin_main").submit();
  }
}

function addError(el, mes) {
  let temp = el.nextElementSibling;
  temp.classList.remove("hide");
  temp.textContent = mes;
  el.style.borderColor = "red";
  el.focus();
}