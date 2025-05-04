'use client'

import { useEffect, useRef, useState } from 'react'

import { CategoriesGetManyOutput } from '@/modules/categories/types'

import CategoryDropdown from './category-dropdown'
import CategoriesSidebar from './categories-sidebar'

interface Props {
  data: CategoriesGetManyOutput
}

const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(data.length)
  const [isAnyHovered, setIsAnyHovered] = useState(false)

  const activeCategory = 'all'

  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory)
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const viewAllWidth = viewAllRef.current.offsetWidth
      const availabelWidth = containerWidth - viewAllWidth - 8 // NOTE: Considering the "flex gap-2", subtracting 8px
      const items = Array.from(measureRef.current.children)
      let totalWidth = 0
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width

        if (totalWidth + width > availabelWidth) break

        totalWidth += width + 8 // NOTE: Considering the "flex gap-2", adding 8px
        visible++
      }

      setVisibleCount(visible)
    }

    const resizeObserver = new ResizeObserver(calculateVisible)
    resizeObserver.observe(containerRef.current!)

    return () => resizeObserver.disconnect()
  }, [data.length])

  return (
    <div className="relative w-full">
      {/* NOTE: Hidden div to measure all items */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* NOTE: Visible items */}
      <div
        ref={containerRef}
        className="flex flex-nowrap items-center gap-2"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <CategoriesSidebar
            isAnyHovered={isAnyHovered}
            isActiveCategoryHidden={isActiveCategoryHidden}
          />
        </div>
      </div>
    </div>
  )
}

export default Categories
