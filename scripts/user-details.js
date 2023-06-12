let params = new URLSearchParams(document.location.search);
let id = params.get('user');
const box = document.querySelector('.container');
// const spinner = document.querySelector('.spinner');

if (!id) {
    id = window.localStorage.getItem('user_id')
    params.set('user', `${id}`)
    let newURL = `${document.location.origin}${document.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newURL);
}

const currentUserAPI = () => {
    try {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json());

    } catch (err) {
        console.error(err)
    }
}
const userPostsAPI = () => {
    try {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`).then(res => res.json());
    } catch (e) {
        console.error(e)
    }
}
const start = async () => {
    // spinner.style.display='flex';
    const user = await currentUserAPI();
    infoRender(user);
    // spinner.style.display='none';
    getPosts(user.username);

}
const infoRender = (infoArr) => {
    const {
        id,
        name,
        username,
        email,
        address,
        phone,
        website,
        company
    } = infoArr;
    const {street, suite, city, zipcode, geo} = address;
    const {lat, lng} = geo;

    const markup = `<section class="user-info">
        <h1 class="main-title">Full information about user #${id ?? 'no information'}</h1>
        <h2 class="add-title">Main info:</h2>
        <ul class="main-info info-list"> 
        <li class="info-item name"><span class="accent">Name:</span>${name ?? 'no information'}</li>
        <li class="info-item username"><span class="accent">username:</span>${username ?? 'no information'}</li>
        <li class="info-item"><a href="mailto:${email}" class="info-item email"><span class="accent">email:</span>${email ?? 'no information'}</a></li>
        <li class="info-item"><a href="tel:" class="info-item phone"><span class="accent">phone:</span>${phone ?? 'no information'}</a></li>
        <li class="info-item"><a href="" class="info-item website"><span class="accent">website:</span>${website ?? 'no information'}</a></li></ul>
       
        <h2 class="add-title">User address:</h2>
        <ul class="address info-list">
            <li class="info-item street"><span class="accent">street:</span>${street ?? 'no information'}</li>
            <li class="info-item suite"><span class="accent">suite:</span>${suite ?? 'no information'}</li>
            <li class="info-item city"><span class="accent">city:</span>${city ?? 'no information'}</li>
            <li class="info-item zipcode"><span class="accent">zipcode:</span>${zipcode ?? 'no information'}</li>
        </ul>
        <h2 class="add-title">Geolocation:</h2>
        <ul class="geo info-list">
            <li class="info-item lat"><span class="accent">lat:</span>${lat ?? 'no information'}</li>
            <li class="info-item lng"><span class="accent">lng:</span>${lng ?? 'no information'}</li>
        </ul>
        
        <h2 class="add-title">Company:</h2>
        <ul class="company info-list">
            <li class="info-item name"><span class="accent">Name:</span>${company.name ?? 'no information'}</li>
            <li class="info-item catchPhrase"><span class="accent">catch phrase:</span>${company.catchPhrase ?? 'no information'}</li>
            <li class="info-item bs"><span class="accent">business services:</span>${company.bs ?? 'no information'}</li>
        </ul>
        <button class="posts-btn" type="button">Posts of current user</button>
    </section>`
    box.insertAdjacentHTML('beforeend', markup)

}
const getPosts = (author) => {
    window.localStorage.setItem('author', author)
    const btn = document.querySelector('.posts-btn');
    btn.addEventListener('click', postTitles)
}
const postTitles = async () => {
    const section = document.querySelector('.user-info');
    const postList = document.createElement('ul');
    postList.classList.add('posts-list');
    const posts = await userPostsAPI();
    const markup = posts.map(post => `<li class="post-item"><span class="post-id">#${post.id}</span> ${post.title ?? 'no information'}<a href="post-details.html" class="post-details-link" id=${post.id}>Go to post...</a></li>`).join('');
    postList.insertAdjacentHTML('beforeend', markup);
    section.insertAdjacentElement('afterend', postList);
    window.scrollTo({
        top: 1000,
        behavior: "smooth",
    });
    postListening();
}
const postListening = () => {
    const postLinks = [...document.querySelectorAll('.post-details-link')];
    postLinks.forEach(link => {
        link.addEventListener("click", goToPost);
    })
}
const goToPost = (e) => {
    const id = e.currentTarget.getAttribute('id');
    window.localStorage.setItem('post_id', id)

}
start()

// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//