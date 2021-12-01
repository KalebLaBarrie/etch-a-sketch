const container = document.querySelector(".container");

let isRainbow = false;

let resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", reset);

let rainbowtBtn = document.querySelector("#rainbowBtn");
rainbowtBtn.addEventListener("click", () => {
  isRainbow = !isRainbow;
  reset();
});

const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

function createGrid(gridSize) {
  let sizePercent = 100 / gridSize;

  let matrix = gridSize * gridSize;
  //   console.log(sizePercent);
  for (let i = 0; i < matrix; i++) {
    let div = document.createElement("div");
    div.classList.add("square", "white", "basis");

    //   flex: 1 0 6.25%;
    div.style.flexBasis = `${sizePercent}%`;

    //   Add Hover Effect
    if (isRainbow) {
      div.addEventListener("mouseover", (e) => {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
        e.target.classList.remove("red");
        e.target.style.backgroundColor = rgb;
      });
    } else {
      div.addEventListener("mouseover", (e) => {
        e.target.classList.remove("red");
        e.target.classList.add("blue");
      });
    }

    container.appendChild(div);
  }
}

function clearGrid() {
  container.innerHTML = "";
}

function promptUser() {
  let gridSize = Number(
    prompt(
      "How many number of squares per side?(Please choose a number less or equal to 100)"
    )
  );

  console.log(gridSize);
  return gridSize;
}

function reset() {
  let gridSize = promptUser();

  while (gridSize > 100) {
    console.log(gridSize);
    gridSize = promptUser();
  }

  clearGrid();
  createGrid(gridSize);

  let divs = document.querySelectorAll(".square");
  for (let i = 0; i < gridSize; i++) {
    divs[i].classList.remove("blue");
    divs[i].classList.add("red");
  }
}

//Default size
createGrid(16);
