'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { useProductFilters } from '../../hooks/use-product-filters'

const ProductSort = () => {
  const [filters, setFilters] = useProductFilters()

  return (
    <div className="flex items-center gap-2 ">
      <Button
        className={cn(
          'rounded-full bg-white hover:bg-white cursor-pointer',
          filters.sort !== 'curated' &&
            'bg-transparent border-transparent hover:bg-transparent hover:border-border',
        )}
        size="sm"
        onClick={() => setFilters({ sort: 'curated' })}
        variant="noShadow"
      >
        Curated
      </Button>

      <Button
        className={cn(
          'rounded-full bg-white hover:bg-white cursor-pointer',
          filters.sort !== 'trending' &&
            'bg-transparent border-transparent hover:bg-transparent hover:border-border',
        )}
        size="sm"
        onClick={() => setFilters({ sort: 'trending' })}
        variant="noShadow"
      >
        Trending
      </Button>

      <Button
        className={cn(
          'rounded-full bg-white hover:bg-white cursor-pointer',
          filters.sort !== 'hot_and_new' &&
            'bg-transparent border-transparent hover:bg-transparent hover:border-border',
        )}
        size="sm"
        onClick={() => setFilters({ sort: 'hot_and_new' })}
        variant="noShadow"
      >
        Hot & New
      </Button>
    </div>
  )
}

export default ProductSort
