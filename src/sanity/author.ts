const author =  {
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'about',
        type: 'string',
        title: 'About',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options:{
            hotspot: true
        }
      },
    ]
    }

export default author