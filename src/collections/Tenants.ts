import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/lib/access'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'name',
      label: 'Store Name',
      required: true,
      unique: true,
      type: 'text',
      admin: {
        description: "This is the name of the store (e.g. Antonio's Store)",
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
      access: { update: ({ req }) => isSuperAdmin(req.user) },
      admin: {
        description: 'This is the subdomain for the store (e.g. [slug].noroad.com',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'stripeAccountId',
      type: 'text',
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: 'Stripe Account ID associated with your shop',
      },
    },
    {
      name: 'stripeDetailsSubmitted',
      type: 'checkbox',
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: 'You cannot create products unitl you submit your Stripe details',
      },
    },
  ],
}
