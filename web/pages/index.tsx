import type { NextPage } from 'next'
import { createClient } from 'next-sanity'
import Image from 'next/image'
import bg from '../assets/bg.png'

type Post = {
    slug: string
    title: string
    subtitle: string
    imageUrl: string
}

const Item = ({
    title,
    subTitle,
    imageUrl,
}: {
    title: string
    subTitle: string
    imageUrl: string
}) => {
    return (
        <div>
            <div className="relative h-44">
                <Image src={imageUrl} className="object-cover" layout="fill" alt="" />
            </div>
            <div className="mt-4 font-sans text-2xl">{title}</div>
            <div className="font-mono text-sm font-light">{subTitle}</div>
        </div>
    )
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
    return (
        <div className="">
            <main>
                <div className="fixed top-0 z-10 flex h-20 w-full items-center justify-between bg-white px-4">
                    <div className="font-sans text-4xl font-black tracking-tighter">POBS</div>
                    <div className="font-mono text-xl tracking-wide">Design Studio</div>
                </div>
                <figure className="sticky top-20 -z-10 mb-20 h-hero">
                    <Image
                        src={bg}
                        className="w-full overflow-hidden object-cover"
                        layout="fill"
                        alt=""
                    />
                </figure>
                <div className="sticky top-12 flex flex-wrap items-end border-b border-black bg-white px-4 pt-8 pb-1 font-mono font-light uppercase tracking-tighter text-gray-600">
                    <span className="w-1/4">travaux</span>
                    <span className="w-1/4">2022</span>
                    <span className="w-1/2 text-right">
                        43°17&apos;49.02&quot;N 5°22&apos;51.85&quot;E
                    </span>
                </div>
                <div className="z-100 bg-white pb-96">
                    <div className="mx-4 grid grid-cols-5 gap-8 bg-white pt-8">
                        {(posts || []).map((post) => (
                            <Item
                                key={post.slug}
                                title={post.title}
                                subTitle={post.subtitle}
                                imageUrl={post.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* <footer className="my-32"></footer> */}
        </div>
    )
}

const client = createClient({
    projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_API_DATASET,
    useCdn: false,
})

export async function getStaticProps() {
    const posts = await client.fetch(`*[_type == "post"]{
        title,
        subtitle,
        slug,
        "imageUrl": mainImage.asset->url
      }`)

    return {
        props: {
            posts,
        },
    }
}

export default Home
