var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var DBModel = require("../Models/DailyDBModel");

mongoose.connect("mongodb://localhost/daily_activities");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// view all
router.get('/view-reports' , async (req , res)=> {
  var list = await DBModel.find({} , {_id:0 , __v:0})
  res.json(list)
})

router.post("/add-report", async (req, res) => {
  var data = req.body;
  var today = new Date();

  today =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  var storeData = {
    date: today,
    cig_count: data.cig_count,
    col_count: data.col_count,
  };

  console.log(storeData);


  var foundDate = await DBModel.findOne({data:today})

  console.log(foundDate);

  if(foundDate === null){
    var putMe = new DBModel(storeData);
    putMe.save((err) => {
      if (!err) {
        res.json({ status: true, message: "Report Added" });
      } else {
        res.json({ status: false, message: "Report Unable to Add" });
      }
    });
  }else{
    res.json({ status: false, message: today + " report already added " });
  }
});

router.get('/delete-reports' ,  (req , res)=> {
  var deleteDatas = DBModel.deleteMany({} , (err)=> {
    if(!err){
      console.log("Ok");
    }else{
      console.log(err);
    }
  })
  res.json(deleteDatas)
})


// today report
router.get('/today-report' , async (req , res) => {
  var today = new Date();

  today =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();

    var foundData = await DBModel.findOne({date:today} , {_id:0 , __v:0 })
    
    res.json(foundData)
})



module.exports = router;
