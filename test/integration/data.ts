const data = {
  users: [
    {
      email: "lopezjuan@gmail.com",
      password: "Somehardpassword1+..",
      passwordConfirm: "Somehardpassword1+..",
      birthday: "1999-01-01",
      gender: "male",
      firstName: "Juan",
      lastName: "Lopez",
    },
    {
      email: "lopezpedro@gmail.com",
      password: "amazIngPa6,..",
      passwordConfirm: "amazIngPa6,..",
      birthday: "2001-01-01",
      gender: "male",
      firstName: "Pedro",
      lastName: "Lopez",
    },
    {
      email: "randomemail@gmail.com",
      password: "amrrrPa6,..",
      passwordConfirm: "amrrrPa6,..",
      birthday: "1991-01-01",
      gender: "female",
      firstName: "Jessica",
      lastName: "Riveira",
    },
  ],
  posts: [
    {
      text: "Ecuador won 2 zero against qatar",
      videos: [{ url: "some:video" }, { url: "another video.com" }],
      photos: [],
      created_at: new Date("2022-10-10"),
    },
    {
      text: "United States will play Gales at 16:00 hour Argentina.",
      videos: [],
      photos: [{ url: "a img" }, { url: "anohter img" }],
      created_at: new Date("2022-10-01"),
    },
    {
      text: "Netherlands is  going to play in a hour and a half",
      videos: [{ url: "a video dou" }],
      photos: [{ url: "anohter img" }],
      created_at: new Date("2022-10-11"),
    },
  ],
  comments: [
    {
      text: "",
      created_at: "",
    },
  ],
};

export default data;
