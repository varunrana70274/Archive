const profiles = {
  profiles: [
    {
      id: 1,
      name: "Markus Gray",
      school: "Drexel University",
      bio:
        "My name is Markus and I'm pretty awesome. I've added a little bit of extra text to get the max amount of space.",
      age: 29,
      avatar: require("../images/headshot.png"),
      media: [
        {
          id: 1,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
        {
          id: 2,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
        {
          id: 3,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
      ],
      unote: {
        avatar: require("../images/headshot.png"),
        type: "video",
        media: require("../videos/sample.mp4"),
      },
    },
    {
      id: 2,
      name: "John Smith",
      school: "Temple University",
      bio: "Hi John Smith here, I'm awesome.",
      age: 19,
      avatar: require("../images/headshot.png"),
      media: [
        {
          id: 1,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
        {
          id: 2,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
        {
          id: 3,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
      ],
    },
    {
      id: 3,
      name: "Tom Smith",
      school: "University of Pennsylvania",
      bio: "Test",
      age: 29,
      avatar: require("../images/headshot.png"),
      media: [
        {
          id: 1,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
        {
          id: 2,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
        {
          id: 3,
          type: "video",
          media: require("../videos/sample.mp4"),
        },
      ],
    },
  ],
};

export default profiles;
