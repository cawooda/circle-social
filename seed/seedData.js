const userData = [
  {
    _id: "60d0fe4f5311236168a109ca",
    first: "John",
    last: "Doe",
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
    content: "This is my first post!",
    img_url: "https://example.com/image1.jpg",
    user: "60d0fe4f5311236168a109ca",
    likes: "10",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109ce",
    content: "Hello world!",
    img_url: "https://example.com/image2.jpg",
    user: "60d0fe4f5311236168a109cb",
    likes: "5",

    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
];

module.exports = { thoughtData, userData, adminData };
