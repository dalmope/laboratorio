
function transformarEnlaceDrive(url) {
    const match = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
}

const generateHtml = (personaje, imagenURL) => `
    <img src="${imagenURL}" alt="${personaje.nombre || 'Sin imagen'}">
    <div class="card-content">
        <h2>${personaje.nombre || 'Nombre no disponible'}</h2>
        <p><strong>Aldea:</strong> ${personaje.aldea || 'Desconocida'}</p>
        <p><strong>Rango:</strong> ${personaje.rango || 'Sin rango'}</p>
        <div class="abilities">
            <strong>Jutsus:</strong>
            <div>${Array.isArray(personaje.jutsus) ? personaje.jutsus.map(h => `<span class='habilidad'>${h}</span>`).join('') : 'No habilidades disponibles'}</div>
        </div>
    </div>
`;

function crearTarjeta(personaje) {
    const imagenURL = personaje.imagen?.includes('drive.google.com')
        ? transformarEnlaceDrive(personaje.imagen)
        : personaje.imagen ?? 'https://via.placeholder.com/300x200?text=Sin+Imagen';

    const tarjeta = document.createElement('div');
    tarjeta.className = 'card';

    tarjeta.innerHTML = generateHtml(personaje, imagenURL);

    return tarjeta;
}

async function cargarPersonajes() {
    try {
        const respuesta = await fetch('https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json');
        const data = await respuesta.json();

        const personajes = data.personajes;
        const contenedor = document.getElementById('personajes');

        personajes.forEach(personaje => {
            const tarjeta = crearTarjeta(personaje);
            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error('Error al cargar los personajes:', error);
        const contenedor = document.getElementById('personajes');
        contenedor.innerHTML = '<p style="color:red;">No se pudieron cargar los personajes. Intenta de nuevo más tarde.</p>';
    }
}

cargarPersonajes();

document.getElementById('formulario-personaje').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nombre = formData.get('nombre');
    const aldea = formData.get('aldea');
    const rango = formData.get('rango');
    const imagen = formData.get('imagen');
    const jutsus = formData.get('jutsus')
        ? formData.get('jutsus').split(',').map(j => j.trim())
        : [];

    const nuevoPersonaje = {
        nombre,
        aldea,
        rango,
        imagen,
        jutsus
    };

    const contenedor = document.getElementById('personajes');
    const tarjeta = crearTarjeta(nuevoPersonaje);
    contenedor.appendChild(tarjeta);

    e.target.reset();
});
