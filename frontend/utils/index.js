import ls from 'localstorage-slim'

export const saveLocalStorage = (key, value) => {
  try {
    ls.set(key, JSON.stringify(value), { encrypt: true })
  } catch (error) {
    deleteLocalStorage(key)
  }
}

export const getLocalStorage = (key) => {
  try {
    const value = JSON.parse(ls.get(key, { decrypt: true }))
    return value
  } catch (error) {
    deleteLocalStorage(key)
  }
}

export const deleteLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    deleteLocalStorage(key)
  }
}

export const validateSession = () => {
  return getLocalStorage('user');
}

export const formatDatesCalendar = {
  sameDay: '[Hoy a las] h:mm a',
  nextDay: '[Mañana a las] h:mm a',
  nextWeek: 'dddd [a las] h:mm a',
  lastDay: '[Ayer a las] h:mm a',
  lastWeek: '[El] dddd [pasado a las] h:mm a',
  sameElse: 'dddd D MMMM [del] YYYY [a las] h:mm a'
}