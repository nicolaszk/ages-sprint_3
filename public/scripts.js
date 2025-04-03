document.addEventListener('DOMContentLoaded', () => {
    fetch('/filme') // requisita os filmes
        .then(response => response.json()) // muda pra json
        .then(data => { // com os dados da resposta..
            const filmesDiv = document.getElementById('filmes'); 
            filmesDiv.innerHTML = ''; 
      data.forEach(filme => {  // para cada filme da resposta
                    const div = document.createElement('div'); // criar uma div para cada filme
                    div.className = 'filme'; // colocar da mesma classe para estilizar com css
                    div.innerHTML = ` 
                        <h2>${filme.title}</h2> 
                        <p>Diretor: ${filme.director}</p>
                        <p>Ano: ${filme.year}</p>
                        <h3>Reviews:</h3>
                        <ul>
                            ${filme.reviews.map(review => `<li>Usuário: ${review.user}: ${review.comment}
                            - Nota: ${review.rating}
                            </li>`).join('')}
                        </ul>
                    `; 
                    filmesDiv.appendChild(div); // colocar na div q vai abrigar todos os filmes
 
                    const option = document.createElement('option'); // para cada filme, criar uma opcao para fazer review
                    option.value = filme.slug;
                    option.text = filme.title;
                    filmeSelect.appendChild(option); // colocar no select q vai ser utilizado pro review
                });
            });
});

  document.getElementById('filmeForm').addEventListener('submit', (e) => { // form para criar um novo filme
        e.preventDefault(); 

        const title = document.getElementById('filmeTitle').value;
        const director = document.getElementById('filmeDirector').value;
        const slug = document.getElementById('filmeSlug').value;
        const year = parseInt(document.getElementById('filmeYear').value); // pq so aceita valores de numero

        fetch('/filme', {  // fazer um post de um filme
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, slug, year }) //colocar em formato de json o titulo diretor slug e ano
        })
        .then(() => window.location.reload()) // recarregar a pagina para aparecer o novo filme
        .catch(error => console.error('Erro ao adicionar o filme:', error)); // se der erro...
    });

document.getElementById('reviewForm').addEventListener('submit', (e) => { // form para criar um review
    e.preventDefault();

    const selectedSlug = filmeSelect.value; // slug selecionado vai ser o valor do select selecionado
    const reviewContent = document.getElementById('reviewContent').value;
    const reviewUser = document.getElementById('reviewUser').value;
    const reviewRating = document.getElementById('reviewRating').value;   
    console.log('Slug selecionado:', selectedSlug);
    console.log('Usuário:', reviewUser);
    console.log('Conteúdo da review:', reviewContent);

    fetch(`/review/${selectedSlug}`, { // dar um post em review com o rating user e o comentario
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: reviewUser, comment: reviewContent, rating: parseInt(reviewRating) })
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Review adicionada com sucesso:', data);
        window.location.reload(); // recarregar a pagina
    })
    .catch(error => console.error('Erro ao adicionar a review:', error));
});

