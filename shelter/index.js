console.log(
    'self-assessment criteria:\n' +
    '1. A new branch, shelter, has been created from main\n' +
    '2. Created a shelter folder inside the branch\n' +
    '3. Created index.html and index.js files in the shelter folder\n' +
    '4. Output to the browser console has been configured\n' +
    '5. Работа развернута через gh-pages\n'
)

document.addEventListener('DOMContentLoaded', function() {

    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const cards = Array.from(document.querySelectorAll('.card'));
    const totalCards = cards.length;
    const cardsPerView = 3;
    let currentIndex = 0;
    
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 320) {
            return 1; // На 320px показываем 1 карточку
        } else if (width <= 768) {
            return 2; // На 768px показываем 2 карточки
        } else {
            return 3; // На десктопе показываем 3 карточки
        }
    }

    function getCardWidthWithGap() {
        const card = cards[0];
        if (!card) return 310; // Значение по умолчанию
        const gap = 40; // Отступ между карточками
        return card.offsetWidth + gap;
    }

    function getVisibleWidth() {
        const viewport = document.querySelector('.slider-viewport');
        if (!viewport) return 890;
        return viewport.offsetWidth;
    }
    
    function updateSlider() {
        const offset = currentIndex * getCardWidthWithGap();
        track.style.transform = `translateX(-${offset}px)`;
        
        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex + cardsPerView >= totalCards;
        
        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
    }
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex + cardsPerView < totalCards) {
            currentIndex++;
            updateSlider();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    updateSlider();
    window.addEventListener('resize', updateSlider);
    
    const petsData = {
        'Katrine': {
            type: 'Cat',
            breed: 'British Shorthair',
            age: '2 years',
            description: 'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-katrine.png'
        },
        'Jennifer': {
            type: 'Dog',
            breed: 'Labrador',
            age: '2 months',
            description: 'Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-jennifer.png'
        },
        'Woody': {
            type: 'Dog',
            breed: 'Golden Retriever',
            age: '2 months',
            description: 'Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-woody.png'
        },
        'Sophia': {
            type: 'Dog',
            breed: 'Shih tzu',
            age: '2 months',
            description: 'Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-sophia.png'
        },
        'Timmy': {
            type: 'Cat',
            breed: 'British Shorthair',
            age: '2 months',
            description: 'Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-timmy.png'
        },
        'Charly': {
            type: 'Dog',
            breed: 'Jack Russell Terrier',
            age: '2 months',
            description: 'This cute boy, Charly, is three years old and he likes adults and kids. He isn\'t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-charly.png'
        },
        'Scarlet': {
            type: 'Dog',
            breed: 'Jack Russell Terrier',
            age: '2 months',
            description: 'Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-scarlet.png'
        },
        'Freddie': {
            type: 'Cat',
            breed: 'British Shorthair',
            age: '2 months',
            description: 'Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human\'s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.',
            Inoculations: 'none',
            Diseases: 'none',
            Parasites: 'none',
            img: 'images/pets-freddie.png'
        }
    };
    
    // Получаем элементы модального окна
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
    
    // Функция открытия модального окна
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
    
    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Назначаем обработчики на все кнопки "Learn more"
    const learnMoreBtns = document.querySelectorAll('.card-btn');
    learnMoreBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const petName = card.querySelector('.card-caption').textContent;
            openModal(petName);
        });
    });
    
    // Закрытие по клику на крестик
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // === ФУТЕР: ОБРАБОТЧИКИ ДЛЯ КОНТАКТОВ ===
    
    // 1. Email - открывает почтовый клиент
    const mailElement = document.querySelector('.mail');
    if (mailElement) {
        const email = 'email@shelter.com';
        mailElement.style.cursor = 'pointer';
        mailElement.addEventListener('click', function() {
            window.location.href = `mailto:${email}`;
        });
    }
    
    // 2. Телефон - открывает приложение для набора номера
    const phoneElement = document.querySelector('.phone');
    if (phoneElement) {
        const phone = '+136745677554';
        phoneElement.style.cursor = 'pointer';
        phoneElement.addEventListener('click', function() {
            window.location.href = `tel:${phone}`;
        });
    }
    
    // 3. Boston - открывает Google Maps
    const bostonElement = document.querySelector('.boston');
    if (bostonElement) {
        bostonElement.style.cursor = 'pointer';
        bostonElement.addEventListener('click', function() {
            const address = '1 Central Street, Boston, MA, USA';
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
        });
    }
    
    // 4. London - открывает Google Maps
    const londonElement = document.querySelector('.london');
    if (londonElement) {
        londonElement.style.cursor = 'pointer';
        londonElement.addEventListener('click', function() {
            const address = '18 South Park, London, UK';
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
        });
    }
});

// ===== БУРГЕР-МЕНЮ =====
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    if (burgerMenu) burgerMenu.classList.toggle('active');
    if (navMenu) navMenu.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function closeMenu() {
    if (burgerMenu) burgerMenu.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

if (burgerMenu) {
    burgerMenu.addEventListener('click', toggleMenu);
}

// Закрытие по клику на ссылку
document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 320) {
            closeMenu();
        }
    });
});

// Закрытие по клику на overlay
if (overlay) {
    overlay.addEventListener('click', closeMenu);
}

// Закрытие при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 320 && navMenu && navMenu.classList.contains('active')) {
        closeMenu();
    }
});