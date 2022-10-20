import { t } from '@/server/trpc'

const authenticate = t.middleware(async ({ path, type, next }) => {
  // request has come in
  const startTime = new Date()
  const result = await next()

  // response is going out
  const elapsedTime = new Date().valueOf() - startTime.valueOf()
  console.log(`${type.toUpperCase()}: ${path} - ${elapsedTime} ms`)

  return result
})

export default authenticate
