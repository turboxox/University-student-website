    window.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded, starting profile load...'); // Debug
      loadProfile();
    });

    async function loadProfile() {
      const loadingDiv = document.getElementById('loading-profile');
      const contentDiv = document.getElementById('profile-content');
      const errorDiv = document.getElementById('error-profile');

      console.log('loadProfile function called'); // Debug

      // Check if elements exist
      if (!loadingDiv || !contentDiv || !errorDiv) {
        console.error('Profile elements not found in HTML!');
        return;
      }

      try {
        // Show loading
        loadingDiv.style.display = 'block';
        contentDiv.style.display = 'none';
        errorDiv.style.display = 'none';

        console.log('Fetching profile data...'); // Debug

        // Fetch profile data from backend
        const response = await fetch('../backend/api/get_profile.php');
        console.log('Response status:', response.status); // Debug

        const data = await response.json();
        console.log('Profile data received:', data); // Debug

        if (data.success && data.user) {
          const user = data.user;

          // Update profile header
          document.getElementById('profile-prenom').textContent = user.prenom;
          document.getElementById('profile-student-id').textContent = user.student_id;

          // Update first column
          document.getElementById('display-prenom').textContent = user.prenom;
          document.getElementById('display-tel').textContent = user.tel;
          document.getElementById('display-cin').textContent = user.cin;

          // Update second column
          document.getElementById('display-nom').textContent = user.nom;
          document.getElementById('display-email').textContent = user.email;
          document.getElementById('display-cne').textContent = user.cne;

          // Update third column
          document.getElementById('display-filiere').textContent = user.filiere;
          document.getElementById('display-semestre').textContent = user.semestre;
          document.getElementById('display-ldn').textContent = user.ldn;

          // Hide loading, show content
          loadingDiv.style.display = 'none';
          contentDiv.style.display = 'block';

          console.log('✅ Profile loaded successfully!'); // Debug

        } else {
          console.error('❌ Profile load failed:', data.message);
          loadingDiv.style.display = 'none';
          errorDiv.style.display = 'block';

          // If not logged in, redirect to login
          if (data.message === 'Not logged in') {
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 2000);
          }
        }

      } catch (error) {
        console.error('❌ Error loading profile:', error);
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
      }
    }

    // ==================== LOGOUT FUNCTION ====================
    function logout() {
      console.log('Logout function called'); // Debug

      Swal.fire({
        title: 'Déconnexion?',
        text: "Voulez-vous vraiment vous déconnecter?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, déconnecter',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '../backend/auth/logout.php';
        }
      });
    }