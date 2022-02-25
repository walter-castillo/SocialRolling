export const generateId = () => Math.floor(Math.random() * 500);

export const saveLocalStorage = () => {
    localStorage.removeItem('stories')
    if (localStorage.getItem('stories') === null) {
        let ArrayStories = [{
                id: generateId(),
                // url: './img/1.webp',
                url: 'https://picsum.photos/400/400?random=1',
                likes: 3,
                date: '31/12/ 2021',
                visited: false
            },
            {
                id: generateId(),
                // url: './img/2.webp',
                url: 'https://picsum.photos/300/300?random=2',
                likes: 0,
                date: '25/11/2021',
                visited: false
            },
            {
                id: generateId(),
                // url: './img/3.webp',
                url: 'https://picsum.photos/200/400?random=3',
                likes: 44,
                date: '26/11/2021',
                visited: false
            },
            {
                id: generateId(),
                // url: './img/4.webp',
                url: 'https://picsum.photos/200/300?random=4',
                likes: 10,
                date: '25/10/2021',
                visited: false
            },
            {
                id: generateId(),
                // url: './img/5.webp',
                url: 'https://picsum.photos/200/300?random=5',
                likes: 20,
                date: '25/01/2022',
                visited: false
            },
            {
                id: generateId(),
                // url: './img/6.webp',
                url: 'https://picsum.photos/200/300?random=6',
                likes: 5,
                date: '25/08/2021',
                visited: false
            }
        ]
        localStorage.setItem('stories', JSON.stringify(ArrayStories));
    }
}

export const storiesLocalStorage = () => {
    let stories = JSON.parse(localStorage.getItem('stories'));
    return stories
}