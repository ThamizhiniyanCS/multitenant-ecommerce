import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import NavBar from './nav-bar'
import Footer from './footer'
import SearchFilters from './search-filters'
import { Category } from '@/payload-types'
import { CustomCategory } from './types'

export default async function HomeLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 1, // NOTE: Populate subcategories, subcategories.[0] will be a type of "Category""
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: 'name',
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // NOTE: Because of "depth: 1" we are confident "doc" will be a type of "Category"
      ...(doc as Category),
      // NOTE: To remove the nested subcategory
      subcategories: undefined,
    })),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}
