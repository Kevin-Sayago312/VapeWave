//! Función para mostrar los comentarios guardados en LocalStorage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        displayComment(comment.name, comment.message, comment.rating);
    });
}

//! Función para mostrar un comentario en la página
function displayComment(name, message, rating) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
            <div class="d-flex justify-content-center align-items-center text-center">
                <div class="card" style="width: 30rem;">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6>(${rating} estrellas)</h6>
                        <p class="card-text">${message}</p>
                    </div>
                </div>
            </div>
            <hr>
        
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

    //! Guardar el comentario en LocalStorage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const newComment = { name, message, rating };
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    //! Mostrar el nuevo comentario en la página
    displayComment(name, message, rating);

    //! Limpiar el formulario después de enviar el comentario
    document.getElementById('commentForm').reset();
});