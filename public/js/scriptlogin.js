const InputEmail = document.getElementById("email");
const InputPass = document.getElementById("password");
const SigninButton = document.querySelector(".signin");

let RegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let RegexPassword = /^.{6,}$/;

// Show/Hide Password Toggle
const ShowIcon = document.getElementById("showicon");
const HideIcon = document.getElementById("hideicon");

ShowIcon.addEventListener("click", () => {
  InputPass.type = "text";
  ShowIcon.classList.add("hidden");
  HideIcon.classList.remove("hidden");
});

HideIcon.addEventListener("click", () => {
  InputPass.type = "password";
  HideIcon.classList.add("hidden");
  ShowIcon.classList.remove("hidden");
});

// ==================== LOGIN FORM HANDLER ====================
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const email = InputEmail.value.trim();
    const password = InputPass.value.trim();
    const errorDiv = document.getElementById('error-message');
    
    errorDiv.style.display = 'none';
   
    //make sur the user enter an email and a passw
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
            text: "Password must be at least 6 characters long.",
        });
        return;
    }
    
    SigninButton.disabled = true;
    SigninButton.textContent = 'Signing in...';
    
    // SEND TO BACKEND
    try {
        const response = await fetch('../backend/auth/login.php', {
            method: 'POST',
            headers: {//telling php that we are sending json data
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //convert the email and password to A json
                email: email, 
                password: password 
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome back, ${data.user.full_name}!`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'profil-etudiant.php';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.message || 'Invalid email or password'
            });
            
            SigninButton.disabled = false;
            SigninButton.textContent = 'Sign in';
        }
        
    } catch (error) {
        console.error('Login error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Connection Error',
            text: 'Unable to connect to server. Please try again.'
        });
        
        SigninButton.disabled = false;
        SigninButton.textContent = 'Sign in';
    }
});