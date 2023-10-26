document.addEventListener("input", validate);
document.addEventListener("submit", signup);

let isFirstNameValid = false, isLastNameValid = false, isSexSelected=false, isDoBSelected=false, isEmailValid=false;
let isPhoneValid = false, isPasswordValid=false, isPasswordMatched = false;


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

function validate(e) {
  console.log(e.target.id);
  const id = e.target.id;
  const regExName = /^[a-zA-Z]{3,10}$/;
  const regExEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
  //const regExPhone = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/;
  const regExPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  switch(id){
    case "password":
      let feedbackPassword = document.getElementById("feedback-password");
      let progressBar = document.getElementById("progress-bar");
      let progress = document.getElementById("progress");
      let passwordStrength = document.getElementById("passwordStrength");
    
      let password = document.getElementById("password");
      let alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      let lowercaseRegex = /[a-z]/g;
      let uppercaseRegex = /[A-Z]/g;
      let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;
      isPasswordValid=false;
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
            isPasswordValid=true;
          }
      }
      break;
    case "confirmPassword":
      let feedbackConfirmPassword = document.getElementById("feedback-confirmPassword");
      let confirmPassword = document.getElementById("confirmPassword");
      feedbackConfirmPassword.classList.remove("invalid-feedback");
      confirmPassword.classList.remove("is-invalid");
      feedbackConfirmPassword.innerHTML = "";
    case "firstName":
      let firstName = document.getElementById("firstName");
      let feedbackFirstname = document.getElementById("feedback-firstname");
      if(!regExName.test(firstName.value)){
        showError(firstName, feedbackFirstname, "First Name is invalid");
        isFirstNameValid = false;
      }else{
        showSuccess(firstName, feedbackFirstname, "");
        isFirstNameValid = true;
      }
      break;
    case "lastName":
      let lastName = document.getElementById("lastName");
      let feedbacklastname = document.getElementById("feedback-lastname");
      if(!regExName.test(lastName.value)){
        showError(lastName, feedbacklastname, "Last Name is invalid");
        isLastNameValid = false;
      }else{
        showSuccess(lastName, feedbacklastname, "");
        isLastNameValid = true;
      }
      break;
    case "dob":
      let dob = document.getElementById("dob");
      let feedbackdob = document.getElementById("feedback-dob");
      if(dob ==null || dob ==""){
        showError(dob, feedbackdob, "Date of Birth is invalid");
        isDoBSelected = false;
      }else{
        showSuccess(dob, feedbackdob, "");
        isDoBSelected = true;
      }
      break;

    case "email":
      let email = document.getElementById("email");
      let feedbackemail = document.getElementById("feedback-email");
      if(!regExEmail.test(email.value)){
        showError(email, feedbackemail, "Email is invalid");
        isEmailValid=false;
      }else{
        showSuccess(email, feedbackemail, "");
        isEmailValid=true;
      }
      break;
    case "phone": //check again
      let phone = document.getElementById("phone");
      let feedbackphone = document.getElementById("feedback-phone");
      console.log("phone "+ phone.value);
      if(!regExPhone.test(phone.value)){
        showError(phone, feedbackphone, "Phone number is invalid");
        isPhoneValid = false;
      }else{
        console.log("phone regex matches");
        showSuccess(phone, feedbackphone, "");
        isPhoneValid = true;
      }
      break;
  }

  if(document.getElementById("male").checked || document.getElementById("female").checked || document.getElementById("other").checked){
    document.getElementById("female").classList.remove("is-invalid");
    document.getElementById("male").classList.remove("is-invalid");
    document.getElementById("other").classList.remove("is-invalid");
    document.getElementById("feedback-sex").classList.remove("invalid-feedback");
    document.getElementById("feedback-sex").style.display="none";
    document.getElementById("feedback-sex").innerHTML = "";
  }
 
}

function signup(e){
  //check if all field values are entered and confirm password 
  e.preventDefault();
  let password = document.getElementById("password");
  let feedbackConfirmPassword = document.getElementById("feedback-confirmPassword");
  let confirmPassword = document.getElementById("confirmPassword");
  isPasswordMatched = false;
  if(password.value == confirmPassword.value){
    isPasswordMatched = true;
  }


  isSexSelected = (document.getElementById("male").checked || document.getElementById("female").checked || document.getElementById("other").checked)? true:false;

  if(!isFirstNameValid){
    showError(document.getElementById("firstName"), document.getElementById("feedback-firstname"), "First Name is invalid");
  }
  if(!isLastNameValid){
    showError(document.getElementById("lastName"), document.getElementById("feedback-lastname"), "Last Name is invalid");
  }
  if(!isSexSelected){
    document.getElementById("female").classList.add("is-invalid");
    document.getElementById("male").classList.add("is-invalid");
    document.getElementById("other").classList.add("is-invalid");

    document.getElementById("feedback-sex").classList.add("invalid-feedback");
    document.getElementById("feedback-sex").style.display="block";
    document.getElementById("feedback-sex").innerHTML = "Please select an option";
  }
  if(!isDoBSelected){
    showError(document.getElementById("dob"), document.getElementById("feedback-dob"), "Date of Birth is invalid");
  }
  if(!isEmailValid){
    showError(document.getElementById("email"), document.getElementById("feedback-email"), "Email is invalid");
  }
  if(!isPhoneValid){
    showError(document.getElementById("phone"), document.getElementById("feedback-phone"), "Phone number is invalid");
  }
  if(!isPasswordValid){
    showError(document.getElementById("password"), document.getElementById("feedback-password"), "Password is invalid");
  }
  if(confirmPassword.value == "" || confirmPassword.value == null){
    showError(confirmPassword, feedbackConfirmPassword, "Password is invalid");
  }

  if(isFirstNameValid && isLastNameValid && isSexSelected && isDoBSelected && isEmailValid &&
    isPhoneValid && isPasswordValid ){
      if(!isPasswordMatched){
        showError(confirmPassword, feedbackConfirmPassword, "Password doesn't match");
      }else{
        alert("Sign up success!!");
       }
   }
    
}
