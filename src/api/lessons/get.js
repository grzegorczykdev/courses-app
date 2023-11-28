import { LESSONS_KEY } from './consts'
import { makeAuthorizedRequest } from '../../auth'
import { makeApiUrl } from '..'

export const get = async (lessonId) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY + '/' + lessonId))
  return {...lesson, 'id':lessonId}
}

export default get
