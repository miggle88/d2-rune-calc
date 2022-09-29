import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'

const useSearchQuery = () => {
  const router = useRouter()

  const setQuery = (params: ParsedUrlQueryInput) => {
    const filteredParams = Object.entries(params).reduce((output, entry) => {
      const [key, value] = entry
      if (value == null) {
        return output
      }

      const trimmedValue = typeof value === 'string' ? value.trim() : value
      if (typeof trimmedValue === 'string' && !trimmedValue) {
        return output
      }
      return { ...output, [key]: trimmedValue }
    }, {})

    const url = {
      pathname: router.pathname,
      query: filteredParams,
    }
    router.replace(url, url, { shallow: true })
  }
  return {
    isReady: router.isReady,
    query: router.query,
    setQuery,
  }
}

export default useSearchQuery
