const books = [
  {
    title: "Critical Eleven",
    publicationDate: "November 14, 2016",
    author: "Ika Natassa",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1434459829i/25737077.jpg",
    description: "description",

    nbrPage: 340,
    category: "Personal development",
  },
  {
    title: "Percy Jackson",
    publicationDate: "November 14, 2016",
    author: "Rick Riordan",
    cover:
      "https://m.media-amazon.com/images/I/71xveX0psCL._AC_UF1000,1000_QL80_.jpg",
    description: "description",

    nbrPage: 340,
    category: "Personal development",
  },
  {
    title: "The Mercies",
    publicationDate: "November 14, 2016",
    author: "Kiran Millwood",
    cover: "https://m.media-amazon.com/images/I/51c0L8OiZtS.jpg",
    description: "description",

    nbrPage: 340,
    category: "Personal development",
  },
  {
    title: "Serendipity",
    publicationDate: "November 14, 2016",
    author: "Erisca Febriani",
    cover:
      "https://m.media-amazon.com/images/M/MV5BMzc3Yjg1MmUtODllMy00MmZkLTgyNDAtZDg0N2I4OWEzZTkxXkEyXkFqcGdeQXVyNTM0NTU5Mg@@._V1_FMjpg_UX1000_.jpg",
    description: "description",

    nbrPage: 340,
    category: "Classic novels",
  },
  {
    title: "Pergi",
    publicationDate: "November 14, 2016",
    author: "Tere Liye",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjOilCOwB6cksC_4URYrNee1lVfTbkFXoG5B1z6sBhU4hXHPNsTQrmXA1dj59wpL1tb0&usqp=CAU",
    description: "description",

    nbrPage: 340,
    category: "Classic novels",
  },

  {
    title: "Twice Shy",
    publicationDate: "November 14, 2016",
    author: "Sarah Hogle",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1595608490l/54660653.jpg",
    description: "description",

    nbrPage: 340,
    category: "Classic novels",
  },
  {
    title: "Harry Potter",
    publicationDate: "November 14, 2016",
    author: "J.K Rowling",
    cover:
      "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    description: "description",

    nbrPage: 340,
    category: "Religion & Spirituality",
  },
  {
    title: "Twilight",
    publicationDate: "November 14, 2016",
    author: "Stephenie Meyer",
    cover:
      "https://assets.dragoart.com/images/1506_501/how-to-draw-the-twightlight-book-cover_5e4c76680436f2.75096947_7322_3_3.jpg",
    description: "description",

    nbrPage: 340,
    category: "Youth",
  },
  {
    title: "The Poppy War",
    publicationDate: "November 14, 2016",
    author: "R.F Kuang",
    cover:
      "https://cdn.gramedia.com/uploads/items/9786020634951_the_poppy_war_cov.jpg",
    description: "description",

    nbrPage: 340,
    category: "African culture & Society",
  },
  {
    title: "The Glass Magician",
    publicationDate: "November 14, 2016",
    author: "Charlie N.Holmberg",
    cover:
      "https://bettierosebooks.files.wordpress.com/2017/06/theglassmagician.jpg?w=620",
    description: "description",

    nbrPage: 340,
    category: "Education & Formation",
  },
];

const authors = [
  {
    name: "Raditya Dika",
    profilImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdUqHjXQpRyycDh_D_inCakK8tBgJUvurd7ZuXrBgUtO0fLgmcOFSgDC6kBl_D-cfAqU&usqp=CAU",
  },
  {
    name: "N Tsana",
    profilImg:
      "https://media.licdn.com/dms/image/C4D03AQH2z4vtdzaJFA/profile-displayphoto-shrink_800_800/0/1646715545428?e=2147483647&v=beta&t=Ptt1MPEd57H8eSuVLGNJ2aM_FFvJhzW8ZJUVJFdxI7Y",
  },
  {
    name: "Tere Liye",
    profilImg:
      "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/06/17/1307148135.jpg",
  },
  {
    name: "Dewi Lestari",
    profilImg:
      "https://www.gramedia.com/blog/content/images/2018/10/Dewi-Lestari.jpg",
  },
  {
    name: "Asma Lamrabet",
    profilImg:
      "https://fr.le360.ma/resizer/m0gYf_dR3sJXAvK5aa4Z5ZSUrpc=/1216x684/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/le360/PJ43OJH7SBGPNGS346VHQH2X5U.jpg",
  },
];
const categories = [
  { name: "Education & Formation" },
  { name: "African culture & Society" },
  { name: "Youth" },
  { name: "Religion & Spirituality" },
  { name: "Classic novels" },
  { name: "Science fiction & fantasy" },
  { name: "Mystery & Suspense" },
  { name: "Personal development" },
  { name: "Sciences" },
  { name: "Contemporary literature" },
  { name: "Art & culture" },
  { name: "Cuisine & gastronomy" },
  { name: "Travel & adventure" },
  { name: "Poetry" },
  { name: "History" },
  { name: "Biographies & memoirs" },
  { name: "Psychology" },
  { name: "Social Sciences" },
];

const users = [
  {
    emailAddress: "harounakinda.pro@gmail.com",
    username: "kinda",
    password: "Kind@1404",
    role: "ADMIN",
  },
];
module.exports = { books, authors, categories, users };
