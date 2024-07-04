const imgUrl = "https://image.tmdb.org/t/p/original";
const imgUrlSm = "https://image.tmdb.org/t/p/w500";

export const api_url = import.meta.env.VITE_API_URL;
export const api_key = import.meta.env.VITE_API_KEY;
export const image_url = import.meta.env.VITE_IMAGE_URL + "/original";
export const image_url_w500 = import.meta.env.VITE_IMAGE_URL + "/w500";

const dateFormat = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthName = monthNames[month];
  return `${day} ${monthName} ${year}`;
};

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours != 0 ? hours + "h" : ""} ${minutes}m`;
}

export { dateFormat, toHoursAndMinutes, imgUrl, imgUrlSm };

export const movie_genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
