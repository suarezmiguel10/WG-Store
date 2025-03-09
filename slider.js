document.addEventListener('DOMContentLoaded', () => {
    const productData = {
        media: [
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
            },
            {
                type: 'video',
                url: 'https://player.vimeo.com/external/373839510.sd.mp4?s=8a49f713f0fcd767cd65b10b5cd227bb0f2c5b77&profile_id=164&oauth2_token_id=57447761',
                thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
            },
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80'
            },
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80'
            }
        ]
    };

    let currentSlide = 0;
    let isPlaying = false;
    let selectedSize = 'M';
    let selectedColor = 'Black';
    
    const sliderContent = document.querySelector('.slider-content');
    const thumbnails = document.querySelector('.thumbnails');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    const whatsappBtn = document.querySelector('.whatsapp-btn');

    // Initialize slider
    function initializeSlider() {
        // Create thumbnails
        productData.media.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = item.type === 'video' ? item.thumbnail : item.url;
            img.alt = `Thumbnail ${index + 1}`;
            
            thumbnail.appendChild(img);

            if (item.type === 'video') {
                const videoIndicator = document.createElement('div');
                videoIndicator.className = 'video-indicator';
                videoIndicator.textContent = '▶';
                thumbnail.appendChild(videoIndicator);
            }

            thumbnail.addEventListener('click', () => showSlide(index));
            thumbnails.appendChild(thumbnail);
        });

        showSlide(0);
        updateWhatsAppLink();
    }

    function showSlide(index) {
        currentSlide = index;
        const media = productData.media[index];
        const thumbnailElements = document.querySelectorAll('.thumbnail');
        
        thumbnailElements.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        sliderContent.innerHTML = '';

        if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.url;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            if (isPlaying) video.play();
            sliderContent.appendChild(video);
            playBtn.style.display = 'flex';
        } else {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = 'Product image';
            sliderContent.appendChild(img);
            playBtn.style.display = 'none';
        }
    }

    function updateWhatsAppLink() {
        const productTitle = document.querySelector('.product-title').textContent;
        const price = document.querySelector('.current-price').textContent;
        const message = `Hi! I'm interested in the ${productTitle} (${price}) in size ${selectedSize} and ${selectedColor} color.`;
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://api.whatsapp.com/message/NCECOT6YVSAGH1?autoload=1&app_absent=0`; // Replace with your WhatsApp number
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % productData.media.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + productData.media.length) % productData.media.length);
    }

    function togglePlay() {
        const video = sliderContent.querySelector('video');
        if (!video) return;

        isPlaying = !isPlaying;
        if (isPlaying) {
            video.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            video.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    playBtn.addEventListener('click', togglePlay);

    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.textContent;
            updateWhatsAppLink();
        });
    });

    // Color selection
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.title;
            updateWhatsAppLink();
        });
    });

    // Initialize the slider
    initializeSlider();
});