const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 8080;

let movies = [
  {
    movieName: "D-Day",
    actor:
      "Arjun Rampal,Huma Qureshi,Shruti Haasan,Irrfan Khan,Rishi Kapoor,Nassar,Sandeep Kulkarni,KK Raina,Chandan Roy Sanyal,Aakash Daahiya,Shriswara,Wali Khan's wife,Dwij,Wali Khan's son,Imran Hasnee,Nissar Khan,Maryam Zakaria",
    releaseyear: 2013,
    description:
      "A team of experts dispatched to bring in The Most Wanted Man in India almost achieves the unthinkable ... until something goes horribly wrong.",
    duration: "2:29:45",
    genre: "Thriller"
  },
  {
    movieName: "Main Tera Hero",
    actor: "Varun Dhawan,Ileana,Anupam Kher,Salman Khan",
    releaseyear: 2014,
    description:
      "Sreenath Prasad aka Seenu is the most notorious boy in Ooty. He drops out of college in Ooty in order to pursue education in a Bangalore college. Here he falls in love with Sunaina. But Sunaina is forced to marry Angad,a local police officer,who is more of a terrorizing gangster. Seenu also has another die-hard lover in the form of Ayesha,of whom he is unaware. He had once saved her friends and Ayesha instantly knew that he was the perfect man for her. Ayesha's father is a big gangster and kidnaps Sunaina to get hold of Seenu and compel him to marry his daughter.",
    duration: "2:06:39",
    genre: "Comedy"
  },
  {
    movieName: "Masters",
    actor:
      "Prithviraj,Sasikumar,Ananya,Pia Bajpai,Mithra Kurian,Sandhya,Biju Menon,Salim Kumar,Saikumar,Bhagath Manuel",
    releaseyear: "2012",
    description:
      "Milan Paul and Sreeramakrishnan are best friends who have been together since college. The intensity of their friendship has not faded though the carefree days of college have long past gone. Now Sree is an ASP (Assistant Superintendent of Police) of Kottayam and Milan is a renowned reporter in the same city. Though in different fields both are in highly responsible jobs. In effect,both of them use their friendship to fulfill their respective social responsibilities.",
    duration: "2:18:30",
    genre: "Action"
  },
  {
    movieName: "Tum Mile",
    actor: "Emraan Hashmi,Soha Ali,VJ Mantra,Rituraj Singh",
    releaseyear: "2009",
    description:
      "On a flight to Mumbai,Akshay meets with his wealthy ex-girlfriend,Sanjana,who is in the company of another male,Rajeev. He,a struggling artist,recalls how he met her in Cape Town and their moving in together. Differences crop up,and get worse,when he does not meet with her busy dad,leading to their taking different paths. After the plane lands they head out to their respective destinations - little knowing the danger that awaits them after the city experiences life-threatening heavy rains and floods.",
    duration: "2:09:04",
    genre: "Drama"
  },
  {
    movieName: "Raaz-The Mystery Continues...",
    actor:
      "Kangana Ranaut,Adhyayan Suman,Emraan Hashmi,J. Brandon,Khusboo,Dinesh Lamba,Sandeep Mehta,Menaka Neotia,Chintan Sarda,Jackie Shroff,Anupam Shyam,Sandeep Sikand",
    releaseyear: "2009",
    description:
      "A beautiful lady turns up in an achitect's masterpiece.When he founds that she is real,he realizes that she is haunted and hunted by the reasons they have to find out",
    duration: "2:23:27",
    genre: "Thriller"
  },
  {
    movieName: "All The Best",
    actor:
      "Sanjay Dutt,Ajay Devgn,Fardeen Khan,Bipasha Basu,Mugdha Godse,Ashwini Khalsekar,Mukesh Tiwari,Johnny Lever,Asrani Asrani",
    releaseyear: "2009",
    description:
      "Identities get mixed and goof-ups arise due to presumptions having its basis on distorted facts. Ajay Devgan continues his run as producer following Raju Chacha and U,Me aur Hum. He teams up with the director of the new Golmaal - Rohit Shetty.",
    duration: "2:15:00",
    genre: "Comedy"
  },
  {
    movieName: "Barah Aana",
    actor: "",
    releaseyear: "2009",
    description:
      "Three impoverished room-mates kidnap middle-classed men and demand small ransoms to improve their respective lifestyles.",
    duration: "1:31:19",
    genre: "Comedy"
  },
  {
    movieName: "Sevenes",
    actor:
      "Kunchacko Boban,Mithun Ramesh,Rejith Menon,Nivi, Pauly,Aju Varghese,Vineeth Kumar,Rima Kallingal,Ameer,Bhama,Ramya Raj",
    releaseyear: "2011",
    description:
      "The film is .bout seven young men,passionate about football - sevens football to be precise - and how they inadvertently get involved in a crime. Sevens is a kind of football played in North malabar,especially in Kozhikode,Malappuram and Kannur. It is played by seven players on each side,instead of the traditional 11.",
    duration: "2:23:56",
    genre: "Action"
  },
  {
    movieName: "Karyasthan",
    actor: "Dileep,Akhila,Madhu,Salim Kumar,Suraj Venjaramood,Vandana Menon",
    releaseyear: "2010",
    description:
      "The story is set in a picturesque landscape in a village called Krishnapuram. The two tharavadu are situated in the same compound. The film begins with the celebration of onam festival by the inmates of both the houses. Krishna warrier (Madhu)'s son Raajan (Siddique)is in love with one of the girls there but his marriage is fixed with Saraswathy (Lena),daughter of the karanavar of Puthezhath. Rajan and the girl elopes. But Puthezhath people tries to stop them,but Krishnawarrier comes and rescues and also pulls him up on to the train. As years pass,Krishnanunni is born to Raajan.",
    duration: "2:41:54",
    genre: "Comedy"
  },
  {
    movieName: "Nastik",
    actor: "Amjad Khan,Amitabh Bachchan,Pran,Hema Malini",
    releaseyear: "1983",
    description:
      "Shankar (Amitabh Bachchan) grows up as a Nastik (atheist) because his father got murdered by Tiger and his mother and sister got torched in their house and blamed God for doing nothing. After his father,mother and sister got killed,he decided to bring justice himself and went to the palace of Tiger but instead of killing,he made him blind. When he grows up,he goes on to make a career in stealing other people properties. He joins forces with Balbir (Pran) and Gauri (Hema Malini). At one time,he was shot by Tiger (Amjad Khan) for stealing his goods and then in an attempt to hide,he found his mother,who he thought was dead. In a rude awakening,he decided to stop stealing other people properties and started searching his long lost family.",
    duration: "2:32:00",
    genre: "Action"
  }
];

