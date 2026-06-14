console.log('Our pets page loaded');

document.addEventListener('DOMContentLoaded', function() {
    // Данные о питомцах (8 питомцев)
    const allPets = [
        { name: 'Katrine', type: 'Cat', breed: 'British Shorthair', age: '2 years', description: 'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-katrine.png' },
        { name: 'Jennifer', type: 'Dog', breed: 'Labrador', age: '2 months', description: 'Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-jennifer.png' },
        { name: 'Woody', type: 'Dog', breed: 'Golden Retriever', age: '2 months', description: 'Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-woody.png' },
        { name: 'Sophia', type: 'Dog', breed: 'Shih tzu', age: '2 months', description: 'Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-sophia.png' },
        { name: 'Timmy', type: 'Cat', breed: 'British Shorthair', age: '2 months', description: 'Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-timmy.png' },
        { name: 'Charly', type: 'Dog', breed: 'Jack Russell Terrier', age: '2 months', description: 'This cute boy, Charly, is three years old and he likes adults and kids. He isn\'t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-charly.png' },
        { name: 'Scarlet', type: 'Dog', breed: 'Jack Russell Terrier', age: '2 months', description: 'Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-scarlet.png' },
        { name: 'Freddie', type: 'Cat', breed: 'British Shorthair', age: '2 months', description: 'Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human\'s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.', Inoculations: 'none', Diseases: 'none', Parasites: 'none', img: 'images/pets-freddie.png' }
    ];

    // 8 питомцев, показываем всех на одной странице
    const petsPerPage = 8; // все 8 питомцев на одной странице
    let currentPage = 1;
    const totalPages = 1; // только одна страница

    // Элементы DOM
    const petsGrid = document.getElementById('petsGrid');
    const firstPageBtn = document.getElementById('firstPageBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const lastPageBtn = document.getElementById('lastPageBtn');
    const pageNumberSpan = document.getElementById('pageNumber');

    // Функция отображения карточек (показываем всех питомцев)
    function renderPets() {
        petsGrid.innerHTML = '';
        allPets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img class="card-img" src="${pet.img}" alt="${pet.name}" />
                <p class="card-caption">${pet.name}</p>
                <button class="card-btn">Learn more</button>
            `;
            petsGrid.appendChild(card);
        });

        // Отключаем все кнопки пагинации, так как только одна страница
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        firstPageBtn.disabled = true;
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = false;
        lastPageBtn.disabled = false;
        pageNumberSpan.textContent = '1';
    }

    // Модальное окно
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
        const pet = allPets.find(p => p.name === petName);
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

    // Делегирование событий для кнопок Learn more
    petsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-btn')) {
            const card = e.target.closest('.card');
            const petName = card.querySelector('.card-caption').textContent;
            openModal(petName);
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') closeModal();
    });

    // Инициализация
    renderPets();
});