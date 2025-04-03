const prisma = require('../prisma/client');

exports.createReview = async (req, res) => {
    try {
        const { slug } = req.params;
        const { rating, comment, user } = req.body;

        const movie = await prisma.filme.findUnique({ where: { slug } });

        if (!movie) return res.status(404).json({ error: 'Filme não encontrado' });

        const newReview = await prisma.review.create({
            data: { rating, comment, user, filmeId: movie.id }
        });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await prisma.review.findMany();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewsByMovie = async (req, res) => {
    try {
        const { slug } = req.params;
        const movie = await prisma.filme.findUnique({ where: { slug } });

        if (!movie) return res.status(404).json({ error: 'Filme não encontrado' });

        const reviews = await prisma.review.findMany({ where: { filmeId: movie.id } });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedReview = await prisma.review.update({ where: { id: parseInt(id) }, data });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.review.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Review deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

