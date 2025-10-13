const searchBtn = document.getElementById("searchBtn");
const gradesTable = document.getElementById("gradesTable");
const gradesBody = document.getElementById("gradesBody");

searchBtn.addEventListener("click", () => {
  gradesBody.innerHTML = "";

  const exampleData = [
    { module: "", ds: "-", exam: "-" },
    { module: "", ds: "-", exam: "-" },
    { module: "", ds: "-", exam: "-" },
  ];

  exampleData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.module}</td>
          <td>${item.ds}</td>
          <td>${item.exam}</td>
        `;
    gradesBody.appendChild(row);
  });

  
  gradesTable.classList.add("show");
});
