const express = require('express')
const app = express()
const port = 3000
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json())
// criar filmes
app.post('/filme', async (req, res) =>{
    try{ 
        const{ title, director, slug, year, maximumAttendees} = req.body;
        const filme = await prisma.filme.create({
            data: { title, director, slug, year, maximumAttendees},
        });
        res.status(201).json(filme);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
});

// listar os filmes:
app.get('/filmes', async(req,res) => {
    try{
        const filmes = await prisma.filme.findMany({include: {
                reviews: true 
            }});
        res.json(filmes);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

// ler um filme e seus reviews
app.get('/filme/:slug', async(req,res) => {

    try{
        const {slug} = req.params;
        const filme = await prisma.filme.findUnique(
            { include: {
                reviews: true 
            },
            where: { slug } });
        if (!filme) return res.status(404).json({error: 'filme nao encontrado'});
        res.json(filme);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

// ler todos os reviews
app.get('/reviews', async(req,res) =>{
    try{
        const reviews = await prisma.review.findMany();
        res.json(reviews);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

// ler os reviews de um filme especifico
app.get('/reviews/:slug', async(req,res) =>
{
    try{
        const {slug} = req.params;
        const filme = await prisma.filme.findUnique({
            where: {slug}
        });
        
        if (!filme) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const id = filme.id;
        const reviews = await prisma.review.findMany({
            where: {filmeId:id}
        });
       if(!reviews){
           return res.status(404).json({error: "reviews not found"});
       }
        res.json(reviews);

    }
    catch(error){
        res.status(500).json({error: error.message});

    }
});
//adicionar review para filme especifico
app.post('/review/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const { rating, comment, user } = req.body;

        const movie = await prisma.filme.findUnique({
            where: { slug }
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const newReview = await prisma.review.create({
            data: {
                rating,
                comment,
                user,
                filmeId: movie.id
            }
        });

        res.status(201).json({ message: "Review created successfully!", review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// deletar filme especifico
app.delete('/filme/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const deleteMovie = await prisma.filme.delete({
            where: { slug } 
        });
        
        res.status(200).json({ message: 'Movie deleted successfully!', deletedMovie: deleteMovie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// deletar review pelo id
app.delete('/review/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const deleteReview = await prisma.review.delete({
            where: {id}
        });
        res.status(200).json({message: 'review deleted successfully!', deletedReview: deleteReview});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

// dar update em review

app.put('/filme/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, director, year, maximumAttendees } = req.body;

        const updatedFilme = await prisma.filme.update({
            where: { slug },
            data: { title, director, year, maximumAttendees }
        });

        res.status(200).json({ message: "Filme updated successfully", updatedFilme });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/review/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, user, comment } = req.body;

        const updatedReview = await prisma.review.update({
            where: { id: parseInt(id) },
            data: { rating, user, comment }
        });

        res.status(200).json({ message: "Review updated successfully", updatedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/filme/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const data = req.body; // Dados que serão atualizados (parcialmente)

        const updatedFilme = await prisma.filme.update({
            where: { slug },
            data // Só os campos passados no corpo da requisição serão modificados
        });

        res.status(200).json({ message: "Filme atualizado com sucesso", updatedFilme });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/review/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body; // Dados que serão atualizados (parcialmente)

        const updatedReview = await prisma.review.update({
            where: { id: parseInt(id) },
            data // Só os campos passados no corpo da requisição serão modificados
        });

        res.status(200).json({ message: "Review atualizado com sucesso", updatedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
});
      
/*
Objetivo

Desenvolver uma API que permita ao usuário:

Criar filmes 📜 // feito
Editar filmes 
Ler filmes // feito
Deletar filmes 
Criar novas reviews 🎯 // feito
Editar reviews existentes ✏️ 
Ler todas as reviews de um filme específico // tem q ver
Deletar reviews indesejadas 🗑️ 
Funcionalidades Principais

CRUD CRUD para filmes
CRUD para reviews de filmes
Integração com SQLite utilizando Prisma
Validação de dados com middlewares (opcional)
*/
