const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

for (let i = 0; i < posts.length; i++) {
    let quantoRecente =  estraiData(posts[i].created);

    document.getElementById('container').innerHTML += `
    <div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                <img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">                    
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${posts[i].author.name}</div>
                <div class="post-meta__time">${quantoRecente[0]} anno e ${quantoRecente[1]} mesi fa</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${posts[i].content}</div>
    <div class="post__image">
        <img src="${posts[i].media}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a id="likes-button-${posts[i].id}" class="like-button js-like-button" data-postid="${posts[i].id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
            </div>
        </div> 
    </div>            
</div>
    `;
}
for (let i = 0; i < posts.length; i++) {
    const likeButton = document.getElementById(`likes-button-${posts[i].id}`);
    const likeCounter = document.getElementById(`like-counter-${posts[i].id}`);
    let actualLike = parseInt(likeCounter.innerHTML);

    likeButton.addEventListener('click', function () {
        if (!likeButton.classList.contains('like-button--liked')) {
            actualLike++;
            likeCounter.innerHTML = `${actualLike}`;
            inserisciLike(likeButton);
        } else{
            actualLike--;
            likeCounter.innerHTML = `${actualLike}`;
            rimuoviLike(likeButton);
        }
    });
}

function estraiData(dataCreazione){
//const s = "1 banana + 1 pineapple + 3 oranges";
let dataPost = (dataCreazione.match(/\d+/g) || []).map(n => parseInt(n));
console.log('data post',dataPost);

let nuovaData = new Date();
let dataOggi = [];
dataOggi[0] = nuovaData.getUTCFullYear();
dataOggi[1] = nuovaData.getUTCMonth() + 1; //months from 1-12
dataOggi[2] = nuovaData.getUTCDate();
console.log('data oggi',dataOggi);

let creazione = [0,0];


if(dataOggi[0] >= dataPost[0])
    creazione[0] += (dataOggi[0] - dataPost[0]);
    creazione[1] += dataPost[1] - dataOggi[1];

console.log(creazione);
return creazione;

}

function inserisciLike(likeButton){
    likeButton.className += ' like-button--liked';
    likeButton.innerHTML = `
            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
            <span class="like-button__label">Ti Piace</span>
            `;
}

function rimuoviLike(likeButton){
    likeButton.classList.remove('like-button--liked');
    likeButton.innerHTML = `
            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                    `;
}