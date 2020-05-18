import { getSavedInLocalStorage, saveInLocalStorage } from './others.mjs'

const html = document.querySelector('html')

export const themes = {
    dark: {
        bg: "#282a36",
        fg: "#00E868",
        colorDefault: "#FFF",
        shadow: "#111",
    },
    light: {
        bg: "#f0f0f0",
        fg: "#333",
        colorDefault: "#44475a",
        shadow: "#99999955",
    }
}

const changeTheme = (colors) => {
    Object.keys(colors).map(key => {
        if (key !== 'name')html.style.setProperty(('--' + key.replace(/([A-Z])/, '-$1').toLowerCase()), colors[key])
    })

    const name = () => {
        if (colors.bg === "#282a36") return true
        else return false
    }

    const nameTheme = name()

    const data = {
        colors,
        themeDark: nameTheme
    }

    return saveInLocalStorage('theme', data)
}

export const getThemeSaved = () => {
    const themeLocal = getSavedInLocalStorage('theme')

    if (!themeLocal) return

    const element = document.querySelector('input[name=switch]')

    changeTheme(themeLocal.colors)

    element.checked = themeLocal.themeDark

    return
}

export const changeElement = (element) => {
    const checked = element.checked

    const colors = checked?themes.dark:themes.light

    changeTheme(colors)

    return
}
