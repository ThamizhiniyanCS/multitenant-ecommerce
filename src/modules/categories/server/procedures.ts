import { Category } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: 'categories',
      depth: 1, // NOTE: Populate subcategories, subcategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name',
    })

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // NOTE: Because of "depth: 1" we are confident "doc" will be a type of "Category"
        ...(doc as Category),
      })),
    }))

    return formattedData
  }),
})
