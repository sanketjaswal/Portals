const express = require("express");
const User = require("../models/userModel.js");
const Vender = require("../models/vendorModel.js");
const Event = require("../models/eventsModel.js");
const Booth = require("../models/boothModel.js");
const InfoDesk = require("../models/infoDeskModel.js");

// fetch infoDesk data
module.exports.infoDeskAPI = async (req, res) => {
  const allData = await InfoDesk.find();
  console.log(allData);
  res.status(200).json({
    // success: true,//
    infoDesk: allData[0].info,
  });
};

// fetch all vendors data
module.exports.vendorsAPI = async (req, res) => {
  const allData = await Vender.find();
  console.log(allData);
  res.status(200).json({
    success: true,
    vendors: allData,
  });
};

// fetch all vendors data
module.exports.boothsAPI = async (req, res) => {
    const allData = await Booth.find();
    console.log(allData);
    res.status(200).json({
      success: true,
      booths: allData,
    });
  };

// fetch all vendors data
module.exports.eventsAPI = async (req, res) => {
    const allData = await Event.find();
    console.log(allData);
    res.status(200).json({
      success: true,
      events: allData,
    });
  };