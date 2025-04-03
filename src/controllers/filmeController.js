
const prisma = require('../prisma/client');

// Criar um novo filme
exports.createFilme = async (req, res) => {
    try {
        const { title, director, slug, year, maximumAttendees } = req.body;
        const filme = await prisma.filme.create({
            data: { title, director, slug, year, maximumAttendees }
        });
        res.status(201).json(filme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os filmes
exports.getFilmes = async (req, res) => {
    try {
        const filmes = await prisma.filme.findMany({
            include: { reviews: true }
        });
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ler um filme específico
exports.getFilme = async (req, res) => {
    try {
        const { slug } = req.params;
        const filme = await prisma.filme.findUnique({
            where: { slug },
            include: { reviews: true }
        });

        if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });

        res.json(filme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um filme
exports.updateFilme = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, director, year, maximumAttendees } = req.body;

        const updatedFilme = await prisma.filme.update({
            where: { slug },
            data: { title, director, year, maximumAttendees }
        });

        res.status(200).json(updatedFilme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualização parcial de um filme
exports.partialUpdateFilme = async (req, res) => {
    try {
        const { slug } = req.params;
        const data = req.body;

        const updatedFilme = await prisma.filme.update({
            where: { slug },
            data
        });

        res.status(200).json(updatedFilme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um filme
exports.deleteFilme = async (req, res) => {
    try {
        const { slug } = req.params;

        const deletedFilme = await prisma.filme.delete({
            where: { slug }
        });

        res.status(200).json(deletedFilme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

