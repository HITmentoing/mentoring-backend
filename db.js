const mentorData = [
  {
    uuid: 1,
    empId: "00020120",
    name: "Arpita Majumdar",
    email: "abc@gmail.com",
    mobile: "9932679032",
    password: "1234",
  },
  {
    mentorId: 2,
    empId: "00020122",
    name: "Sumanta Kuila",
    email: "def@gmail.com",
    mobile: "9932675032",
    password: "1234",
  },
  {
    mentorId: 3,
    empId: "00020123",
    name: "Subhankar joardar",
    email: "ghi@gmail.com",
    mobile: "9932674032",
    password: "123",
  }
]
const adminData = [
  {
    uuid: 1,
    email: "abc@gmail.com",
    password: "1234",
  },
]

const studentData = [
  {
    uuid: 1,
    stuId: "001-20-3500",
    name: "Rajdeep Chowdhury",
    roll: 12568525,
    password: 1234,
  },
  {
    uuid: 2,
    stuId: "001-20-0855",
    name: "Rajpratim Patra",
    roll: 10300120120,
    password: 1234,
  },
  {
    uuid: 3,
    stuId: "001-20-0678",
    name: "Jayanta Barik",
    roll: "10300120071",
    password: 1234,
  },
]

const updateId = (data) => {
  return data.length + 1;
}

module.exports = { adminData, mentorData, studentData, updateId };