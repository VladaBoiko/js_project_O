//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
let params = new URLSearchParams(document.location.search);
let post_id = params.get('post_id');
let author=params.get('author')
const box = document.querySelector('.container');
// const spinner = document.querySelector('.spinner');

if (!author) {
    author = window.localStorage.getItem('author')
    params.set('author', `${author}`)
    let newURL = `${document.location.origin}${document.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newURL);
}
if (!post_id) {
    post_id = window.localStorage.getItem('post_id')
    params.set('post_id', `${post_id}`)
    let newURL = `${document.location.origin}${document.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newURL);
}

const postInfoAPI = () => {
  try{
     return fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`).then(res=>res.json())
  }catch (err){
      console.error(err)
  }
}
const commentsAPI = () => {
  try{
      return fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}/comments`).then(res=>res.json());
  } catch (err) {
      console.error(err)
  }
}
const start = async () => {
    // spinner.style.display='flex';
    const post = await postInfoAPI();
    const comments = await commentsAPI()
    renderDetails(post, comments);
    // spinner.style.display='none';
}
const renderDetails=(objPost, comments)=>{
    const markup=`<section class="post">
<div class="post-box"><h1 class="post-title"><span class="title-accent">#${objPost.id} ${objPost.title}</span></h1>
        <h2 class="author"><span class="accent">author:</span> ${author}</h2>
        <p class="post-text"><span class="accent">Content:</span>${objPost.body}</p></div>
         <h2 class="add-title">Comments:</h2>
        <ul class="comments-list"></ul></section>`;
    box.insertAdjacentHTML('beforeend', markup);
    const commentBox=document.querySelector('.comments-list');
    const commentItems= comments.map(comment=>
        `<li class=comment-item>
             <h2 class="comment-title">${comment.name}</h2>
             <h3 class="comment-author"><span class="comment-author-accent">author: ${comment.email}</span></h3>
             <p class="comment-text">${comment.body}</p>
        </li>`).join('');
commentBox.insertAdjacentHTML('beforeend', commentItems)

}
start();