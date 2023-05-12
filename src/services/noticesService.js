const Notice = require("../models/noticeModel");
const { AppError } = require("../utils/index");

const createNoticesService = async (body) => {
  const newNotice = await Notice.create(body);
  return newNotice;
};

const getAllNoticesService = async () => {
  return await Notice.find();
};

const getQueryNoticesService = async (body) => {
  return await Notice.find(body);
};

module.exports = {
  createNoticesService,
  getAllNoticesService,
  getQueryNoticesService,
};
