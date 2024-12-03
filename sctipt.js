document.addEventListener('DOMContentLoaded', () => {
    const hamburg = document.querySelector('.hamburg'); // Кнопка "три линии"
    const dropdown = document.querySelector('.dropdown'); // Выпадающее меню
    const cancel = document.querySelector('.cancel'); // Крестик для закрытия меню
    const menuLinks = document.querySelectorAll('.dropdown .links a'); // Все ссылки в выпадающем меню
    const scrollTopBtn = document.getElementById('scrollTopBtn'); // Кнопка прокрутки наверх
    const menuToggle = document.getElementById('menuToggle');
    const menuItems = document.getElementById('menuItems');

    let isScrolling = false; // Для предотвращения излишней нагрузки на скролл

    // Показ/скрытие меню
    menuToggle.addEventListener('click', () => {
        const isMenuVisible = menuItems.style.display === 'flex';
        menuItems.style.display = isMenuVisible ? 'none' : 'flex';
    });

    // Открыть выпадающее меню
    hamburg.addEventListener('click', () => {
        dropdown.classList.toggle('active'); // Добавляем или убираем класс "active"
    });

    // Закрыть выпадающее меню по клику на крестик
    cancel.addEventListener('click', () => {
        dropdown.classList.remove('active'); // Убираем класс "active"
    });

    // Закрыть меню при клике на любую ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdown.classList.remove('active'); // Закрыть меню
        });
    });

    // Используем дебаунс для прокрутки страницы (плавное появление кнопки)
    let lastScrollTime = 0;
    const debounceDelay = 100; // задержка 100 мс для минимизации частых срабатываний

    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime < debounceDelay) return;
        lastScrollTime = now;

        if (window.scrollY > 200) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Прокрутка страницы вверх
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Функция для плавного скроллинга к секции
    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        menuItems.style.display = 'none'; // Закрыть меню после перехода
    }

    // Пример использования функции для кнопок в меню
    document.querySelectorAll('.links a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = event.target.getAttribute('href').substring(1); // Получаем id секции
            scrollToSection(sectionId);
        });
    });
});
