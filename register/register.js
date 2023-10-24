document.addEventListener("input", validate);

function showSuccess(element, feedbackElement, message) {
  element.classList.remove("is-invalid");
  element.classList.add("is-valid");
  feedbackElement.classList.remove("invalid-feedback");
  feedbackElement.classList.add("valid-feedback");
  feedbackElement.innerHTML = message;
}

function showError(element, feedbackElement, message) {
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  feedbackElement.classList.remove("valid-feedback");
  feedbackElement.classList.add("invalid-feedback");
  feedbackElement.innerHTML = message;
}

function validate() {
  let feedbackPassword = document.getElementById("feedback-password");
  let progressBar = document.getElementById("progress-bar");
  let progress = document.getElementById("progress");
  let passwordStrength = document.getElementById("passwordStrength");

  let password = document.getElementById("password");
  let alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  let lowercaseRegex = /[a-z]/g;
  let uppercaseRegex = /[A-Z]/g;
  let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;

  if (password.value.length < 8) {
    showError(password, feedbackPassword, "Must conatin atleast 8 characters");
    progress.style.display = "flex";
    progressBar.style.width = "25%";
    progressBar.classList.add("bg-danger");
    passwordStrength.classList.add("text-danger");
    passwordStrength.innerHTML = "Weak";
  } else if (!alphanumeric.test(password.value)) {
    showError(password, feedbackPassword, "Try a mix of letters and numbers");
    progress.style.display = "flex";
    progressBar.style.width = "25%";
    progressBar.classList.add("bg-danger");
    passwordStrength.classList.add("text-danger");
    passwordStrength.innerHTML = "Weak";
  } else if (password.value.length >= 8 && alphanumeric.test(password.value)) {
    if (
      !(
        lowercaseRegex.test(password.value) &&
        uppercaseRegex.test(password.value) &&
        specialCharRegex.test(password.value)
      )
    ) {
      showError(
        password,
        feedbackPassword,
        "Your password must contain a combination of uppercase and lowercase letters, as well as at least one special character. Please ensure your password meets these requirements for enhanced security."
      );
      progress.style.display = "flex";
      progressBar.style.width = "65%";
      progressBar.classList.remove("bg-danger");
      progressBar.classList.add("bg-warning");
      passwordStrength.classList.remove("text-danger");
      passwordStrength.classList.add("text-warning");
      passwordStrength.innerHTML = "Medium";
    }
    else {
        showSuccess(password, feedbackPassword, "Looks good");
        progress.style.display = "flex";
        progressBar.style.width = "100%";
        progressBar.classList.remove("bg-danger");
        progressBar.classList.remove("bg-warning");
        progressBar.classList.add("bg-success");
        passwordStrength.classList.remove("text-danger");
        passwordStrength.classList.remove("text-warning");
        passwordStrength.classList.add("text-success");
        passwordStrength.innerHTML = "Strong";
      }
  }
}
