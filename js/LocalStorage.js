//! Función para mostrar los comentarios guardados en LocalStorage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        displayComment(comment.name, comment.message, comment.rating);
    });
}

function displayStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star text-warning"></i>'; // estrella llena
        } else {
            starsHTML += '<i class="far fa-star text-warning"></i>'; // estrella vacía
        }
    }
    return starsHTML;
}

//! Función para mostrar un comentario en la página
function displayComment(name, message, rating) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('col'); // Añadido para alinearse a la disposición de las columnas
    commentDiv.innerHTML = `
        <div class="card h-100">
            <div class="card-body text-center">
                <img src="img/default.jpg" alt="Imagen de cliente" class="img-fluid rounded-circle mb-3 mx-auto d-block" style="width: 65px; height: 65px;">
                <h5 class="card-title">${name}</h5>
                <div class="mb-2">${displayStars(rating)}</div> <!-- Aquí se insertan las estrellas -->
                <p class="card-text">${message}</p>
            </div>
        </div>
    `;
    document.getElementById('commentsSection').appendChild(commentDiv);
}


//! Cargar comentarios al cargar la página
loadComments();

//! Manejar el envío del formulario
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); //! Evita que se envíe el formulario de manera tradicional

    //! Obtener los valores del formulario
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;
    var rating = document.getElementById('rating').value;

    //! Obtener los comentarios guardados en LocalStorage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    //! Verificar si ya hay 10 comentarios
    if (comments.length >= 10) {
        alert('Límite de comentarios alcanzado');
        return; //! Detener la ejecución si se alcanza el límite
    }

    //! Guardar el nuevo comentario en LocalStorage
    const newComment = { name, message, rating };
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    //! Mostrar el nuevo comentario en la página
    displayComment(name, message, rating);

    //! Limpiar el formulario después de enviar el comentario
    document.getElementById('commentForm').reset();
});