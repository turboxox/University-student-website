window.addEventListener("DOMContentLoaded", function () {
  loadStudentName();
});

// Fetch student name
async function loadStudentName() {
  try {
    const response = await fetch("../backend/api/get_profile.php");
    const data = await response.json();

    if (data.success && data.user) {
      document.getElementById("profile-prenom").textContent = data.user.prenom;
    }
  } catch (error) {
    console.error("Error loading name:", error);
  }
}

document.getElementById("searchBtn").addEventListener("click", function () {
  loadGrades();
});

//  function to load grades
async function loadGrades() {
  const semestreSelect = document.getElementById("semester");
  const semestre = semestreSelect.value;

  console.log("Selected semester:", semestre);

  if (!semestre) {
    alert("Veuillez sélectionner un semestre");
    return;
  }

  const loadingDiv = document.getElementById("grades-loading");
  const contentDiv = document.getElementById("grades-content");
  const errorDiv = document.getElementById("grades-error");
  const noSelectionDiv = document.getElementById("no-selection");
  const tbody = document.getElementById("grades-tbody");

  try {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
    errorDiv.style.display = "none";
    noSelectionDiv.style.display = "none";

    // Fetch grades from API
    const response = await fetch(
      `../backend/api/get_grades.php?semestre=${semestre}`
    );
    const data = await response.json();

    console.log("API Response:", data);

    if (data.success && data.grades && data.grades.length > 0) {
      // Clear old table rows
      tbody.innerHTML = "";

      // Loop through grades and create rows
      data.grades.forEach(function (grade) {
        const row = document.createElement("tr");

        if (grade.status === "V") {
          row.classList.add("validated");
        } else if (grade.status === "NV") {
          row.classList.add("not-validated");
        } else if (grade.status === "RATT") {
          row.classList.add("rattrapage");
        }

        row.innerHTML = `
                    <td>${grade.module}</td>
                    <td>${parseFloat(grade.note).toFixed(2)}</td>
                    <td>${grade.status}</td>
                `;

        tbody.appendChild(row);
      });

      loadingDiv.style.display = "none";
      contentDiv.style.display = "block";
    } else {
      loadingDiv.style.display = "none";
      errorDiv.style.display = "block";
      document.getElementById("error-message").textContent =
        data.message || "Aucune note trouvée pour ce semestre";
    }
  } catch (error) {
    console.error("Error loading grades:", error);
    loadingDiv.style.display = "none";
    errorDiv.style.display = "block";
    document.getElementById("error-message").textContent =
      "Erreur de connexion. Veuillez réessayer.";
  }
}

function logout() {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../backend/auth/logout.php";
    }
  });
}