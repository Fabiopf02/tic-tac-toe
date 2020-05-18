import { robot } from './robot.mjs'
import { 
    saveInLocalStorage, 
    getSavedInLocalStorage,
    showBox,
    alternateMarkerAnimationCursor
} from './others.mjs'

export const alternateMarker = (marker) => {
    if (marker === 'player1') {
        return gameMode
    }
    else if (marker === gameMode) {
        return 'player1'
    }
}

export const saveMove = (listName, data) => {
    listForRobot = listForRobot.filter(i => i !== data)

    return movements[listName].push(data)
}

export const showNextPlayer = (player) => {
    
    const box = document.querySelector('.next-player p')
    const forText = box.querySelector('strong')

    const visible = (fct) => {
        box.style.opacity = 1
        setTimeout(fct, 400)
    }
    const invisible = (fct) => {
        box.style.opacity = 0.1
        setTimeout(fct, 400)
    }

    // player = alternateMarker(player).marker

    forText.innerHTML = `${player} (<div> ${player==='player1'?'+':'○'} </div>)`

    invisible(visible)
}

const randomValue = (param) => {
    const value = Math.floor(Math.random() * param)
    return value
}

window.randomValue = randomValue
const comemoration = () => {
    const fcElement = document.querySelector('.fc')

    for (let i = 0;i < 40; i++) {
        let el = document.createElement('div')
        el.style.marginLeft = `${randomValue(window.innerWidth)}px`
        el.classList.add('an')
        el.innerText = '#'
        el.style.animationDelay = `${randomValue(2000)}ms`
        el.style.animationDuration = `${randomValue(3)}s`

        fcElement.appendChild(el)

        el.addEventListener('animationend', (e) => {
            if(e.animationName === 'confetti') fcElement.removeChild(el)
        })
    }
}

export const messageToWinner = (coords, winner) => {
    comemoration()
    lastWinner = winner

    updateScore(winner)
    showScore([ winner ])

    const lineAnim = document.querySelector('.game span.line-to-winner')
    anim = `anim-${coords}`
    lineAnim.classList.add(anim)

    const bfinish = document.querySelector('.finish-game')

    if (winner === 'Empate') {
        document.title = `Empate`
        bfinish.querySelector('.content').innerText = `Empate!`
    } else {
        document.title = `'${winner}' venceu!`
        bfinish.querySelector('.content').innerHTML = `
            ${winner}
            <div class='winner'>
                <strong class='w'>${winner==='player1'?'+':'○'}</strong>
            </div> venceu!`
    }

    setTimeout(() => showBox(bfinish), 500)
}

export const changePlayed = (element, namePlayer) => {
    
    if (finish || robotPlaying) return
    
    const sumLists = movements.movementsX.length + movements.movementsO.length
    
    const label = element.querySelector('.t')
    
    if (label.getAttribute('data-marker')) return
    
    const id = element.getAttribute('id').replace('i', '')
    
    label.innerText = (lastMove ==='player1'?'+':'○')
    label.setAttribute('data-marker', lastMove)

    saveMove(lastMove==='player1'?'movementsX':'movementsO', id)

    
    if (sumLists > 3) {
        const { playing, coords, winner } = checkMoveToWinner(
            (lastMove==='player1'?'movementsX':'movementsO'), lastMove
            )
            
            if (!playing) {
                finish = true
                return messageToWinner(coords, winner)
            }
        }
    
    if (sumLists >= 8) return messageToWinner('', 'Empate')

    if (gameMode === 'robot') {
        namePlayer = alternateMarker(namePlayer)
    } else {
        if (animationCursorAct) alternateMarkerAnimationCursor(alternateMarker(lastMove))
    }

    if (gameMode === 'robot' && namePlayer === 'robot') {
        robotPlaying = true
        setTimeout(robot, 600)
    }

    lastMove = alternateMarker(lastMove)
    showNextPlayer(lastMove)
}

export const checkMoveToWinner = (listName, player) => {

    const listMovements = movements[listName]

    function check(m1, m2, m3) {
        if (listMovements.indexOf(m1) > -1 && listMovements.indexOf(m2) > -1 &&
            listMovements.indexOf(m3) > -1) return true

        else return false
    }

    if (check('0', '1', '2')) {
        return {playing: false, coords: '0-1-2', winner: player}
    } else if (check('0', '3', '6')) {
        return {playing: false, coords: '0-3-6', winner: player}
    } else if (check('0', '4', '8')) {
        return {playing: false, coords: '0-4-8', winner: player}
    } else if (check('3', '4', '5')) {
        return {playing: false, coords: '3-4-5', winner: player}
    } else if (check('1', '4', '7')) { 
        return {playing: false, coords: '1-4-7', winner: player}
    } else if (check('2', '4', '6')) {
        return {playing: false, coords: '2-4-6', winner: player}
    } else if (check('2', '5', '8')) {
        return {playing: false, coords: '2-5-8', winner: player}
    } else if (check('6', '7', '8')) {
        return {playing: false, coords: '6-7-8', winner: player}
    }
    
    return {playing: true, coords: undefined, winner: undefined}
}

export const updateScoreWithLocalStorage = () => {
    const scoreSaved = getSavedInLocalStorage('scores')

    scores['player2'].player1 = scoreSaved?scoreSaved['player2'].player1:0
    scores['player2']['player2'] = scoreSaved?scoreSaved['player2']['player2']:0
    scores['player2'].Empate = scoreSaved?scoreSaved['player2'].Empate:0

    scores['robot'].player1 = scoreSaved?scoreSaved['robot'].player1:0
    scores['robot']['robot'] = scoreSaved?scoreSaved['robot']['robot']:0
    scores['robot'].Empate = scoreSaved?scoreSaved['robot'].Empate:0

}

export const updateScore = (winner) => {
    scores[gameMode][winner]++
    saveInLocalStorage('scores', scores)
    return scores
}

export const showScore = (listNames) => {
    listNames.forEach(name => {
        const elementForScore = document.querySelector(`.scores .players #${name} .nscore`)

        if (elementForScore) elementForScore.innerText = scores[gameMode][name]
    })
}