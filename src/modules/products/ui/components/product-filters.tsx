'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import PriceFilter from './price-filter'
import { useProductFilters } from '../../hooks/use-product-filters'

interface ProductFilterProps {
  title: string
  className?: string
  children: React.ReactNode
}

const ProductFilter = ({ title, children, className }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon

  return (
    <div className={cn('p-4 border-b flex flex-col gap-2')}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((current) => !current)}
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  )
}

const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters()

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>

        <button className="underline" onClick={() => {}} type="button">
          Clear
        </button>
      </div>

      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange('minPrice', value)}
          onMaxPriceChange={(value) => onChange('maxPrice', value)}
        />
      </ProductFilter>
    </div>
  )
}

export default ProductFilters
