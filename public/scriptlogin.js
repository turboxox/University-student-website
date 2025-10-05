const InputEmail = document.getElementById("email");
const InputPass = document.getElementById("password");
const SigninButtun = document.querySelector(".signin");

let RegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let RegexPassword = /^.{6,}$/;

SigninButtun.addEventListener("click", function (event) {
  const email = InputEmail.value.trim();
  const password = InputPass.value.trim();
  if (!RegexEmail.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
    });
    return;
  }

  if (!RegexPassword.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Password",
      text: "Pleas enter a valid password.",
    });
    return;
  }
});


const ShowIcon=document.getElementById("showicon");
const HideIcon = document.getElementById("hideicon");

ShowIcon.addEventListener("click",()=>{
  InputPass.type = "text";
  ShowIcon.classList.add("hidden");
  HideIcon.classList.remove("hidden");
});

HideIcon.addEventListener("click",()=>{
InputPass.type="password";
HideIcon.classList.add("hidden");
ShowIcon.classList.remove("hidden");
});

