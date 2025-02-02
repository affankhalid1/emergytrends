import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {client} from "@/sanity/lib/client"
import dynamics from 'next/dynamic';
import imageUrlBuilder from '@sanity/image-url'
import { Metadata } from 'next';
const PortableText = dynamics(() => import('react-portable-text'), { ssr: false });

const BlogPages = async ({params}:{params:{slug:string}}) => {
    const builder = imageUrlBuilder(client)

    const query = `*[ _type == "blog" && slug.current == "${params.slug}"][0]`;

    const blog = await client.fetch(query);


    const author_id = blog.author.author._ref

    const query2 = `*[_type == "author" && _id == "${author_id}"][0]`;
    const author = await client.fetch(query2)

    
  
    return (
      <section className="bg-[#131313] min-h-screen bg-cover bg-center">
        <div className='w-[70vw] mx-auto pt-12 text-gray-100'>
            <div className="title text-2xl  sm:font-normal xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl py-20 font-semibold text-gray-100">
            {blog.title.toUpperCase()}
            </div>
              <div className=''>
              <Image className='object-contain rounded-lg ' width={800} height={550} src={builder.image(blog.blogImage).width(800).height(550).url()} alt='1'/>
                <div className='italic underline-offset-4 my-4'>{blog.blogImage.caption}</div>
              </ div>

              <div className='my-16 ml-3 sm:ml-10 mr-4 text-sm sm:text-lg text-gray-150'>
                <PortableText
                // Pass in block content straight from Sanity.io
                content={blog.content}
                projectId = "7qnpkdw9"
                dataset = "production"
                // Optionally override marks, decorators, blocks, etc. in a flat
                // structure without doing any gymnastics
                serializers={{
                    h1: (props: any) => <h1 className='hidden text-2xl sm:text-3xl font-bold text-gray-100 py-10 bg-gray-200' {...props} />,
                    h2: (props: any) => <h2 className='text-2xl sm:text-3xl  text-black font-bold my-10 p-2 bg-gray-100' {...props} />,
                    h3: (props: any) => <h3 className=' text-xl sm:text-2xl text-gray-100 font-bold py-4' {...props} />,
                    code: (props: any) => <code className='text-xl bg-white text-black  ' {...props} />,
                    li: ({ children }: { children: React.ReactNode }) => <li className="special-list-item">{children}</li>,
                }}
                />
                </div>

            <div className='sm:mx-4 justify-between flex items-center p-8 font-semibold '>
            <div className="publishdate text-sm ">
            {("Posted on "+blog.publishedDate).toUpperCase()}
            </div>
            <div className='flex gap-4 items-center'>
                <Link href={`/author/${author._id}`}><Image className='rounded-full ' src={builder.image(author.image).width(60).height(60).url()} width={40} height={40} alt = {author.name} /></Link>
                <Link href={`/author/${author._id}`}><div className='text-lg'>{author.name}</div></Link>
                
            </div>
            </div>

        </div>
      </section>
    )
}

export default BlogPages

