export default function grawGrid() {
  const containerPlayer = document.querySelector(".playerGrid");
  const containerComputer = document.querySelector(".computerGrid");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellPlayer = document.createElement("p");
      const cellComputer = document.createElement("p");
      cellPlayer.id = `player${i.toString()}${j.toString()}`;
      cellComputer.id = `computer${i.toString()}${j.toString()}`;
      cellPlayer.classList.add("cell");
      cellComputer.classList.add("cell");
      containerPlayer.appendChild(cellPlayer);
      containerComputer.appendChild(cellComputer);
    }
  }
}
