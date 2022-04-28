const e = require("express");
var express = require("express");
var router = express.Router();
let rooms = [
  {
    "No.of seats available": 100,
    "Amenities in room": "AC,TV,Wifi",
    "Price per hour": 1000,
    Room_Id: 1,
  },
  {
    "No.of seats available": 300,
    "Amenities in room": "AC,Wifi,Music Instruments,Decorative items",
    "Price per hour": 3000,
    Room_Id: 2,
  },
];
let bookingList = [
  {
    "Customer Name": "XYZ",
    date: "20-03-2022",
    Start_Time: "06:00",
    End_Time: "12:00",
    Room_Id: 1,
  },
  {
    "Customer Name": "XYZ",
    date: "21-03-2022",
    Start_Time: "06:00",
    End_Time: "12:00",
    Room_Id: 2,
  },
];

/* GET Rooms*/
router.get("/getrooms", function (req, res) {
  res.send({
    statusCode: 200,
    message: "Rooms fetched successfully",
    data: rooms,
  });
});

/* GET Bookings*/
router.get("/getbookings", function (req, res) {
  let roomList = [];
  let bookedroomList = [];
  let bookedrooms = bookingList;
  bookedrooms.forEach((ele) => {
    ele.bookedStatus = true;
  });
  rooms.forEach((ele) => {
    roomList.push(ele.Room_Id);
  });
  roomList = [...new Set(roomList)];
  bookingList.forEach((ele) => {
    bookedroomList.push(ele.Room_Id);
  });
  roomList.forEach((ele) => {
    if (!bookedroomList.includes(ele)) {
      bookedrooms.push({
        bookedStatus: false,
        Room_Id: ele,
      });
    }
  });
  res.send({
    statusCode: 200,
    message: "Bookings fetched successfully",
    data: bookedrooms,
  });
});

/* GET customers*/
router.get("/getcustomers", function (req, res) {
  res.send({
    statusCode: 200,
    message: "Customers fetched successfully",
    data: bookingList,
  });
});

/*Create room*/
router.post("/create", (req, res) => {
  rooms.push(req.body);
  res.send({
    statusCode: 201,
    message: "Room added successfully",
    data: rooms,
  });
});

/*Book a room*/
router.post("/book", function (req, res) {
  let count = 0;
  bookingList.forEach((element) => {
    if (element.Room_Id == req.body.Room_Id) {
      if (element.date == req.body.date) {
        if (
          (element.End_Time >= req.body.Start_Time &&
            element.Start_Time <= req.body.Start_Time) ||
          (element.End_Time >= req.body.End_Time &&
            element.Start_Time <= req.body.End_Time)
        ) {
          res.send({
            statusCode: 400,
            message:
              "Room is not available currently..please choose some other room",
          });
          count = 1;
        }
      }
    }
  });
  if (count == 0) {
    bookingList.push(req.body);
    console.log(bookingList);
    res.send({
      statusCode: 201,
      message: "Room booked successfully",
      data: bookingList,
    });
  }
});

module.exports = router;
