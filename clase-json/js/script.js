const galery = document.getElementById('galery');
const url = 'https://johnfredyb.github.io/mars-photos-api/mars_photos.json';

fetch(url)
    .then(response => response.json())
    .then(data => {
        // Limpiar el contenido existente
        galery.textContent = '';
        data.forEach(item => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');

            const imagen = document.createElement('img');
            imagen.src = item.img_src;
            imagen.alt = item.description;

            //crear el texto descriptivo
            const texto = document.createElement('p');
            texto.textContent = item.description;

            //agregar la imagen y el texto a la tarjeta
            tarjeta.appendChild(imagen);
            tarjeta.appendChild(texto);

            //agregar la tarjeta a la galería
            galery.appendChild(tarjeta);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
