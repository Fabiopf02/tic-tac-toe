export const saveInLocalStorage = (nameItem, value) => {
    return localStorage.setItem(nameItem, JSON.stringify(value))
}

export const getSavedInLocalStorage = (nameItem) => {
    const saved = JSON.parse(localStorage.getItem(nameItem))

    return saved
}

export const randomNumber = (array) => {
    const number = Math.floor(Math.random() * array.length)

    return array[number]
}

export const showBox = (boxElement) => {
    document.querySelector('.fc').style.display = 'block'

    boxElement.style.display = 'flex'
    boxElement.classList.add('show-box')
}

export const hideBox = (boxElement) => {
    document.querySelector('.fc').style.display = 'none'

    boxElement.classList.remove('show-box')
    boxElement.classList.add('hide-box')

    boxElement.addEventListener('animationend', (an) => {
        if (an.animationName === 'hide') {
            boxElement.classList.remove('hide-box')
            boxElement.style.display = 'none'
        }
    })
}

export const alternateMarkerAnimationCursor = (player) => {
    const mouse = document.querySelector('#cursor-marker')

    const icon = (player==='player1'?'+':'○')

    mouse.innerText = icon
}