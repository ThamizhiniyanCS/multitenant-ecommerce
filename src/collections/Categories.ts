import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'color',
      label: 'Color',
      type: 'text',
    },
    {
      name: 'parent',
      label: 'Parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'subcategories',
      label: 'Subcategories',
      type: 'join',
      collection: 'categories',
      on: 'parent',
      hasMany: true,
    },
  ],
}
