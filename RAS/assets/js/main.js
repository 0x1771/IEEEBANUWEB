document.addEventListener('DOMContentLoaded', function() {
    const imageSlider = document.getElementById('imageSlider');
    const imageTrack = imageSlider.querySelector('.image-track');
    const images = [
        'assets/images/event/AnitkabirZiyareti.jpg',
        'assets/images/event/MakersOnYarismasi.jpg',
        'assets/images/event/MalzemelerEgitimi.jpg',
        'assets/images/event/ProteusEgitimi.jpg',
        'assets/images/event/RAS-Ekibi.jpg',
        'assets/images/event/TemelEE-Egitimi-2.jpg',
        'assets/images/event/TemelEE-Egitimi.jpg',
        'assets/images/event/TUSAS-Gezisi.jpg'
    ];

    // Görselleri ekleyin
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        imageTrack.appendChild(img);
    });

    // Görsellerin tekrar etmesini sağlamak için klonlayın
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        imageTrack.appendChild(img);
    });

    // Toplam animasyon süresini ayarlayın
    const totalWidth = imageTrack.scrollWidth / 2;
    const animationDuration = totalWidth / 50; // 50px/s hızında kayar

    // CSS animasyon süresini ayarlayın
    imageTrack.style.animationDuration = `${animationDuration}s`;

    // Animasyonu durdurma ve tıklama olayı ekleme
    imageSlider.addEventListener('mouseover', function() {
        imageTrack.style.animationPlayState = 'paused';
    });

    imageSlider.addEventListener('mouseout', function() {
        imageTrack.style.animationPlayState = 'running';
    });

    imageSlider.addEventListener('click', function() {
        window.location.href = 'event.html';
    });
});