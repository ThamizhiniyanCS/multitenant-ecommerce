import { useQueryStates, parseAsString } from 'nuqs'

export const useProductFilters = () => {
  return useQueryStates({
    minPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
    maxPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
  })
}