let users = [
  {
    id: "0",
    name: "Test1",
    username: "TestOne",
    password: "123456",
    email: "test@one.com",
    favourites: []
  },
  {
    id: "1",
    name: "Test2",
    username: "TestTwo",
    password: "123456",
    email: "test@two.com",
    favourites: ["4"]
  },
  {
    id: "3",
    name: "Test3",
    username: "TestThree",
    password: "123456",
    email: "test@three.com",
    favourites: ["1", "6"]
  }
];

let genre = [
  {
    id: "0",
    title: "Action",
    description:
      "Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero "
  },
  {
    id: "1",
    title: "Crime",
    description:
      "Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. "
  },
  {
    id: "2",
    title: "Comedy",
    description:
      "A comedy film is a genre of film in which the main emphasis is on humor."
  }
];

let directors = [
  {
    id: "0",
    name: "Ridley",
    surname: "Scott",
    bio:
      " Sir Ridley Scott (born 30 November 1937)is an English filmmaker. Following his commercial breakthrough in 1979 with the science fiction horror film Alien, further works include the neo-noir dystopian film Blade Runner, the road adventure film Thelma & Louise, the historical drama Gladiator (which won the Academy Award for Best Picture) and the science fiction film The Martian.",
    birth: "30/11/1937",
    death: ""
  },
  {
    id: "1",
    name: "Martin",
    surname: "Scorsese",
    bio:
      "Martin Charles Scorsese Italian: [skorˈseːze; -eːse]; born November 17, 1942) is an American-Italian filmmaker, actor and historian, whose career spans more than 50 years. Part of the New Hollywood wave of filmmaking, he is widely regarded as one of the most significant and influential filmmakers in cinematic history. Scorsese's body of work explores such themes as Italian-American identity, Roman Catholic concepts of guilt and redemption, faith, machismo, modern crime, and gang conflict. Many of his films are also known for their depiction of violence and liberal use of profanity. In 1990, he founded The Film Foundation, a nonprofit organization dedicated to film preservation, and in 2007 he founded the World Cinema Foundation. He is a recipient of the AFI Life Achievement Award for his contributions to the cinema, and has won an Academy Award, a Palme d'Or, Cannes Film Festival Best Director Award, Silver Lion, Grammy Award, Emmys, Golden Globes, BAFTAs, and Directors Guild of America Awards.",
    birth: "17/11/1945",
    death: ""
  },
  {
    id: "2",
    name: "Steven",
    surname: "Spielberg",
    bio:
      "Steven Allan Spielberg (/ˈspiːlbɜːrɡ/; born December 18, 1946) is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history. Spielberg started in Hollywood directing television and several minor theatrical releases. He became a household name as the director of Jaws (1975), which was critically and commercially successful and is considered the first summer blockbuster. His subsequent releases focused typically on science fiction/adventure films such as Close Encounters of the Third Kind (1977), Raiders of the Lost Ark (1981), E.T. the Extra-Terrestrial (1982), and Jurassic Park (1993), which became archetypes of modern Hollywood escapist filmmaking.",
    birth: "18/12/1946",
    death: ""
  }
];

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.send("myFlix API");
});

app.get("/movies", function(req, res) {
  res.json(movies);
});

app.get("/movies/:title", function(req, res) {
  res.send("Successful GET request returning movie title");
});

app.post("/movies", function(req, res) {
  res.send("Successful POST request movie added");
});

app.get("/genre", function(req, res) {
  res.json(genre);
});

app.post("/genre", function(req, res) {
  res.send("Successful POST request genre added");
});

app.get("/directors", function(req, res) {
  res.json(directors);
});

app.post("/directors", function(req, res) {
  res.send("Successful POST request director added");
});

app.get("/users", function(req, res) {
  res.json(users);
});

app.post("/users/:username", function(req, res) {
  res.send("Successful POST request user added");
});

app.post("/users/:username/:id", function(req, res) {
  res.send("Successful POST request favourite added");
});

app.put("/users/:username", function(req, res) {
  res.send("Successful PUT request user updated");
});

app.delete("/users/:username", function(req, res) {
  res.send("Successful DELET request user deleted");
});

app.get("/documentation", function(req, res) {
  res.sendFile("/public/documentation.html", { root: __dirname });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
