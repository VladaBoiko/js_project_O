// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// const spinner = document.querySelector('.spinner');
const API = () => {
    try {
        return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

    } catch (error) {
        console.error(error)
    }

}
const start = async () => {
    // spinner.style.display='flex';
    users = await API();
    cardsRender(users);
    // spinner.style.display='none';
    listen();
}
const cardsRender = (arr) => {
    const fragment = document.createDocumentFragment();
    const box=document.querySelector('.container')
    const list = document.createElement('ul');
    const title=document.createElement('h1');
    title.classList.add('main-title');
    title.textContent='All users'
    fragment.appendChild(title)
    fragment.appendChild(list);
    list.classList.add('users-list');
    const markup = arr.map(user => `<li class="user-item"><span class="user-id">#${user.id}</span><span class="user-name">${user.name}</span><a href='./user-details.html' class="user-link" id="${user.id}">Go to details...</a></li>`).join('');
    list.insertAdjacentHTML('beforeend', markup);
    box.appendChild(fragment)
}
const listen = () => {
    const links = [...document.querySelectorAll('.user-link')];
    links.forEach(link => {
        link.addEventListener("click", addToStorage);
    })
}
const addToStorage = (e) => {
    const id = e.currentTarget.getAttribute('id')
    window.localStorage.setItem('user_id', id);
}
start();
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
//
//


// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)
