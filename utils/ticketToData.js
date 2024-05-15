export default function ticketToData(ocrText) {
  var date = "";
  var time = "";
  var brand = "";
  const stringWithoutSpaces = ocrText.replace(/\s/g, "");

  const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
  const dateMatch = stringWithoutSpaces.match(dateRegex);
  if (dateMatch) {
    const date = dateMatch[0];
    console.log(date);
  } else {
    console.log("No date found.");
  }

  const timeRegex = /\d{2}:\d{2}(am|pm)/gi;
  const timeMatch = stringWithoutSpaces.match(timeRegex);
  if (timeMatch) {
    const time = timeMatch[0];
    console.log(time);
  } else {
    console.log("No time found.");
  }

  if (stringWithoutSpaces.includes("MCL")) {
    brand = "mcl";
  } else if (stringWithoutSpaces.includes("broadway")) {
    brand = "broadway";
  } else {
    console.log("No brand found.");
  }

  return {
    film: "",
    date: date,
    time: time,
    cinema: "",
    house: "",
    seat: "",
    title: "",
    content: "",
  };
}
