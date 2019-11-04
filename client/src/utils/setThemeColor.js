const setMetaTheme = (color) => {

    let metaThemeColor = document.querySelector("meta[name=theme-color]")
    metaThemeColor.setAttribute('content', color)

}

export default setMetaTheme