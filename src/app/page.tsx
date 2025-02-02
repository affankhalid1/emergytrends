import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {client} from "@/sanity/lib/client"
import imageUrlBuilder from '@sanity/image-url'

export default async function Home () {
  const builder = imageUrlBuilder(client)

  const query = `*[ _type == "blog"]`;
  const stories = await client.fetch(query);


  return (
    <section id = "Blog" className="bg-[url('./bg-3.jpg')] min-h-screen bg-cover bg-center">
      <div className='w-[70vw] mx-auto py-12 text-[#d3d3d3]'>
      <div className='text-center   mt-7 mb-16  text-[30px] xs:text-[42px] sm:text-[55px] md:text-[60px]'>BLOGS</div>
      <div className="blogs grid lg:grid-cols-2 2xl:grid-cols-3 gap-8 ">

        {stories.map((blog:any) => (
          <div key = {blog.slug.current} className='bg-[#0f0f0f] border-[0.2px] border-[#252525]  px-6 py-10 gap-6 flex flex-col'>
          <div className="Imagemain flex justify-center">
          <div className="img  overflow-hidden w-full  rounded-lg ">
            <Image className='object-contain rounded-lg transform transition duration-300 hover:scale-110' width={1000} height={210} src={builder.image(blog.blogImage).width(500).height(300).url()} alt='1'/>
          </div>
          </div>
          <div className="publishdate text-sm font-[500]">
          {("Posted on "+blog.publishedDate).toUpperCase()}
          </div>
          <div className="title text-[22px] 2xl:text-[28px]">
          {blog.title.toUpperCase()}
          </div>
          <div className="button">
            <Link href={"/blog/" + blog.slug.current}><button className='bg-[#ee4818] hover:bg-[#0f0f0f] border-[0.02px] border-[#ee4818] hover:border-[#646464] text-[#d3d3d3] px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 xl:px-6 xl:py-4 2xl:px-8 2xl:py-5 mb-2 text-xs 2xl:text-sm'>Read More</button></Link>  
          </div>
        </div>
        ))}
      </div>
      </div>
    </section>
  )
}
