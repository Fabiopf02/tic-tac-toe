import { randomNumber } from './others.mjs'
import { changePlayed } from './player.mjs'

export const robot = () => {
    let suggestion = getSuggestionMovement(movements.movementsO), randomId = undefined

    if (!suggestion) suggestion = getSuggestionMovement(movements.movementsX)

    if (suggestion && listForRobot.indexOf(suggestion) > -1) {
        const getResponseforMovement = randomNumber([false, true, true, false])
        if (getResponseforMovement) {
            randomId = suggestion
            console.log('Suggestion for robot...')
        } else {
            randomId = randomNumber(listForRobot)
        }
    } else { 
        randomId = randomNumber(listForRobot)
    }

    // lastMove = 'player1'
    lastMove = 'robot'

    const elementRandom = document.querySelector(`#i${randomId}`)

    robotPlaying = false

    return changePlayed(elementRandom, 'robot')
}

const getSuggestionMovement = (movementsForCheck) => {
    function check(m1, m2, m3) {
        if (movementsForCheck.indexOf(m1) > -1 && movementsForCheck.indexOf(m2) > -1
            && !document.querySelector(`#i${m3} .t`).getAttribute('data-marker')) return true

        else return false
    }

    if (check('0', '1', '2')) {
        return '2'
    } else if (check('1', '2', '0')) {
        return '0'
    } else if (check('0', '2', '1')) {
        return '1'
    }else if (check('0', '1', '2')) {
        return '2'
    } else if (check('0', '3', '6')) {
        return '6'
    } else if (check('3', '6', '0')) {
        return '0'
    } else if (check('0', '6', '3')) {
        return '3'
    } else if (check('0', '4', '8')) {
        return '8'
    } else if (check('4', '8', '0')) {
        return '0'
    } else if (check('0', '8', '4')) {
        return '4'
    } else if (check('3', '4', '5')) {
        return '5'
    } else if (check('4', '5', '3')) {
        return '3'
    } else if (check('3', '5', '4')) {
        return '4'
    } else if (check('1', '4', '7')) { 
        return '7'
    } else if (check('4', '7', '1')) {
        return '1'
    } else if (check('1', '7', '4')) {
        return '4'
    } else if (check('2', '4', '6')) {
        return '6'
    } else if (check('4', '6', '2')) {
        return '2'
    } else if (check('2', '6', '4')) {
        return '4'
    } else if (check('2', '5', '8')) {
        return '8'
    } else if (check('5', '8', '2')) {
        return '2'
    } else if (check('2', '8', '5')) {
        return '5'
    } else if (check('6', '7', '8')) {
        return '8'
    } else if (check('7', '8', '6')) {
        return '6'
    } else if (check('6', '8', '7')) {
        return '7'
    } else {
        return undefined
    }
}
