import React from 'react'
import Image from 'next/image'
import {client} from "@/sanity/lib/client"
import imageUrlBuilder from '@sanity/image-url'

const page = async ({params}: {params: {id: string}}) => {

    const builder = imageUrlBuilder(client)

   const id =  params.id
    let query = `*[_type == "author" && _id == "${id}"][0]`
    let author = await client.fetch(query)


  return (
    <div className='flex flex-col  items-center gap-8 p-12'>
        <div className=''>
            <Image className='rounded-full' src={builder.image(author.image).width(500).height(500).url()} width={300} height={300} alt = {author.name}/>
        </div>
        <div className='text-3xl font-bold mb-10'>
            {author.name}
        </div>
        <div className='text-lg w-[50vw] text-center flex flex-col gap-4'>
        <div className='text-3xl font-bold'>
            About
        </div>
            {author.about}
        </div>
    </div>
  )
}

export default page
