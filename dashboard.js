function sanitizeCropName(str) {
    if (!str) return 'Grand Naine (G9)';
    let parts = str.split(/CROP:|Crop:|Selected variety:|<br\s*\/?>|\n|\r/i)
                   .map(p => p.trim())
                   .filter(p => p.length > 0);
    return parts[0] || 'Grand Naine (G9)';
}

document.addEventListener('DOMContentLoaded', () => {
    const variantCards = document.querySelectorAll('.variant-card');
    const continueBtn = document.getElementById('continueBtn');
    let selectedVariant = localStorage.getItem('microsun_selected_variant') || null;

    // Check if variant was previously selected
    if (selectedVariant) {
        variantCards.forEach(card => {
            if (card.getAttribute('data-variant') === selectedVariant) {
                card.classList.add('active');
                enableContinueBtn();
            }
        });
    }

    // Add click handlers to all variant cards
    variantCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active state from all cards
            variantCards.forEach(c => c.classList.remove('active'));
            
            // Add active state to clicked card
            card.classList.add('active');
            
            // Store selected variant key & clean title
            selectedVariant = card.getAttribute('data-variant');
            const rawTitle = card.querySelector('h4') ? card.querySelector('h4').textContent.trim() : selectedVariant;
            const cleanTitle = sanitizeCropName(rawTitle);
            
            localStorage.setItem('microsun_selected_variant', selectedVariant);
            localStorage.setItem('microsun_selected_variant_name', cleanTitle);

            // Save to Firebase Firestore if available
            try {
                if (typeof db !== 'undefined' && db) {
                    const currentUser = JSON.parse(localStorage.getItem('microsun_current_user') || '{}');
                    if (currentUser.phone) {
                        db.collection('users').doc(currentUser.phone).set({
                            selectedVariant: selectedVariant,
                            selectedVariantName: cleanTitle,
                            updatedAt: new Date().toISOString()
                        }, { merge: true });
                    }
                }
            } catch (e) {
                console.warn("Firestore sync skipped:", e.message);
            }

            // Enable Continue button
            enableContinueBtn();
        });
    });

    function enableContinueBtn() {
        if (!continueBtn) return;
        continueBtn.disabled = false;
        continueBtn.classList.remove('disabled');
        continueBtn.style.opacity = '1';
        continueBtn.style.cursor = 'pointer';
        continueBtn.style.pointerEvents = 'auto';
    }

    // Continue button click navigation
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!selectedVariant) return;

            continueBtn.textContent = 'Proceeding to Region Selection...';
            setTimeout(() => {
                window.location.href = 'region.html';
            }, 300);
        });
    }
});
