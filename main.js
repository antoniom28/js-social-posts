const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": null
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
    let quantoRecente = estraiData(posts[i].created);

    let immProfilo;
    if (posts[i].author.image == null)
        immProfilo = rimpiazzaImmVuota(posts[i].author.name, posts[i].author.image);
    else
        immProfilo = `
        <img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">
        `;

    document.getElementById('container').innerHTML += `
    <div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                ${immProfilo}        
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${posts[i].author.name}</div>
                <div id="creazione-post-${posts[i].id}" class="post-meta__time">
                ${quantoRecente}
                <div id="data-creazione-post-${posts[i].id}">${posts[i].created}</div>
                </div>
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

//aggiunge l'evento click like e disklike a tutti i button
for (let i = 0; i < posts.length; i++) {
    const likeButton = document.getElementById(`likes-button-${posts[i].id}`);
    const likeCounter = document.getElementById(`like-counter-${posts[i].id}`);
    let actualLike = parseInt(likeCounter.innerHTML);

    likeButton.addEventListener('click', function () {
        if (!likeButton.classList.contains('like-button--liked')) {
            actualLike++;
            likeCounter.innerHTML = `${actualLike}`;
            inserisciLike(likeButton);
        } else {
            actualLike--;
            likeCounter.innerHTML = `${actualLike}`;
            rimuoviLike(likeButton);
        }
    });

    //evento hover, passando il mouse si vedrà la data del post
    document.getElementById(`creazione-post-${posts[i].id}`).addEventListener('mouseenter',function(){
        document.getElementById(`data-creazione-post-${posts[i].id}`).style.display="inline-block";
    });
    document.getElementById(`creazione-post-${posts[i].id}`).addEventListener('mouseleave',function(){
        document.getElementById(`data-creazione-post-${posts[i].id}`).style.display="none";
    });
}

function formattaDataItalia(dataCreazione) {
    let dataPost = (dataCreazione.match(/\d+/g) || []).map(n => parseInt(n));
    console.log('data post', dataPost);
    let temp = [dataPost[0], dataPost[1], dataPost[2]];
    temp[0] = dataPost[2];
    temp[1] = dataPost[1];
    temp[2] = dataPost[0];
    console.log('data post', temp);

    return temp;
}

function rimpiazzaImmVuota(name, image) {
    let iniziali = calcolaIniziali(name);
    return `
    <p class="profile-no-pic">${iniziali}</p>
    `;
}

function calcolaIniziali(nome) {
    let temp = '';
    temp += nome[0];
    for (let i = 1; i < nome.length; i++) {
        if (nome[i] == ' ')
            return temp += nome[i + 1];
    }
    return temp;
}

function estraiData(dataCreazione) {
    //const s = "1 banana + 1 pineapple + 3 oranges";
    let dataPost = (dataCreazione.match(/\d+/g) || []).map(n => parseInt(n));
    //console.log('data post',dataPost);

    let nuovaData = new Date();
    let dataOggi = [];
    dataOggi[0] = nuovaData.getUTCFullYear();
    dataOggi[1] = nuovaData.getUTCMonth() + 6; //months from 1-12
    dataOggi[2] = nuovaData.getUTCDate();
    //console.log('data oggi',dataOggi);

    let creazione = [0, 0]; //anno,mese

    //calcola mesi e anni del post
    if (dataOggi[0] >= dataPost[0])
        creazione[0] += (dataOggi[0] - dataPost[0]);
    creazione[1] += dataPost[1] - dataOggi[1];
    if (creazione[1] < 0) {
        creazione[1] = (12 * creazione[0]) + creazione[1];
        creazione[0]--;
    }

    //restituisce la frase corretta
    let quantoRecente = `${creazione[0]} anno e ${creazione[1]} mesi fa`;
    if (creazione[0] <= 0)
        quantoRecente = `${creazione[1]} mesi fa`;
    if (creazione[1] <= 0)
        quantoRecente = `circa ${creazione[0]} anno fa`;
    //console.log(creazione);
    return quantoRecente;

}

function inserisciLike(likeButton) {
    likeButton.className += ' like-button--liked';
    likeButton.innerHTML = `
            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
            <span class="like-button__label">Ti Piace</span>
            `;
}

function rimuoviLike(likeButton) {
    likeButton.classList.remove('like-button--liked');
    likeButton.innerHTML = `
            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                    `;
}