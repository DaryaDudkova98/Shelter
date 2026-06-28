// modal.js
console.log('Modal module loaded');

let scrollPosition = 0;

// ===== ФУНКЦИЯ ДЛЯ БЛОКИРОВКИ СКРОЛЛА =====
function lockScroll() {
    console.log('Lock scroll called');

    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    console.log('Scroll position saved:', scrollPosition);

    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    
    console.log('Body has no-scroll?', document.body.classList.contains('no-scroll'));
    
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('height', '100%', 'important');
    document.body.style.setProperty('position', 'fixed', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    document.body.style.setProperty('top', `-${scrollPosition}px`, 'important');
    document.body.style.setProperty('left', '0', 'important');
    document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-y', 'hidden', 'important');
    
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    document.documentElement.style.setProperty('height', '100%', 'important');
    
    console.log('Body overflow:', getComputedStyle(document.body).overflow);
    console.log('Body position:', getComputedStyle(document.body).position);
    console.log('Body height:', getComputedStyle(document.body).height);
    console.log('Body top:', getComputedStyle(document.body).top);
    console.log('Body classes:', document.body.className);
}

function unlockScroll() {
    console.log('Unlock scroll called');
    
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');

    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.overflowX = '';
    document.body.style.overflowY = '';
    
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';

    if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition);
        console.log('Scroll restored to:', scrollPosition);
    }
    
    console.log('Scroll unlocked');
}

// ===== МОДАЛЬНОЕ ОКНО =====
function openModal(pet) {
    console.log('📂 Open modal for:', pet.name);
    
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalAge = document.getElementById('modalAge');
    const modalVaccinations = document.getElementById('modalVaccinations');
    const modalDiseases = document.getElementById('modalDiseases');
    const modalParasites = document.getElementById('modalParasites');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Заполняем данные
    if (modalImg) modalImg.src = pet.img || '';
    if (modalName) modalName.textContent = pet.name || 'Unknown';
    if (modalSubtitle) modalSubtitle.textContent = `${pet.type || ''} - ${pet.breed || ''}`;
    if (modalDescription) modalDescription.textContent = pet.description || '';
    if (modalAge) modalAge.textContent = pet.age || 'Unknown';
    
    // Заполняем списки с проверкой
    if (modalVaccinations) {
        const vaccinations = pet.inoculations || pet.Inoculations || [];
        modalVaccinations.textContent = Array.isArray(vaccinations) ? vaccinations.join(', ') : vaccinations || 'none';
    }
    if (modalDiseases) {
        const diseases = pet.diseases || pet.Diseases || [];
        modalDiseases.textContent = Array.isArray(diseases) ? diseases.join(', ') : diseases || 'none';
    }
    if (modalParasites) {
        const parasites = pet.parasites || pet.Parasites || [];
        modalParasites.textContent = Array.isArray(parasites) ? parasites.join(', ') : parasites || 'none';
    }

    // Показываем модальное окно
    modal.style.display = 'flex';
    modal.classList.add('active');
    
    // БЛОКИРУЕМ СКРОЛЛ
    lockScroll();
    
    console.log('Modal opened for:', pet.name);
}

function closeModal() {
    console.log('Close modal');
    
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        
        // РАЗБЛОКИРУЕМ СКРОЛЛ
        unlockScroll();
        
        console.log('Modal closed');
    }
}

window.openModal = openModal;
window.closeModal = closeModal;
window.lockScroll = lockScroll;
window.unlockScroll = unlockScroll;

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal init');
    const modal = document.getElementById('modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        // Закрытие по клику на фон
        modal.addEventListener('click', function(e) {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }
});

console.log('Modal module loaded');
console.log('Functions: openModal(pet), closeModal(), lockScroll(), unlockScroll()');