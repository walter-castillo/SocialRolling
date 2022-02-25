import { generateId, saveLocalStorage, storiesLocalStorage } from './app.js';

saveLocalStorage()

const headerStories = document.querySelector('.header__stories');
const photosContent = document.querySelector('.photos-content');
const idModalStory = document.querySelector('#modalStory');
const idModalNewPost = document.querySelector('#modalNewPost');
const idBtnNewPost = document.querySelector('#btn-new-post');
const idInputUrl = document.querySelector('#inputUrl');
const idModalImg = document.querySelector('#modal-img');
let idSetInterval;


const loadProfile = () => {
    let userLocal = JSON.parse(localStorage.getItem('user'))
    headerStories.innerHTML += `
                        <div class="header__container-story">
                            <div class="header__container-link-story no-visited">
                                <img src="${userLocal.urlImagen}" alt="" class="header__img-story classProfileModal" />
                            </div>       
                        </div>
                        `;
    const headerContainerStories = document.querySelector('.header__container-story');

    headerContainerStories.innerHTML += `
                        <div class="header__container-icon-plus">
                            <i class="fas fa-plus header__icon-plus"></i>
                        </div>
                        `;
}

const loadStories = () => {
        let userLocal = JSON.parse(localStorage.getItem('user'))
        let stories = storiesLocalStorage();
        headerStories.innerHTML = '';
        photosContent.innerHTML = '';

        if (stories.length == 0) loadProfile();

        stories.forEach((story, i) => {
                    const { id, url, likes, date, visited } = story;
                    if (i == 0 && userLocal.flagLogged) loadProfile();

                    headerStories.innerHTML += `
                    <div class="header__container-story" >
                    
                     ${story.visited ? `<div class="header__container-link-story visited">`: `<div class="header__container-link-story no-visited">`}
                           <img src="${url}" alt=""  class="header__img-story classImgModal" data-id=${id}>
                        </div>
                        
                    </div>
                    `;
                    photosContent.innerHTML += `
                    <div class="photos">
                        <div class="photos__header">
                            <img class="header__img-story header__img-story--small" src="${userLocal.urlImagen}" alt=" " />
                            <p class="photos__name-owner">${userLocal.name}</p>
                        </div>
                        <div class="photos__container-image">
                            <img class="photos__image" src="${url}">
                        </div>
                        <div class="photos_delete">
                            ${userLocal.flagLogged ? `<i class="far fa-trash-alt photos__icon classDelete" data-id="${id}"></i>`: ``}
                        </div>
                        <div class="photos__like">   
                            <i class="far fa-heart photos__icon classLike" data-id="${id}" id="publication${id}"> ${likes}</i>
                        </div>
                        <div class="photos__date">
                            ${date}
                        </div>
                    </div>
                    `;
    });

    // agregar foto de no disponible cuando no se carga una url correcta
    let  fotoFailPosts = document.querySelectorAll('.photos__image')
    fotoFailPosts.forEach(fotoFailPost => { fotoFailPost.addEventListener('error',() => fotoFailPost.src = './img/no-disponible.png')});

    let  fotoFailStories = document.querySelectorAll('.classImgModal')
    fotoFailStories.forEach(fotoFailStory => {fotoFailStory.addEventListener('error',() =>fotoFailStory.src = './img/no-disponible.png')});
};

loadStories();

