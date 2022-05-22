import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanityClient'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
}
