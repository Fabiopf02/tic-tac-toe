import {
    getConfigAndApply,
    changeConfig,
    cleanScore
} from './config.mjs'
import { robot } from './robot.mjs'
import { 
    showBox,
    hideBox,
    getSavedInLocalStorage,
    randomNumber,
    alternateMarkerAnimationCursor
} from './others.mjs'
import {  
    showNextPlayer,
    updateScoreWithLocalStorage,
    showScore,
    changePlayed
} from './player.mjs'
import {
    changeElement,
    getThemeSaved
} from './theme.mjs'

window.movements = {
    movementsX: [],
    movementsO: []
}
window.scores = {
    player2: {player1: 0, player2: 0, Empate: 0},
    robot: {player1: 0, robot: 0, Empate: 0},
}
window.anim = undefined
window.animationCursorAct = false
window.changePlayed = changePlayed
window.changeElement = changeElement
window.cleanScore = cleanScore
window.finish = false
window.gameMode = undefined
window.hideBox = hideBox
window.lastMove = undefined
window.lastToPlay = undefined
window.lastWinner = undefined
window.listForRobot = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
window.robotPlaying = false
window.changeConfig = changeConfig

window.onload = () => {
    const modeElement = document.querySelector('input[name=mode]')
    setMode(modeElement)
    
    if (getSavedInLocalStorage('scores')) updateScoreWithLocalStorage()
    
    showScore(['player1', gameMode, 'Empate'])

    getConfigAndApply()
    getThemeSaved()
    
    const btnConfig = document.querySelector('.btn-config')
    const btnSaveConfig = document.querySelector('.box #save-config')
    const boxConfig = document.querySelector('.config')
    
    btnConfig.addEventListener('click', () => showBox(boxConfig))
    btnSaveConfig.addEventListener('click', () => hideBox(boxConfig))
    
}

const setMode = (input) => {

    const changeElement = document.querySelector('.scores .players .alter')

    gameMode = input.value

    changePropertyElements(changeElement, gameMode)

    if (getSavedInLocalStorage('scores')) updateScoreWithLocalStorage()
    
    showScore(['player1', gameMode, 'Empate'])

    clear()

    let valueRandom = randomNumber(['player1', gameMode])
    lastToPlay = lastMove = valueRandom

    showNextPlayer(lastToPlay)

    if (lastToPlay === 'robot' && gameMode === 'robot') setTimeout(robot, 1000)
    alternateMarkerAnimationCursor('player1')
    if (gameMode !== 'robot') alternateMarkerAnimationCursor(lastMove)

    return gameMode
}

const changePropertyElements = (element, propertyValue) => {
    element.removeAttribute('id')
    element.setAttribute('id', propertyValue)
    
    element.querySelector('.name').innerText = propertyValue.charAt(0).toUpperCase()+propertyValue.replace(/[a-z]/, '')+':'
}

const clear = () => {
    movements.movementsO = []
    movements.movementsX = []
    listForRobot = ['0', '1', '2', '3', '4', '5', '6', '7', '8']

    if (lastToPlay) {
        if (lastToPlay === 'player1') lastToPlay = lastMove = gameMode
        else lastToPlay = lastMove = 'player1'
    }

    showNextPlayer(lastToPlay)

    finish = false

    const allLabelsInButton = document.querySelectorAll('.m .t')
    allLabelsInButton.forEach(label => {
        label.removeAttribute('data-marker')
        label.innerText = ''
    })
}

const restartGame = () => {
    
    clear()
    
    document.querySelector('.game span.line-to-winner').classList.remove(anim)
    
    const elFinish = document.querySelector('.finish-game')
    
    hideBox(elFinish)

    document.title = 'Tic Tac Toe'
    
    if (gameMode === 'robot' && lastToPlay === gameMode) robot()
    
}

window.restartGame = restartGame
window.setMode = setMode