import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/lib/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => !isSuperAdmin(user),
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
