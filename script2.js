// Mostrar el botón de WhatsApp después de 10 segundos
setTimeout(() => {
    const whatsappButton = document.getElementById('whatsapp-button');
    whatsappButton.classList.remove('hidden');
}, 10000);

// Función para contactar por WhatsApp
function contactWhatsApp() {
    // Reemplaza este número con el número de WhatsApp real de la empresa
    const phoneNumber = '573XXXXXXXXX';
    const message = 'Hola, me interesa conocer más sobre sus productos';
    const whatsappUrl = `https://api.whatsapp.com/message/NCECOT6YVSAGH1?autoload=1&app_absent=0`;
    window.open(whatsappUrl, '_blank');
}

// Cambiar imagen del producto según el color seleccionado
document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', function() {
        const colorName = this.getAttribute('data-color');
        const card = this.closest('.producto-card');
        const img = card.querySelector('img');
        const currentSrc = img.src;
        
        // Aquí podrías tener un objeto con las URLs de las imágenes según el color
        // Por ahora solo mostraremos una alerta
        alert(`Color seleccionado: ${colorName}`);
    });
});

// Animación suave al scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación del header al hacer scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});