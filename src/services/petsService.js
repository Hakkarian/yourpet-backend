const { Pet } = require("../models/petModel");

exports.getAllPets = async (userId, { skip = 0, limit = 2 }) => {
  const pets = await Pet.find({ owner: userId })
    .populate("owner", "_id name email")
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);

  return pets;
};

exports.addPet = async (body, userId) => {
  const newPet = await Pet.create({ ...body, owner: userId });

  return newPet;
};

exports.removePet = async (petId, userId) => {
  await Pet.findOneAndDelete({ _id: petId, owner: userId });
};
