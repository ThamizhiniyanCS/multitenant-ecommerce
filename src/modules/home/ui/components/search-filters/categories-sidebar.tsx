'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon, ListFilterIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTRPC } from '@/trpc/client'

import { CategoriesGetManyOutput } from '@/modules/categories/types'

interface Props {
  isActiveCategoryHidden?: boolean
  isAnyHovered?: boolean
  isMobile?: boolean
}

const CategoriesSidebar = ({ isAnyHovered, isActiveCategoryHidden, isMobile }: Props) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.categories.getMany.queryOptions())

  const router = useRouter()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[0] | null>(null)

  // NOTE: If we have parent categories, show these, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null)
    setParentCategories(null)
    setIsSidebarOpen(open)
  }

  const handleCategoryClick = (category: CategoriesGetManyOutput[0]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput)
      setSelectedCategory(category)
    } else {
      // NOTE: This is a leaf category (no subcategories)
      if (parentCategories && selectedCategory) {
        // NOTE: This is a subcateogry - navigate to /category/subcategory
        router.push(`${selectedCategory.slug}/${category.slug}`)
      } else {
        // NOTE: This a main category - navigate to /category
        if (category.slug === 'all') {
          router.push('/')
        } else {
          router.push(`/${category.slug}`)
        }
      }

      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null)
      setSelectedCategory(null)
    }
  }

  const backgroundColor = selectedCategory?.color || 'white'

  return (
    <Sheet open={isSidebarOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          className={cn(
            'h-11 px-4 bg-white hover:bg-main cursor-pointer data-[state=open]:bg-main data-[state=open]:translate-x-reverseBoxShadowX data-[state=open]:translate-y-reverseBoxShadowY data-[state=open]:shadow-shadow',
            isActiveCategoryHidden &&
              !isAnyHovered &&
              'bg-main translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY shadow-shadow',
            !isMobile && 'rounded-full',
            isMobile && 'lg:hidden size-10',
          )}
          variant="reverse"
        >
          {!isMobile && 'ViewAll'} <ListFilterIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 transition-none" style={{ backgroundColor }}>
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-full pb-2">
          <div className="flex flex-col w-full">
            {parentCategories && (
              <button
                onClick={handleBackClick}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
              >
                <ChevronLeftIcon className="size-4 mr-2" /> Back
              </button>
            )}
            {currentCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
              >
                {category.name}
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronRightIcon className="size-4" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default CategoriesSidebar
