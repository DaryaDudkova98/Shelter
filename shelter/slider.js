console.log(
    'self-assessment criteria:\n' +
    '1. A new branch, shelter, has been created from main\n' +
    '2. Created a shelter folder inside the branch\n' +
    '3. Created index.html and index.js files in the shelter folder\n' +
    '4. Output to the browser console has been configured\n' +
    '5. Работа развернута через gh-pages\n'
)

document.addEventListener('DOMContentLoaded', function() {
    let allPets = [];
    let petsDataLoaded = false;
    let petsData = {};
    let isAnimating = false;
    let animationTimer = null;

    async function loadPetsData() {
        try {
            const response = await fetch('pets.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            petsData = data.pets;
            allPets = Object.keys(petsData);
            
            petsDataLoaded = true;
            console.log('Данные загружены из pets.json:', allPets.length, 'питомцев');
            
            initSlider();
            
        } catch (error) {
            console.error('Ошибка загрузки pets.json:', error);
            showErrorMessage('Не удалось загрузить данные о питомцах. Пожалуйста, обновите страницу.');
        }
    }

    function showErrorMessage(message) {
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.innerHTML = `
                <div style="text-align: center; padding: 50px 20px; background: #fafafa; border-radius: 9px;">
                    <p style="font-family: Georgia, serif; font-size: 24px; color: #545454; margin-bottom: 20px;">
                        ${message}
                    </p>
                    <button onclick="location.reload()" style="padding: 15px 30px; background: #f1cdb3; border: none; border-radius: 100px; font-family: Georgia, serif; font-size: 17px; color: #292929; cursor: pointer;">
                        Обновить страницу
                    </button>
                </div>
            `;
        }
    }

    // ===== СЛАЙДЕР =====
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentPets = [];
    let previousPets = [];
    
    // Функция для определения количества карточек на экране
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 320) {
            return 1;
        } else if (width <= 768) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // Функция для получения параметров анимации в зависимости от разрешения
    function getAnimationParams() {
        const width = window.innerWidth;
        if (width <= 320) {
            return {
                cardDelay: 400,
                cardTransition: 0.8,
                slideTransition: 0.8,
                extraTime: 900,
                scaleFrom: 0.5
            };
        } else if (width <= 768) {
            return {
                cardDelay: 300,
                cardTransition: 0.7,
                slideTransition: 0.7,
                extraTime: 800,
                scaleFrom: 0.6
            };
        } else {
            return {
                cardDelay: 200,
                cardTransition: 0.6,
                slideTransition: 0.6,
                extraTime: 700,
                scaleFrom: 0.7
            };
        }
    }
    
    // Перемешивание массива
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Получение следующей группы
    function getNextPets(count) {
        if (allPets.length === 0) return [];
        
        let available = allPets.filter(pet => !currentPets.includes(pet));
        if (available.length < count) {
            available = allPets.filter(pet => !currentPets.includes(pet));
        }
        if (available.length < count) {
            available = [...allPets];
        }
        
        const shuffled = shuffleArray(available);
        return shuffled.slice(0, count);
    }
    
    // Обновление слайдера
    function updateSlider(direction) {
        if (isAnimating || !petsDataLoaded) {
            console.log('Animation in progress, click IGNORED!');
            const btn = direction === 'next' ? nextBtn : prevBtn;
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            return;
        }
        
        isAnimating = true;
        console.log(' Animation STARTED, clicks DISABLED');
        
        const animParams = getAnimationParams();
        console.log('📱 Animation params:', animParams);
        
        // Визуально блокируем кнопки
        prevBtn.style.opacity = '0.5';
        nextBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
        nextBtn.style.cursor = 'not-allowed';
        
        const cardsPerView = getCardsPerView();
        const newPets = getNextPets(cardsPerView);
        
        previousPets = [...currentPets];
        currentPets = newPets;
        
        const cards = track.querySelectorAll('.card');
        let delay = 0;
        
        cards.forEach((card, index) => {
            if (index < newPets.length) {
                const petName = newPets[index];
                const pet = petsData[petName];
                
                if (pet) {
                    const img = card.querySelector('.card-img');
                    const caption = card.querySelector('.card-caption');
                    const btn = card.querySelector('.card-btn');
                    
                    if (img) {
                        img.src = pet.img;
                        img.alt = petName;
                    }
                    if (caption) {
                        caption.textContent = petName;
                    }
                    
                    if (btn) {
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);
                        newBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            openModal(petName);
                        });
                    }
                    
                    card.style.opacity = '0';
                    card.style.transform = `scale(${animParams.scaleFrom})`;
                    card.style.display = 'block';
                    
                    const cardDelay = animParams.cardDelay + index * 300;
                    
                    setTimeout(() => {
                        card.style.transition = `all ${animParams.cardTransition}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, cardDelay);
                    
                    delay = Math.max(delay, cardDelay);
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        track.style.transition = 'none';
        track.style.transform = 'translateX(0px)';
        void track.offsetHeight;
        track.style.transition = `transform ${animParams.slideTransition}s ease`;
        
        // Разблокировка после завершения всех анимаций
        const totalTime = delay + animParams.extraTime;
        console.log(`Animation will finish in ${totalTime}ms`);
        
        // Очищаем предыдущий таймер
        if (animationTimer) {
            clearTimeout(animationTimer);
        }
        
        animationTimer = setTimeout(() => {
            isAnimating = false;
            console.log('Animation FINISHED, clicks ENABLED');
            
            prevBtn.style.opacity = '1';
            nextBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
            nextBtn.style.cursor = 'pointer';
            
            animationTimer = null;
        }, totalTime);
    }
    
    // Инициализация слайдера
    function initSlider() {
        if (!petsDataLoaded || allPets.length === 0) {
            console.log('Данные еще не загружены');
            return;
        }
        
        const cardsPerView = getCardsPerView();
        const shuffled = shuffleArray([...allPets]);
        currentPets = shuffled.slice(0, cardsPerView);
        previousPets = [];
        
        const cards = track.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            if (index < currentPets.length) {
                const petName = currentPets[index];
                const pet = petsData[petName];
                
                if (pet) {
                    const img = card.querySelector('.card-img');
                    const caption = card.querySelector('.card-caption');
                    const btn = card.querySelector('.card-btn');
                    
                    if (img) {
                        img.src = pet.img;
                        img.alt = petName;
                    }
                    if (caption) {
                        caption.textContent = petName;
                    }
                    if (btn) {
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);
                        newBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            openModal(petName);
                        });
                    }
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        track.style.transition = 'none';
        track.style.transform = 'translateX(0px)';
    }
    
    // Обработчики кнопок
    nextBtn.addEventListener('click', function() {
        console.log('Next button clicked, isAnimating:', isAnimating);
        if (!isAnimating && petsDataLoaded) {
            updateSlider('next');
        }
    });
    
    prevBtn.addEventListener('click', function() {
        console.log('Prev button clicked, isAnimating:', isAnimating);
        if (!isAnimating && petsDataLoaded) {
            updateSlider('prev');
        }
    });
    
    // Кнопки всегда активны визуально
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    prevBtn.style.opacity = '1';
    prevBtn.style.cursor = 'pointer';
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
    
    // Обновление при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (petsDataLoaded && !isAnimating) {
                const cardsPerView = getCardsPerView();
                if (currentPets.length !== cardsPerView) {
                    const shuffled = shuffleArray([...allPets]);
                    currentPets = shuffled.slice(0, cardsPerView);
                    previousPets = [];
                    const cards = track.querySelectorAll('.card');
                    
                    cards.forEach((card, index) => {
                        if (index < currentPets.length) {
                            const petName = currentPets[index];
                            const pet = petsData[petName];
                            if (pet) {
                                const img = card.querySelector('.card-img');
                                const caption = card.querySelector('.card-caption');
                                if (img) {
                                    img.src = pet.img;
                                    img.alt = petName;
                                }
                                if (caption) {
                                    caption.textContent = petName;
                                }
                                card.style.display = 'block';
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0px)';
                }
            }
        }, 300);
    });
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    const modal = document.getElementById('modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalAge = document.getElementById('modalAge');
    const modalVaccinations = document.getElementById('modalVaccinations');
    const modalDiseases = document.getElementById('modalDiseases');
    const modalParasites = document.getElementById('modalParasites');
    
    function openModal(petName) {
        const pet = petsData[petName];
        if (pet) {
            modalImg.src = pet.img;
            modalImg.alt = petName;
            modalName.textContent = petName;
            modalSubtitle.textContent = `${pet.type} - ${pet.breed}`;
            modalDescription.textContent = pet.description;
            modalAge.textContent = pet.age;
            modalVaccinations.textContent = pet.Inoculations || 'none';
            modalDiseases.textContent = pet.Diseases || 'none';
            modalParasites.textContent = pet.Parasites || 'none';
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // ===== ЗАГРУЗКА ДАННЫХ =====
    loadPetsData();
});