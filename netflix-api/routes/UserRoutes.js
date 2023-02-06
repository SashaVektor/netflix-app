const { addToLikeMovies, getLikedMovies, removeFromLikedMovies } = require('../controlers/UserControler')

const router = require('express').Router()

router.post('/add', addToLikeMovies);
router.get('/liked/:email', getLikedMovies)
router.put('/delete', removeFromLikedMovies)

module.exports = router
