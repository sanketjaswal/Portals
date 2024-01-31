const Vender = require("../../../models/vendorModel");
const express = require("express");
const router = require("../../index");

router.get("/infoDesk", async(req, res) =>{
    const allData = await Vender.find();
    console.log(allData);
});
