// pagination.js
console.log('Pagination module loaded');

// ===== ЗАГРУЗКА ДАННЫХ ИЗ PETS.JSON =====
let allPets = [];
let petsDataLoaded = false;

async function loadPetsData() {
    try {
        const response = await fetch('pets.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const petsObject = data.pets;
        allPets = Object.keys(petsObject).map(function(name) {
            const pet = petsObject[name];
            return {
                name: name,
                type: pet.type,
                breed: pet.breed,
                age: pet.age,
                description: pet.description,
                inoculations: pet.Inoculations ? [pet.Inoculations] : ['none'],
                diseases: pet.Diseases ? [pet.Diseases] : ['none'],
                parasites: pet.Parasites ? [pet.Parasites] : ['none'],
                img: pet.img
            };
        });
        
        petsDataLoaded = true;
        console.log('Данные загружены из pets.json:', allPets.length, 'питомцев');
        initPagination();
        
    } catch (error) {
        console.error('Ошибка загрузки pets.json:', error);
        showErrorMessage('Не удалось загрузить данные о питомцах. Пожалуйста, обновите страницу.');
    }
}

function showErrorMessage(message) {
    const petsGrid = document.getElementById('petsGrid');
    if (petsGrid) {
        petsGrid.innerHTML = 
            '<div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fafafa; border-radius: 9px;">' +
                '<p style="font-family: Georgia, serif; font-size: 24px; color: #545454; margin-bottom: 20px;">' + message + '</p>' +
                '<button onclick="location.reload()" style="padding: 15px 30px; background: #f1cdb3; border: none; border-radius: 100px; font-family: Georgia, serif; font-size: 17px; color: #292929; cursor: pointer;">' +
                    'Обновить страницу' +
                '</button>' +
            '</div>';
    }
}

// ===== КОНФИГУРАЦИЯ ПАГИНАЦИИ =====
var CARDS_PER_PAGE_DESKTOP = 8;
var CARDS_PER_PAGE_TABLET = 6;
var CARDS_PER_PAGE_MOBILE = 3;

var petsGrid = document.getElementById('petsGrid');
var pageNumber = document.getElementById('pageNumber');
var firstPageBtn = document.getElementById('firstPageBtn');
var prevPageBtn = document.getElementById('prevPageBtn');
var nextPageBtn = document.getElementById('nextPageBtn');
var lastPageBtn = document.getElementById('lastPageBtn');

var currentPage = 1;
var totalPages = 0;
var currentCardsPerPage = CARDS_PER_PAGE_DESKTOP;
var petsSequence = [];

// ===== БУРГЕР-МЕНЮ =====
function initBurgerMenu() {
    var burgerMenu = document.getElementById('burgerMenu');
    var navMenu = document.getElementById('navMenu');

    function toggleMenu() {
        if (burgerMenu) burgerMenu.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
    }

    function closeMenu() {
        if (burgerMenu) burgerMenu.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }

    var menuLinks = document.querySelectorAll('.menu ul li a');
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ===== ФУНКЦИИ ПАГИНАЦИИ =====
function getCardsPerPage() {
    if (window.matchMedia('(max-width: 320px)').matches) {
        return CARDS_PER_PAGE_MOBILE;
    } else if (window.matchMedia('(max-width: 768px)').matches) {
        return CARDS_PER_PAGE_TABLET;
    }
    return CARDS_PER_PAGE_DESKTOP;
}

function generatePetsSequence() {
    if (allPets.length === 0) return [];
    
    var TOTAL_PETS = 48;
    var sequence = [];
    var petNames = allPets.map(function(p) { return p.name; });
    var expectedCount = TOTAL_PETS / petNames.length;
    
    var attempts = 0;
    while (sequence.length < TOTAL_PETS && attempts < 10000) {
        attempts++;
        var shuffled = shuffleArray([...petNames]);
        for (var i = 0; i < shuffled.length; i++) {
            var name = shuffled[i];
            if (sequence.length === 0 || sequence[sequence.length - 1] !== name) {
                sequence.push(name);
                if (sequence.length === TOTAL_PETS) break;
            }
        }
    }
    
    while (sequence.length < TOTAL_PETS) {
        for (var j = 0; j < petNames.length; j++) {
            var name = petNames[j];
            if (sequence.length === 0 || sequence[sequence.length - 1] !== name) {
                sequence.push(name);
                if (sequence.length === TOTAL_PETS) break;
            }
        }
    }
    
    var counts = {};
    for (var k = 0; k < sequence.length; k++) {
        var name = sequence[k];
        counts[name] = (counts[name] || 0) + 1;
    }
    
    for (var name in counts) {
        if (counts[name] !== expectedCount) {
            return generatePetsSequence();
        }
    }
    
    return sequence.map(function(name) {
        return allPets.find(function(p) { return p.name === name; });
    });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function renderPets(page) {
    if (!petsDataLoaded || petsSequence.length === 0) {
        console.log('Данные еще не загружены');
        return;
    }

    var cardsPerPage = getCardsPerPage();
    currentCardsPerPage = cardsPerPage;
    totalPages = Math.ceil(petsSequence.length / cardsPerPage);
    
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;
    currentPage = page;

    var start = (page - 1) * cardsPerPage;
    var end = start + cardsPerPage;
    var pagePets = petsSequence.slice(start, end);

    petsGrid.innerHTML = '';
    for (var i = 0; i < pagePets.length; i++) {
        var pet = pagePets[i];
        var card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = 
            '<img class="card-img" src="' + pet.img + '" alt="' + pet.name + '">' +
            '<p class="card-caption">' + pet.name + '</p>' +
            '<button class="card-btn">Learn more</button>';
        
        card.addEventListener('click', function(pet) {
            return function() {
                window.openModal(pet);
            };
        }(pet));
        petsGrid.appendChild(card);
    }

    updatePagination();
}

function updatePagination() {
    pageNumber.textContent = currentPage;
    firstPageBtn.disabled = currentPage === 1;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    lastPageBtn.disabled = currentPage === totalPages;
    
    var buttons = [firstPageBtn, prevPageBtn];
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        btn.style.opacity = currentPage === 1 ? '0.5' : '1';
        btn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
    }
    
    var buttons2 = [nextPageBtn, lastPageBtn];
    for (var j = 0; j < buttons2.length; j++) {
        var btn2 = buttons2[j];
        btn2.style.opacity = currentPage === totalPages ? '0.5' : '1';
        btn2.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
    }
}

function initPagination() {
    console.log('Инициализация пагинации с', allPets.length, 'питомцами');
    petsSequence = generatePetsSequence();
    console.log('Сгенерировано', petsSequence.length, 'карточек');
    
    if (petsSequence.length !== 48) {
        console.warn('Ожидалось 48 карточек, получено:', petsSequence.length);
        while (petsSequence.length < 48) {
            for (var i = 0; i < allPets.length; i++) {
                var pet = allPets[i];
                if (petsSequence.length === 0 || petsSequence[petsSequence.length - 1].name !== pet.name) {
                    petsSequence.push(pet);
                    if (petsSequence.length === 48) break;
                }
            }
        }
    }
    renderPets(1);
}

// ===== ОБРАБОТЧИКИ КНОПОК =====
firstPageBtn.addEventListener('click', function() {
    if (currentPage !== 1) renderPets(1);
});

prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) renderPets(currentPage - 1);
});

nextPageBtn.addEventListener('click', function() {
    if (currentPage < totalPages) renderPets(currentPage + 1);
});

lastPageBtn.addEventListener('click', function() {
    if (currentPage !== totalPages) renderPets(totalPages);
});

// ===== АДАПТИВНОСТЬ =====
var resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (petsDataLoaded && petsSequence.length > 0) {
            var newCardsPerPage = getCardsPerPage();
            if (newCardsPerPage !== currentCardsPerPage) {
                var newTotalPages = Math.ceil(petsSequence.length / newCardsPerPage);
                if (currentPage > newTotalPages) currentPage = newTotalPages;
                renderPets(currentPage);
            }
        }
    }, 300);
});

// ===== ЗАГРУЗКА ДАННЫХ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pagination init');
    initBurgerMenu();
    loadPetsData();
});