import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET,
    useCdn: true,
    apiVersion: '2021-08-31',
})
