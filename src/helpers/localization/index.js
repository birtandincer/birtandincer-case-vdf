
export const setLocale = (lang) => {
    var currentLang = localStorage.getItem("lang");
    if (currentLang === 'tr-tr')
        localStorage.setItem("lang", 'en-us');
    else
        localStorage.setItem("lang", 'tr-tr');

    window.location.reload();
}
export const getLocale = () => {
    var lang = localStorage.getItem("lang");
    if (lang === null || lang === undefined)
        setLocale('tr-tr')
    return localStorage.getItem("lang");
}