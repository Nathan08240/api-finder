const express = require('express')
const router = express.Router()
const {
  createPromotion,
  getPromotion,
  getPromotionByID,
  deletePromotionByID,
  updatePromotionByID,
} = require('../handlers/promotion')
const { isAuth, isAdmin } = require('../middlewares/auth')

router.use(isAuth)
router.route('/').get(getPromotion).post(createPromotion)
router.route('/:id').get(getPromotionByID).delete(deletePromotionByID).put(updatePromotionByID)

module.exports = router
