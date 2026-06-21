console.log('Our pets page loaded');

document.addEventListener('DOMContentLoaded', function() {
    const allPets = [
        { name: 'Katrine', type: 'Cat', breed: 'British Shorthair', age: '2 years', description: 'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-katrine.png' },
        { name: 'Jennifer', type: 'Dog', breed: 'Labrador', age: '2 months', description: 'Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-jennifer.png' },
        { name: 'Woody', type: 'Dog', breed: 'Golden Retriever', age: '2 months', description: 'Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-woody.png' },
        { name: 'Sophia', type: 'Dog', breed: 'Shih tzu', age: '2 months', description: 'Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-sophia.png' },
        { name: 'Timmy', type: 'Cat', breed: 'British Shorthair', age: '2 months', description: 'Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-timmy.png' },
        { name: 'Charly', type: 'Dog', breed: 'Jack Russell Terrier', age: '2 months', description: 'This cute boy, Charly, is three years old and he likes adults and kids. He isn\'t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-charly.png' },
        { name: 'Scarlet', type: 'Dog', breed: 'Jack Russell Terrier', age: '2 months', description: 'Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-scarlet.png' },
        { name: 'Freddie', type: 'Cat', breed: 'British Shorthair', age: '2 months', description: 'Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human\'s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.', inoculations: ['none'], diseases: ['none'], parasites: ['none'], img: 'images/pets-freddie.png' }
    ];

    const CARDS_PER_PAGE_DESKTOP = 8;
    const CARDS_PER_PAGE_TABLET = 6;
    const CARDS_PER_PAGE_MOBILE = 3;

    const petsGrid = document.getElementById('petsGrid');
    const pageNumber = document.getElementById('pageNumber');
    const firstPageBtn = document.getElementById('firstPageBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const lastPageBtn = document.getElementById('lastPageBtn');

    let currentPage = 1;
    let totalPages = 0;
    let currentCardsPerPage = CARDS_PER_PAGE_DESKTOP;

    // ===== BURGER-MENU =====
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

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

    document.querySelectorAll('.menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    function getCardsPerPage() {
        if (window.matchMedia('(max-width: 320px)').matches) {
            console.log('Using MOBILE: 3 cards');
            return CARDS_PER_PAGE_MOBILE;
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            console.log('Using TABLET: 6 cards');
            return CARDS_PER_PAGE_TABLET;
        }
        console.log('Using DESKTOP: 8 cards');
        return CARDS_PER_PAGE_DESKTOP;
    }

    function renderPets(page) {
        const cardsPerPage = getCardsPerPage();
        currentCardsPerPage = cardsPerPage;
        totalPages = Math.ceil(allPets.length / cardsPerPage);
        
        console.log('Total pages:', totalPages);
        console.log('All pets count:', allPets.length);
        console.log('Cards per page:', cardsPerPage);
        
        if (page > totalPages) {
            page = totalPages;
        }
        if (page < 1) {
            page = 1;
        }
        currentPage = page;

        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const pagePets = allPets.slice(start, end);
        
        console.log('Showing pets from index', start, 'to', end);
        console.log('Pets on this page:', pagePets.map(p => p.name));

        petsGrid.innerHTML = '';
        pagePets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.petId = pet.id;
            card.innerHTML = `
                <img class="card-img" src="${pet.img}" alt="${pet.name}">
                <p class="card-caption">${pet.name}</p>
                <button class="card-btn">Learn more</button>
            `;
            
            card.addEventListener('click', () => openModal(pet));
            petsGrid.appendChild(card);
        });

        updatePagination();
    }

    function updatePagination() {
        pageNumber.textContent = currentPage;
        firstPageBtn.disabled = currentPage === 1;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        lastPageBtn.disabled = currentPage === totalPages;
        
        console.log('Pagination updated - Page:', currentPage, 'of', totalPages);
    }

    firstPageBtn.addEventListener('click', () => {
        if (currentPage !== 1) {
            renderPets(1);
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            renderPets(currentPage - 1);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderPets(currentPage + 1);
        }
    });

    lastPageBtn.addEventListener('click', () => {
        if (currentPage !== totalPages) {
            renderPets(totalPages);
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerPage = getCardsPerPage();
            if (newCardsPerPage !== currentCardsPerPage) {
                const newTotalPages = Math.ceil(allPets.length / newCardsPerPage);
                if (currentPage > newTotalPages) {
                    currentPage = newTotalPages;
                }
                renderPets(currentPage);
            }
        }, 300);
    });

    function openModal(pet) {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modalImg');
        const modalName = document.getElementById('modalName');
        const modalType = document.getElementById('modalType');
        const modalBreed = document.getElementById('modalBreed');
        const modalDescription = document.getElementById('modalDescription');
        const modalAge = document.getElementById('modalAge');
        const modalVaccinations = document.getElementById('modalVaccinations');
        const modalDiseases = document.getElementById('modalDiseases');
        const modalParasites = document.getElementById('modalParasites');

        modalImg.src = pet.img;
        modalName.textContent = pet.name;
        modalType.textContent = pet.type;
        modalBreed.textContent = pet.breed;
        modalDescription.textContent = pet.description;
        modalAge.textContent = pet.age;
        modalVaccinations.textContent = pet.inoculations.join(', ');
        modalDiseases.textContent = pet.diseases.join(', ') || 'None';
        modalParasites.textContent = pet.parasites.join(', ') || 'None';

        modal.style.display = 'flex';
    }

    const modalCloseBtn = document.querySelector('.modal-close-btn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });
    }

    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.style.display = 'none';
        }
    });

    renderPets(1);
});