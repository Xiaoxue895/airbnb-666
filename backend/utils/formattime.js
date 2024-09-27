// https://stackoverflow.com/questions/51082311/javascript-convert-to-date-time-format
// function format(dateStr) {
//     const dateTime = dateStr.split(" ");
//     const date = dateTime[0].split("-");
//     return `${date[0]}-${date[1]}-${date[2]} ${dateTime[1]}`;
//   }
  
//   console.log(format("2018-06-28 01:30:20"));
//   outputs: 2018-06-28 01:30:20

// now we have this:2020-05-12T23:50:21.817Z
// the thing we want is:
// "startDate": "2021-11-19",
// "endDate": "2021-11-20",
// "createdAt": "2021-11-19 20:39:36",
// "updatedAt": "2021-11-19 20:39:36"

// so we can do something like this:

const formatTime = (date) =>{
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    const seconds = String(d.getUTCSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

const formatDate = (date) =>{
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

}

module.exports = {
    formatTime,
    formatDate,
  };

