// Fecha objetivo: 1 de septiembre de 2025 a las 12:00 PM hora de Colombia (UTC-5)
const TARGET_DATE = new Date('2025-09-01T18:21:00-05:00');

// Contador de tiempo
function updateCountdown() {
    const now = new Date();
    const timeDifference = TARGET_DATE - now;

    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            Debes esperar: ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos
        `;
    } else {
        document.getElementById('countdown').innerHTML = "¡Ha llegado el momento!";
    }
}

// Verificar si la fecha objetivo ha llegado
function isDateReached() {
    const now = new Date();
    return now >= TARGET_DATE;
}

// Función para verificar contraseña y fecha
function checkPassword() {
    // Primero verificar si la fecha ha llegado
    if (!isDateReached()) {
        alert("Debes esperar hasta el 01 de septiembre de 2025 a las 21:00.");
        return;
    }
    
    // Si la fecha ha llegado, pedir contraseña
    let password = prompt("Ha llegado el momento. Ingrese la contraseña:");
    if (password === "GAGB") {
        document.getElementById("content").style.display = "flex";
        document.querySelector(".button-container").style.display = "none";
        
        // Intentar reproducir música de fondo
        const backgroundMusic = document.getElementById("background-music");
        if (backgroundMusic) {
            backgroundMusic.play().catch(error => {
                console.log("No se pudo reproducir la música automáticamente:", error);
            });
        }
    } else if (password !== null) { // Si no canceló el prompt
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
    }
}

function showFullContent() {
    document.querySelector(".pre-opening").style.display = "none";
    document.querySelector(".full-content").style.display = "block";
}

function goBack() {
    document.querySelector(".full-content").style.display = "none";
    document.querySelector(".pre-opening").style.display = "flex";
}

// Actualizar botón según el estado de la fecha
function updateButton() {
    const button = document.querySelector(".access-button");
    if (button && button.textContent === "¡Bienvenida!") {
        if (isDateReached()) {
            button.textContent = "¡El momento ha llegado!";
            button.style.background = "linear-gradient(145deg, #059669, #047857)";
            button.style.boxShadow = "0 8px 20px rgba(5, 150, 105, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
        } else {
            button.textContent = "¡Bienvenida!";
        }
    }
}

// Función de inicialización
function init() {
    updateCountdown();
    updateButton();
    
    // Actualizar contador cada segundo
    setInterval(() => {
        updateCountdown();
        updateButton();
    }, 1000);
}

// Inicializar cuando la página se carga
document.addEventListener('DOMContentLoaded', init);

// También inicializar inmediatamente en caso de que el DOM ya esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
