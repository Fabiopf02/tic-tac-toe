import { getSavedInLocalStorage, saveInLocalStorage } from './others.mjs'
import { updateScoreWithLocalStorage, showScore } from './player.mjs'

export const getConfigAndApply = () => {
    const configSaved = getSavedInLocalStorage('config')

    if (!configSaved) return

    const cursorMarkerElement = document.querySelector('#cursor-marker')
    const game = document.querySelector('.game')

    if (configSaved.cursorMarker) {
        animationCursorAct = true
        initAnimationCursor(cursorMarkerElement, game)
    } else {
        animationCursorAct = false
        removeAnimationCursor(cursorMarkerElement, game)
    }

    document.querySelector('input[name=showmarker]').checked = animationCursorAct
}

export const cleanScore = async () => {

    const response = await confirm('Continuar?')

    if (!response) return

    localStorage.removeItem('scores')
    updateScoreWithLocalStorage()
    showScore(['player1', gameMode, 'Empate'])
}

export const changeConfig = (boxElement) => {

    const value = boxElement.checked

    saveInLocalStorage('config', { cursorMarker: value })

    getConfigAndApply()
}

const removeAnimationCursor = (mouseElement, gameElement) => {
    mouseElement.style.display = 'none'
    alterAppearanceCursor(mouseElement, gameElement, true)
    gameElement.removeEventListener('mousemove', mouseMove, false)
}

const mouseMove = (e) => {
    const mouseElement = document.querySelector('#cursor-marker')
    
    if (!animationCursorAct) return
    const { pageX, pageY} = e
    animationCursor(pageX, pageY, mouseElement)
}

const alterAppearanceCursor = (mouseElement, gameElement, normal) => {
    mouseElement.style.display = normal?'none':'block'
    gameElement.style.cursor = normal?'auto':'none'
    gameElement.querySelectorAll('.m').forEach(element => {
        element.style.cursor = normal?'pointer':'none'
    })
}

const initAnimationCursor = (mouseElement, gameElement) => {
    alterAppearanceCursor(mouseElement, gameElement, false)
    gameElement.addEventListener('mousemove', mouseMove, false)
}

const animationCursor = (x, y, mouse) => {
    mouse.style.top = `${y-15}px`
    mouse.style.left = `${x-10}px`
}
