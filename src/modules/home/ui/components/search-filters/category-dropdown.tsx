'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useDropdownPosition } from './use-dropdown-position'
import SubcategoryMenu from './subcategory-menu'
import { CategoriesGetManyOutput } from '@/modules/categories/types'

interface Props {
  category: CategoriesGetManyOutput[0]
  isActive?: boolean
  isNavigationHovered?: boolean
}

const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true)
    }
  }

  const onMouseLeave = () => setIsOpen(false)

  const dropdownPosition = getDropdownPosition()

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          className={cn(
            'h-11 px-4 rounded-full bg-white hover:bg-main cursor-pointer',
            isActive &&
              !isNavigationHovered &&
              'bg-main translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY shadow-shadow',
            isOpen &&
              'bg-main translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY shadow-shadow',
          )}
          variant="reverse"
        >
          <Link href={`/${category.slug === 'all' ? '' : category.slug}`}>{category.name}</Link>
        </Button>

        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              'opacity-0 absolute -bottom-3 size-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent left-1/2 -translate-1/2',
              isOpen && 'opacity-100',
            )}
          />
        )}
      </div>

      <SubcategoryMenu category={category} isOpen={isOpen} position={dropdownPosition} />
    </div>
  )
}

export default CategoryDropdown
