// modal.js
console.log('Modal module loaded');

// ===== ФУНКЦИЯ ДЛЯ БЛОКИРОВКИ СКРОЛЛА =====
function lockScroll() {
    console.log('🔒 Lock scroll called');
    
    // Добавляем классы
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    
    // Проверяем, что класс добавился
    console.log('Body has no-scroll?', document.body.classList.contains('no-scroll'));
    
    // ===== ПРИНУДИТЕЛЬНО УСТАНАВЛИВАЕМ СТИЛИ =====
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('height', '100%', 'important');
    document.body.style.setProperty('position', 'fixed', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    document.body.style.setProperty('top', '0', 'important');
    document.body.style.setProperty('left', '0', 'important');
    document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow-y', 'hidden', 'important');
    
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    document.documentElement.style.setProperty('height', '100%', 'important');
    
    // Проверяем, что стили применились
    console.log('Body overflow:', getComputedStyle(document.body).overflow);
    console.log('Body position:', getComputedStyle(document.body).position);
    console.log('Body height:', getComputedStyle(document.body).height);
    console.log('Body classes:', document.body.className);
}

function unlockScroll() {
    console.log('🔓 Unlock scroll called');
    
    // Убираем классы
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
    
    // Снимаем блокировку
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
    
    console.log('✅ Scroll unlocked');
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
    if (modalImg) modalImg.src = pet.img;
    if (modalName) modalName.textContent = pet.name;
    if (modalSubtitle) modalSubtitle.textContent = `${pet.type} - ${pet.breed}`;
    if (modalDescription) modalDescription.textContent = pet.description;
    if (modalAge) modalAge.textContent = pet.age;
    if (modalVaccinations) modalVaccinations.textContent = pet.inoculations.join(', ');
    if (modalDiseases) modalDiseases.textContent = pet.diseases.join(', ') || 'None';
    if (modalParasites) modalParasites.textContent = pet.parasites.join(', ') || 'None';

    // Показываем модальное окно
    modal.style.display = 'flex';
    modal.classList.add('active');
    
    // БЛОКИРУЕМ СКРОЛЛ
    lockScroll();
    
    console.log('✅ Modal opened');
}

function closeModal() {
    console.log('📂 Close modal');
    
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        
        // РАЗБЛОКИРУЕМ СКРОЛЛ
        unlockScroll();
        
        console.log('✅ Modal closed');
    }
}

// Делаем функции глобальными
window.openModal = openModal;
window.closeModal = closeModal;

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