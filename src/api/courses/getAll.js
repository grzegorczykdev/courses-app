import { COURSES_KEY } from './consts'
import { makeAuthorizedRequest } from '../../auth'
import { makeApiUrl, objectToArray } from '../../api'

export const getAll = async () => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(COURSES_KEY))
  return objectToArray(rawData)
}

export default getAll
