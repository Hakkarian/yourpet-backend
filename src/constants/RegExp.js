const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})/;
const PHONE_REGEX = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;
const BIRTHDAY_REG_EXP = /^([0-2][0-9]).([0-1][0-2]).([1-2][0-9]{3})$/;
const LOCATION = /^[A-Z]{1}[a-z]{1,20}$/;

module.exports = {
  PASSWD_REGEX,
  PHONE_REGEX,
  BIRTHDAY_REG_EXP,
  LOCATION,
};
