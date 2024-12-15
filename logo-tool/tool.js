document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('imageUpload').click();
});

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                // Görselin boyutlarını kontrol et
                const width = img.width;
                const height = img.height;

                // 1:1 kontrolü (eğer boyutlar eşitse)
                if (width === height) {
                    console.log('Görsel 1:1 oranında');
                } else {
                    console.log('Görsel farklı oranlarda');
                }

                // Görseli yerleştir
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = ''; // Önceki görseli temizle
                imageContainer.appendChild(img);
            };
        };

        reader.readAsDataURL(file);
    }
});
