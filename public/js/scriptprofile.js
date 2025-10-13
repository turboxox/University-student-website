//wait for the page to fully reloaded 
window.addEventListener("DOMContentLoaded",function(){
    loadProfile();
})

async function loadProfile () {
    
    const loadingDiv = document.getElementById('loading-profile');
    const contentDiv= document.getElementById('profile-content');
    const errorDiv=document.getElementById('error-profile');

    try{
    loadingDiv.style.display='block';
    contentDiv.style.display='none';
    errorDiv.style.display='none';
        
    const response =await fetch('../backend/api/get_profile.php');
    const data = await response.json();

    if(data.success && data.user)//succes has true or false
    {
        const user = data.user;

        document.getElementById('profile-prenom').textContent=user.prenom;
        document.getElementById('profile-student-id').textContent=user.student_id;

        document.getElementById('display-prenom').textContent=user.prenom;
        document.getElementById('display-tel').textContent=user.tel;
        document.getElementById('display-cin').textContent=user.cin;

        document.getElementById('display-nom').textContent=user.nom;
        document.getElementById('display-email').textContent=user.email;
        document.getElementById('display-cne').textContent=user.cne;

        document.getElementById('display-filiere').textContent=user.filiere;
        document.getElementById('display-semestre').textContent=user.semestre;
        document.getElementById('display-ldn').textContent=user.ldn;

        loadingDiv.style.display = 'none';
        contentDiv.style.display = 'block';
    }
    else{
        loadingDiv.style.display='none';
        errorDiv.style.display='block';
    }

}catch (error) {
        console.error('Error loading profile:', error);
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
    }
}