// // inicion carrusel modal logged
headerStories.addEventListener('click', (e) => {
    if (e.target.classList.contains('classImgModal')) {

        let userLocal = JSON.parse(localStorage.getItem('user'))
        let stories = storiesLocalStorage();
        if (userLocal.flagLogged) {
            let storyModal = stories.find(story => story.id == e.target.dataset.id);
            let modalLike= document.querySelector('.modal-like')
            idModalStory.classList.toggle("active-modal");
            modalLike.innerHTML = ' ' + storyModal.likes;
            document.querySelector('.modal-date').innerHTML = storyModal.date;
            idModalImg.src = storyModal.url;
            modalLike.setAttribute('data-id', storyModal.id) ;
            visitedStory(storyModal, stories);

            let iActual = stories.indexOf(storyModal); 
            let flagNumberLoop = 1;
            let lengthStories = stories.length;
            //  console.log(new Date().getSeconds()+' seg');
            const  carruselLogged = () => {
                if (flagNumberLoop < 5) {       
                    if (lengthStories == (iActual + 1) || flagNumberLoop==3) {
                        stopCarrusel();
                        idModalStory.classList.remove("active-modal");
                        flagNumberLoop = 4;
                    } else {
                        ++iActual;
                        idModalStory.classList.add("active-modal");
                        modalLike.innerHTML = ' ' + stories[iActual].likes;
                        document.querySelector('.modal-date').innerHTML = stories[iActual].date;
                        idModalImg.src = stories[iActual].url;
                        modalLike.setAttribute('data-id', stories[iActual].id)
                        visitedStory(stories[iActual], stories);
                    };
                    ++flagNumberLoop;
                };              
            };           
            idSetInterval = setInterval(carruselLogged, 3000);         
        } else {
           
           let storyModal = stories.find(story => story.id == e.target.dataset.id);
            idModalImg.src = storyModal.url;
            let modalLike= document.querySelector('.modal-like')
            modalLike.innerHTML = ' ' + storyModal.likes;
            document.querySelector('.modal-date').innerHTML = storyModal.date;
            idModalStory.classList.toggle("active-modal");
            modalLike.setAttribute('data-id', storyModal.id) ;
            visitedStory(storyModal, stories);

            let iActual = stories.indexOf(storyModal); 
            let flagNumberLoop = 0;
            let lengthStories = stories.length;
               //  console.log(new Date().getSeconds()+' seg');
            const  carruselLogged = () => {
                if (flagNumberLoop < lengthStories) {   
                    ++flagNumberLoop;   
    
                    if (lengthStories == (iActual + 1)) {
                        window.location.href='./register.html'
                        stopCarrusel();
                        idModalStory.classList.remove("active-modal");
                        flagNumberLoop = lengthStories + 2 ;
                    } else {
                        ++iActual;
                        idModalStory.classList.add("active-modal");
                        idModalImg.src = stories[iActual].url;
                        modalLike.innerHTML = ' ' + stories[iActual].likes;
                        document.querySelector('.modal-date').innerHTML = stories[iActual].date;
                        modalLike.setAttribute('data-id', stories[iActual].id)
                        visitedStory(stories[iActual], stories);
                    };
                };         
            };           
            idSetInterval = setInterval(carruselLogged, 3000) 
        }
            
    };
  
});

const visitedStory = (story, stories) => {
    story.visited = true;
    localStorage.setItem('stories', JSON.stringify(stories));
}

const stopCarrusel =() => {setTimeout(() => {clearInterval(idSetInterval)})}
      
idModalImg.addEventListener('error',event =>idModalImg.src = './img/no-disponible.png')


    

// cierrra modal de historia
idModalStory.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal__content-cerrar') || e.target.classList.contains('modal__cerrar')) {
    idModalStory.classList.remove("active-modal");
    stopCarrusel();
    loadStories();
    }
});


// abre modal de new story
headerStories.addEventListener('click', (e) => {
    if (e.target.classList.contains('classProfileModal')) {
    idModalNewPost.classList.toggle("active-modal");
  
    }
});


// cierrra modal de new post
idModalNewPost.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal__cerrar')) {
    idModalNewPost.classList.remove("active-modal");
    }
});


//  af  incrementa like 
const incrementLike = (e) => {
    let stories = storiesLocalStorage();
        let iconClosest = e.target.closest('i')
        let storyModalLike = stories.find(story => story.id == e.target.dataset.id);
        iconClosest.innerHTML =' '+ ++storyModalLike.likes
        localStorage.setItem('stories', JSON.stringify(stories));
}

// incementa like de publicacion 
photosContent.addEventListener('click', (e) => { if (e.target.matches('.classLike'))  incrementLike(e); });

// incremnta like desde modal
idModalStory.addEventListener('click', (e) => { if (e.target.matches('.modal-like')) incrementLike(e); });      
 

// borrar historias
photosContent.addEventListener('click', (e) => {
    if (e.target.matches(".classDelete")) {
        let stories = storiesLocalStorage();
        let storyRemove = stories.find(story=> story.id == e.target.dataset.id);
        stories.splice(stories.indexOf(storyRemove), 1);
        localStorage.setItem('stories', JSON.stringify(stories));
        e.target.parentElement.parentElement.remove();
        loadStories();
    }
});      


// comprobar si input esta vacio
const inputVacio = () => idInputUrl.value.trim() === "" ? idBtnNewPost.disabled = true : idBtnNewPost.disabled = false;
idInputUrl.addEventListener('input', inputVacio)
idInputUrl.addEventListener('keyup', inputVacio)


// guardar nuevo post
const saveNewPost =() => {
    let newPost = {
        id: generateId(),
        url: idInputUrl.value,
        likes: 0,
        date: (new Date()).toLocaleDateString(),
        visited: false
    }
    let stories = storiesLocalStorage();
    stories.push(newPost);
    localStorage.setItem('stories', JSON.stringify(stories));
    idInputUrl.value = ''
    idBtnNewPost.disabled = true;
    idModalNewPost.classList.remove("active-modal");
    loadStories();
};

idBtnNewPost.onclick=  saveNewPost;