import type { NextPage } from 'next'
import Head from 'next/head'
import { client } from '../utils/sanityClient'
import { urlFor } from '../utils/image-url'
import Image from 'next/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

type Post = {
    slug: { current: string }
    title: string
    subtitle: string
    mainImage: SanityImageSource & { alt?: string }
}

const Item = ({ post }: { post: Post }) => {
    const { mainImage, title, subtitle } = post

    return (
        <div className="z-0">
            <figure className="relative h-44">
                <Image
                    blurDataURL={urlFor(mainImage)
                        .width(64)
                        .blur(50)
                        .quality(30)
                        .fit('clip')
                        .auto('format')
                        .url()}
                    placeholder="blur"
                    decoding="async"
                    src={urlFor(mainImage).width(500).quality(90).fit('clip').auto('format').url()}
                    className="object-cover"
                    layout="fill"
                    alt={mainImage.alt || ''}
                />
            </figure>
            <p className="mt-4 font-sans text-2xl">{title}</p>
            <p className="font-mono text-sm font-light">{subtitle}</p>
        </div>
    )
}

const Home: NextPage<{
    posts: Array<Post>
    siteSettings: { mainImage: SanityImageSource & { alt: string }; title: string }
}> = ({ posts, siteSettings }) => {
    return (
        <>
            <Head>
                <title>{siteSettings.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>
                <div className="fixed top-0 z-20 flex h-20 w-full items-center bg-white px-4">
                    <p className="font-sans text-4xl font-black tracking-tighter">POBS</p>
                </div>
                <figure className="sticky top-20 -z-10 mb-20 h-hero">
                    <Image
                        blurDataURL={urlFor(siteSettings.mainImage)
                            .width(64)
                            .blur(50)
                            .quality(30)
                            .fit('clip')
                            .auto('format')
                            .url()}
                        placeholder="blur"
                        sizes="100vw"
                        src={urlFor(siteSettings.mainImage)
                            .width(2000)
                            .quality(90)
                            .fit('clip')
                            .auto('format')
                            .url()}
                        className="w-full overflow-hidden object-cover"
                        layout="fill"
                        alt={siteSettings.mainImage.alt}
                        priority
                        decoding="async"
                    />
                </figure>
                <div className="sticky top-12 z-10 flex flex-wrap items-end border-b border-black bg-white px-4 pt-8 pb-1 font-mono font-light uppercase tracking-tighter text-gray-600">
                    <p className="w-1/4">travaux</p>
                    <p className="w-1/4">2022</p>
                    <p className="w-1/2 text-right">
                        43°17&apos;49.02&quot;N 5°22&apos;51.85&quot;E
                    </p>
                </div>
                <div className="z-100 z-0 bg-white pb-96">
                    <div className="mx-4 grid grid-cols-1 gap-8 bg-white pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {(posts || []).map((post) => (
                            <Item key={post.slug.current} post={post} />
                        ))}
                    </div>
                </div>
            </main>

            {/* <footer className="my-32"></footer> */}
        </>
    )
}

export async function getStaticProps() {
    const posts = await client.fetch(`*[_type == "post"]{
        title,
        subtitle,
        slug,
        mainImage
      }`)
    const siteSettings = await client.fetch(`*[_type == "siteSettings"]{
        title,
        mainImage
      }[0]`)

    return {
        props: {
            posts,
            siteSettings,
        },
    }
}

export default Home
