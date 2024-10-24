document.addEventListener("DOMContentLoaded", function() {
    const motifSelect = document.getElementById('motif-select');
    const mainImage = document.getElementById('main-product-image');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Markera första bilden som vald när sidan laddas
    const firstImage = galleryItems[0];
    firstImage.classList.add("selected");
    
    // Se till att huvudbilden matchar den första bildens motiv
    mainImage.src = `motiv/${firstImage.getAttribute("data-motif")}.jpg`;

    // Byt huvudbild och uppdatera .selected när man väljer från dropdown-menyn
    motifSelect.addEventListener('change', function() {
        const selectedMotif = motifSelect.value;
        mainImage.src = `motiv/${selectedMotif}.jpg`;

        // Uppdatera .selected-klass på bild i galleriet som matchar valet i dropdown-menyn
        galleryItems.forEach(item => {
            if (item.getAttribute('data-motif') === selectedMotif) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });

    // Byt huvudbild och markera vald bild när man klickar på en bild i galleriet
    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            // Ta bort "selected" klassen från alla bilder
            galleryItems.forEach(i => i.classList.remove("selected"));

            // Lägg till "selected" klassen på den klickade bilden
            item.classList.add("selected");

            // Uppdatera huvudbilden och dropdown-menyn
            const newSrc = item.getAttribute("data-motif");
            mainImage.src = `motiv/${newSrc}.jpg`;
            motifSelect.value = newSrc; // Ändra dropdown så att den matchar valt motiv
        });
    });
});
