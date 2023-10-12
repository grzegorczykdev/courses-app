export const makeApiUrl = (key) => `${process.env.REACT_APP_FIREBASE_URL}/${key}/.json`
console.log(makeApiUrl('courses'))

export default makeApiUrl
