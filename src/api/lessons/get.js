import { LESSONS_KEY } from './consts'
import { makeAuthorizedRequest } from '../../auth'
import { makeApiUrl, objectToArray } from '..'

export const get = async (lessonId) => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY + '/' + lessonId))
  return objectToArray(rawData)
}

export default get
