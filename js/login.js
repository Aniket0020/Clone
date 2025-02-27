// login

// Get the elements
const loginPage = document.getElementById("loginPage");
const otpPage = document.getElementById("otpPage");
const signupPage = document.getElementById("signupPage");
const mobileInput = document.getElementById("mobileNumber");
const errorMsg = document.getElementById("errorMsg");
const requestOtpBtn = document.getElementById("requestOtp");
const otpInputs = document.getElementById("otpInputs");
const verifyOtpBtn = document.getElementById("verifyOtp");
const resendTimer = document.getElementById("resendTimer");
const changeNumberLink = document.getElementById("changeNumber");
const enteredNumber = document.getElementById("enteredNumber");
const createAccountLink = document.getElementById("createAccount");
const existingUserLink = document.getElementById("existingUser");

let otpTimeout;
let countdownTimer = 30;

// Handle OTP Request Button
requestOtpBtn.addEventListener("click", function () {
  const mobileNumber = mobileInput.value.trim();
  if (!mobileNumber) {
    errorMsg.textContent = "Please enter a valid email/mobile number.";
    return;
  }

  // Clear any previous error messages
  errorMsg.textContent = "";

  // Simulating sending OTP
  enteredNumber.textContent = mobileNumber;
  loginPage.classList.add("hidden");
  otpPage.classList.remove("hidden");

  // Start OTP resend countdown
  otpTimeout = setInterval(function () {
    if (countdownTimer === 0) {
      clearInterval(otpTimeout);
      resendTimer.textContent = "Resend OTP";
      resendTimer.style.cursor = "pointer"; // Make it clickable again
    } else {
      resendTimer.textContent = `00:${
        countdownTimer < 10 ? "0" : ""
      }${countdownTimer}`;
      countdownTimer--;
    }
  }, 1000);
});

// Handle OTP Verification
verifyOtpBtn.addEventListener("click", function () {
  const otp = Array.from(otpInputs.getElementsByTagName("input"))
    .map((input) => input.value)
    .join("");
  if (otp.length === 6) {
    // You can redirect to another page or do further processing here
    window.location.href = "index.html";
  } else {
    alert("Please enter all OTP digits.");
  }
});

// Handle Change Mobile Number
changeNumberLink.addEventListener("click", function () {
  otpPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
  countdownTimer = 30; // Reset the timer
  resendTimer.textContent = "00:30";
  clearInterval(otpTimeout);
});

// Handle Create Account (Go to Signup Page)
createAccountLink.addEventListener("click", function () {
  loginPage.classList.add("hidden");
  signupPage.classList.remove("hidden");
});

// Handle Existing User (Go back to Login Page)
existingUserLink.addEventListener("click", function () {
  signupPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
});

// Handle OTP Inputs (Auto move to next field)
otpInputs.addEventListener("input", function (e) {
  const target = e.target;
  if (target.tagName === "INPUT" && target.value.length === 1) {
    let nextInput = target.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  }
});

// Handle OTP Inputs (Go back to previous field when deleting)
otpInputs.addEventListener("keydown", function (e) {
  const target = e.target;
  if (e.key === "Backspace" && target.value === "") {
    let prevInput = target.previousElementSibling;
    if (prevInput) {
      prevInput.focus();
    }
  }
});
