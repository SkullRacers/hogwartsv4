let isSortingActive = false;
let currentIndex = 0; // Added to track the index of the current student

document.getElementById("main").addEventListener("mousemove", (e) => {
  gsap.to("#cursor", {
    x: e.clientX,
    y: e.clientY,
  });
});

window.addEventListener("click", function () {
  var audio = document.getElementById("bg_noise");
  audio.play();
});

function load() {
  document.getElementById("cursor").style.display = "block";
  document.getElementById("Loader").style.display = "none";
  document.getElementById("main").style.display = "block";

  let credits = document.createElement("div");
  credits.innerText = "Made By Shashwat Singh, VII-E";
  credits.setAttribute("id", "credits");
  document.getElementById("main").append(credits);

  gsap.fromTo("#main", { opacity: 0 }, { opacity: 1 });

  setTimeout(() => {
    credits.style.opacity = 0;
  }, 3000);
}

let house = ["Ravenclaw", "Gryffindor", "Slytherin", "Hufflepuff"];

function sortStudent() {
  isSortingActive = true;
  currentIndex = 0; // Reset index for each new sorting session
  let namesValue = document.getElementById("nameOfStudent").value;
  let iteratedNames = namesValue.split(" ");

  function displayNextStudent() {
    if (!isSortingActive) return;
    if (currentIndex < iteratedNames.length) {
      let studentNum = Math.floor(Math.random() * 4);
      let houseStudent = house[studentNum];
      let popUpStudent = document.getElementById("Sorted");

      // Display the current name and house
      document.getElementById("name").innerText = iteratedNames[currentIndex];
      document.getElementById("house").innerText = houseStudent + "!";

      // Set the emblem
      let emblemSrc = houseStudent.toLowerCase() + ".jfif";
      document.getElementById(
        "emblem"
      ).innerHTML = `<img src="${emblemSrc}" alt="">`;

      // Show the sorted popup
      popUpStudent.style.scale = 1;
      const applaudingNoises = new Audio("cheer.mp3");
      applaudingNoises.play();
      document.getElementById("Frills").style.display = "block";

      // Animate the frills
      gsap.to("#Frills", {
        y: 488,
        duration: 3,
        onComplete: () => {
          document.getElementById("Frills").style.display = "none";
          currentIndex++;
          setTimeout(() => {
            popUpStudent.style.scale = 0;
            setTimeout(displayNextStudent, 3000); // Change here to 3000ms (3 seconds)
          }, 3000); // Also change here to 3000ms (3 seconds)
        },
      });
    } else {
      // Reset the scaling of the pop-up when done
      document.getElementById("Sorted").style.scale = 0;
      isSortingActive = false;
    }
  }

  // Start displaying names
  displayNextStudent();
}

document.getElementById('back_btn').addEventListener('click', () => {
  isSortingActive = false;
  document.getElementById('Sorted').style.scale = 0;
});

window.onload = load;
