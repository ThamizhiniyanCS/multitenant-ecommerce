import { BookmarkCheckIcon, SearchIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

import { useTRPC } from '@/trpc/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import CategoriesSidebar from './categories-sidebar'
import Link from 'next/link'

interface Props {
  disabled?: boolean
  defaultValue?: string | undefined
  onChange?: (value: string) => void
}

const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || '')

  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchValue, onChange])

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <CategoriesSidebar isMobile />

      {session.data?.user && (
        <Button variant="reverse" className="bg-transparent" asChild>
          <Link prefetch href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  )
}

export default SearchInput
