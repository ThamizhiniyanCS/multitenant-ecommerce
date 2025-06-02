import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'stripeDetailsSubmitted',
      type: 'checkbox',
      admin: {
        readOnly: true,
        description: 'You cannot create products unitl you submit your Stripe details',
      },
    },
  ],
}
