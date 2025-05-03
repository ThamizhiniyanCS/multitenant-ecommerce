import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

import { CustomCategory } from '../types'
import CategoriesSidebar from './categories-sidebar'

interface Props {
  disabled?: boolean
  data: CustomCategory[]
}

const SearchInput = ({ disabled, data }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search Products" disabled={disabled} />
      </div>
      {/* TODO: Add Categories view all button */}
      <CategoriesSidebar data={data} isMobile />
      {/* TODO: Add Library button */}
    </div>
  )
}

export default SearchInput
