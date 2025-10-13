<?php require_once '../backend/auth/session_check.php'; ?> <!--for checking if the user is truely logged in -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student Dashboard</title>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
    rel="stylesheet" />
  <link rel="stylesheet" href="styleprof.css" />
</head>

<body>
  <header class="head-contain">
    <div class="logo" title="est guelmim">
      <img src="images/download-removebg-preview.png" alt="" />
      <h2>E S T <span class="danger">G</span></h2>
    </div>
    <div class="section">
      <ul class="navbar">
        <li><a href="profil-etudiant.php">Profile</a></li>
        <li><a href="grades.html">notes</a></li>
        <li><a href="l">Classes</a></li>
      </ul>
    </div>
    <!--  Logout Button -->
    <button class="cssbuttons-io-button" onclick="logout()">
  Déconnexion
  <div class="icon">
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</button>



  </header>

  <div class="inform">
    <aside>
      <div class="profile">
        <!-- Loading State -->
        <div id="loading-profile" style="text-align: center; padding: 40px;">
          <p>Chargement du profil...</p>
        </div>

        <!-- Profile Content  -->
        <div id="profile-content" style="display: none;">
          <div class="top">
            <div class="profile-photo">
              <img src="./images/me.png" alt="" id="profile-image" />
            </div>
            <div class="info">
              <p>Salut , <b id="profile-prenom">...</b></p>
              <small class="text-muted">id : <span id="profile-student-id">...</span></small>
            </div>
          </div>
          <div class="about">
            <div class="first">
              <h5>Prénom</h5>
              <p id="display-prenom">...</p>
              <h5>Tel</h5>
              <p id="display-tel">...</p>
              <h5>CIN</h5>
              <p id="display-cin">...</p>
            </div>
            <div class="second">
              <h5>Nom</h5>
              <p id="display-nom">...</p>
              <h5>Email</h5>
              <p id="display-email">...</p>
              <h5>CNE</h5>
              <p id="display-cne">...</p>
            </div>
            <div class="third">
              <h5>Filière</h5>
              <p id="display-filiere">...</p>
              <h5>Semestre</h5>
              <p id="display-semestre">...</p>
              <h5>Lieu de naissance</h5>
              <p id="display-ldn">...</p>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div id="error-profile" style="display: none; text-align: center; padding: 40px; color: red;">
          <p>Erreur de chargement du profil</p>
          <button onclick="loadProfile()" style="padding: 8px 16px; margin-top: 10px; cursor: pointer;">Réessayer</button>
        </div>
      </div>
    </aside>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="js/scriptprofile.js"></script>
</body>
</html>