const Promotions = require("../models/promotion");
const mongoose = require("mongoose");
const fs = require("fs");
const createPromotion = async function (req, res) {
  try {
    const { referent } = req.body;
    const promotion = new Promotions({
      ...req.body,
      referent: mongoose.Types.ObjectId(referent),
    });
    await promotion.save();
    fs.mkdirSync(`./BDD/${promotion.name}`, { recursive: true });
    res.status(201).send(promotion);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getPromotions = async function (req, res) {
  try {
    const promotions = await Promotions.find({});
    res.send(promotions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getPromotionByID = async function (req, res) {
  try {
    const promotion = await Promotions.findById(req.params.id);
    if (!promotion) {
      return res.status(404).send();
    }
    res.send(promotion);
  } catch (error) {
    res.status(500).send;
  }
};

const deletePromotionByID = async function (req, res) {
  try {
    const promotion = await Promotions.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).send();
    }
    res.send(promotion);
  } catch (error) {
    res.status(500).send;
  }
};

const updatePromotionByID = async function (req, res) {
  try {
    const promotion = await Promotions.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!promotion) {
      return res.status(404).send();
    }
    res.send(promotion);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  createPromotion,
  getPromotions,
  getPromotionByID,
  deletePromotionByID,
  updatePromotionByID,
};
