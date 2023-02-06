const User = require('../models/UserModel')

module.exports.addToLikeMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id))
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data]
                    },
                    { new: true }
                )
            } else {
                return res.json({ message: "Movie alreade added to the liked list" })
            }
        } else await User.create({ email, likedMovies: [data] })
        return res.json({ message: "movie added successfully" })
    } catch (err) {
        return res.json({ message: "Error adding movie" })
    }
}

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ message: "success", movies: user.likedMovies })
        } else {
            return res.json({ message: "User with given email not found" })
        }
    } catch (err) {
        res.json({ message: "error fetching movies" })
    }
}

module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => (id === movieId))
            if (!movieIndex) res.status(400).send({ message: 'movie not found' })
            likedMovies.splice(movieIndex, 1);
            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies,
                },
                { new: true }
            )
            return res.json({message: 'Movie deleted', movies:likedMovies})
        }
    } catch (err) {
        return res.json({ message: "Error deleting movie" })
    }
}