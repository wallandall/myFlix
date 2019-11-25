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

module.exports = movies;
