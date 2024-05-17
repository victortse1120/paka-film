import cinemas from "../data/cinemas.json";
import movies from "../data/movies.json";

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

  const moviesFound = movies.filter((movie) =>
    ocrText.toLowerCase().includes(movie.film.toLowerCase())
  );
  if (moviesFound.length > 0) {
    formData.film = moviesFound.map((movie) => movie.film)[0];
  }

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

  if (brand == "mcl") {
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
    const lines = stringWithoutSpaces.split("\n");
    const houseSeatRegex = /(\d)([A-Z][\d]{1,2})/;
    lines.forEach((line) => {
      const houseSeatMatch = line.match(houseSeatRegex);
      if (houseSeatMatch) {
        formData.house = houseSeatMatch[1];
        formData.seat = houseSeatMatch[2];
      }
    });
  }

  console.log(formData);
  return formData;
}
