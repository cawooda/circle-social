const userData = [
  {
    _id: "60d0fe4f5311236168a109ca",
    first: "John",
    last: "Doe",
    username: "jodo",
    date_of_birth: "1990-01-01T00:00:00.000Z",
    mobile: "1234567890",
    email: "john.doe@example.com",
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK", // Hashed password
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
    password: "$2b$10$6bICJhjSHlZi7fWBrjIY0uzIDDFIoh38tTMNfiuadx370EKJNURYK", // Hashed password
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
];

const thoughtData = [
  {
    _id: "60d0fe4f5311236168a109cd",
    thoughtText: "This is my first post!",
    username: "joho",
    likes: "10",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109ce",
    thoughtText: "Hello world!",
    username: "joho",
    likes: "5",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
];

module.exports = { thoughtData, userData, adminData };
