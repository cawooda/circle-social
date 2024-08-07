const userData = [
  {
    _id: "60d0fe4f5311236168a109ca",
    first: "John",
    last: "Doe",
    username: "jodo",
    date_of_birth: "1990-01-01T00:00:00.000Z",
    mobile: "1234567890",
    email: "john.doe@example.com",
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK",
    friends: ["60d0fe4f5311236168a109cb"],
    thoughts: ["60d0fe4f5311236168a109cd"],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109cb",
    first: "Jane",
    last: "Smith",
    username: "joho",
    date_of_birth: "1985-06-15T00:00:00.000Z",
    mobile: "0987654321",
    email: "jane.smith@example.com",
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK",
    friends: ["60d0fe4f5311236168a109ca"],
    thoughts: ["60d0fe4f5311236168a109ce"],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109cf",
    first: "Alice",
    last: "Johnson",
    username: "aljo",
    date_of_birth: "1992-08-25T00:00:00.000Z",
    mobile: "5555555555",
    email: "alice.johnson@example.com",
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK",
    friends: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"],
    thoughts: ["60d0fe4f5311236168a109cf"],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109d3",
    first: "Bob",
    last: "Williams",
    username: "bwil",
    date_of_birth: "1995-12-30T00:00:00.000Z",
    mobile: "2222222222",
    email: "bob.williams@example.com",
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK",
    friends: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cf"],
    thoughts: ["60d0fe4f5311236168a109d4"],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109d5",
    first: "Charlie",
    last: "Brown",
    username: "chbr",
    date_of_birth: "1997-03-14T00:00:00.000Z",
    mobile: "3333333333",
    email: "charlie.brown@example.com",
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK",
    friends: ["60d0fe4f5311236168a109cb", "60d0fe4f5311236168a109cf"],
    thoughts: ["60d0fe4f5311236168a109d6"],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
];

const adminData = [
  {
    _id: "60d0fe4f5311236168a109cc",
    user: "60d0fe4f5311236168a109ca",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109cd",
    user: "60d0fe4f5311236168a109cb",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109d6",
    user: "60d0fe4f5311236168a109cf",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109d7",
    user: "60d0fe4f5311236168a109d3",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
];

const thoughtData = [
  {
    _id: "60d0fe4f5311236168a109cd",
    thoughtText: "This is my first post!",
    username: "joho",
    reactions: [
      {
        reactionId: "60d0fe4f5311236168a109d0",
        reactionBody: "Nice post!",
        userName: "aljo",
        createdAt: "2023-06-01T00:00:00.000Z",
        updatedAt: "2023-06-01T00:00:00.000Z",
      },
    ],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109ce",
    thoughtText: "Hello world!",
    username: "joho",
    reactions: [
      {
        reactionId: "60d0fe4f5311236168a109d1",
        reactionBody: "Welcome to the platform!",
        userName: "jodo",
        createdAt: "2023-06-01T00:00:00.000Z",
        updatedAt: "2023-06-01T00:00:00.000Z",
      },
    ],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109cf",
    thoughtText: "Just joined, excited to be here!",
    username: "aljo",
    reactions: [
      {
        reactionId: "60d0fe4f5311236168a109d2",
        reactionBody: "Happy to have you!",
        userName: "joho",
        createdAt: "2023-06-01T00:00:00.000Z",
        updatedAt: "2023-06-01T00:00:00.000Z",
      },
    ],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109d4",
    thoughtText: "Good to see everyone!",
    username: "bwil",
    reactions: [
      {
        reactionId: "60d0fe4f5311236168a109d3",
        reactionBody: "Great to see you!",
        userName: "aljo",
        createdAt: "2023-06-01T00:00:00.000Z",
        updatedAt: "2023-06-01T00:00:00.000Z",
      },
    ],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109d5",
    thoughtText: "Learning a lot!",
    username: "chbr",
    reactions: [
      {
        reactionId: "60d0fe4f5311236168a109d4",
        reactionBody: "Happy for you!",
        userName: "bwil",
        createdAt: "2023-06-01T00:00:00.000Z",
        updatedAt: "2023-06-01T00:00:00.000Z",
      },
    ],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
];

module.exports = { thoughtData, userData, adminData };
