var express = require('express')
var mongoose = require('mongoose')

var DailySchema = mongoose.Schema({
    date:String,
    col_count:Number,
    cig_count:Number
})

var DailyModel = mongoose.model('weekly_reports' , DailySchema)

module.exports = DailyModel