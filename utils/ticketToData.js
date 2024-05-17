import cinemas from "../data/cinemas.json";

export default function ticketToData(ocrText) {
  var brand = "";
  var formData = {
    film: "",
    date: "",
    time: "",
    cinema: "",
    house: "",
    seat: "",
    title: "",
    content: "",
  };
  const stringWithoutSpaces = ocrText.replace(/\s/g, "");

  const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
  const dateMatch = stringWithoutSpaces.match(dateRegex);
  if (dateMatch) {
    formData.date = dateMatch[0];
  }

  const timeRegex = /\d{2}:\d{2}(am|pm)/gi;
  const timeMatch = stringWithoutSpaces.match(timeRegex);
  if (timeMatch) {
    formData.time = timeMatch[0];
  }

  if (stringWithoutSpaces.includes("MCL")) {
    brand = "mcl";
  } else if (stringWithoutSpaces.includes("broadway")) {
    brand = "broadway";
  }

  const cinemasFound = cinemas.filter(
    (cinema) =>
      ocrText.toLowerCase().includes(cinema.name.toLowerCase()) &&
      brand == cinema.brand
  );
  if (cinemasFound.length > 0) {
    formData.cinema = cinemasFound.map((cinema) => cinema.name)[0];
  }

  var ocrTextArray = ocrText.split("\n");
  if (brand == "mcl") {
    const filmIndex = findFilmIndexForMCL(ocrTextArray);
    if (filmIndex >= 0) formData.film = ocrTextArray[filmIndex];

    const houseRegex = /House\d{1,2}/g;
    const houseMatch = stringWithoutSpaces.match(houseRegex);
    if (houseMatch) {
      formData.house = houseMatch[0].split("House")[1];
    }

    const seatRegex = /\w-\d{1,2}/g;
    const seatMatch = stringWithoutSpaces.match(seatRegex);
    if (seatMatch) {
      formData.seat = seatMatch[0];
    }
  } else if (brand == "broadway") {
    const filmIndex = findFilmIndexForBroadway(ocrTextArray);
    if (filmIndex >= 0) formData.film = ocrTextArray[filmIndex];

    const houseSeatRegex = /\n(\d)(\w[\d]{1,2})\n/g;
    const houseSeatMatch = stringWithoutSpaces.match(houseSeatRegex);
    if (houseSeatMatch) {
      formData.house = houseSeatMatch[1];
      formData.seat = houseSeatMatch[2];
    }
  }

  console.log(formData);
  return formData;
}

function findFilmIndexForMCL(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (/[\u4e00-\u9fff]/.test(arr[i])) {
      return i - 1;
    }
  }
  return -1;
}

function findFilmIndexForBroadway(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (/片名FILM/.test(arr[i])) {
      return i + 1;
    }
  }
  return -1;
}
