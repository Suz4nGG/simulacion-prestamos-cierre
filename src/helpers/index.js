export const setLocalStorage = ({ key, storage }) => localStorage.setItem(key, JSON.stringify(storage))

export const getLocalStorage = ({ key }) => JSON.parse(localStorage.getItem(key))

export const removeLocalStorage = ({ key }) => localStorage.removeItem(key)

export const regexComasCantidades = (string) => string.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
