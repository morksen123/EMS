export const signInFormDefaultValues = {
  email: "",
  password: "",
};

export const signUpFormDefaultValues = {
  email: "",
  name: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  eventDate: new Date(),
  registrationDeadline: new Date(),
  categoryId: "",
};

export const eventCategories = [
  { id: "networking", name: "Networking" },
  { id: "party", name: "Parties" },
  { id: "sports", name: "Sports" },
  { id: "seminars", name: "Seminars" },
  { id: "exhibition", name: "Exhibition" },
];
