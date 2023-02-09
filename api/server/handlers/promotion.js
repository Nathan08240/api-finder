const Promotion = require('../models/promotion')

const createPromotion = async function (req, res) {
  try {
    const promotion = new Promotion(req.body)
    await promotion.save()
    fs.mkdirSync(`../BDD/${promotion.name}`, { recursive: true })
    res.status(201).send(promotion)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

const getPromotion = async function (req, res) {
  try {
    const Promotion = await Promotion.find({})
    res.send(Promotion)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getPromotionByID = async function (req, res) {
  try {
    const promotion = await Promotion.findById(req.params.id)
    if (!promotion) {
      return res.status(404).send()
    }
    res.send(promotion)
  } catch (error) {
    res.status(500).send
  }
}

const deletePromotionByID = async function (req, res) {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id)
    if (!promotion) {
      return res.status(404).send()
    }
    res.send(promotion)
  } catch (error) {
    res.status(500).send
  }
}

const updatePromotionByID = async function (req, res) {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!promotion) {
      return res.status(404).send()
    }
    res.send(promotion)
  } catch (error) {
    res.status(500).send()
  }
}

module.exports = {
  createPromotion,
  getPromotion,
  getPromotionByID,
  deletePromotionByID,
  updatePromotionByID,
}
