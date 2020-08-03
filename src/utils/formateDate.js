import moment from "moment";

const formatDate = date => {
  return moment(date).format("Do MMM, YYYY");
};

export default formatDate;
