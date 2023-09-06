import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import GetPost from '../GetPost/GetPost'
const Gallery = () => {
  return (
    <div className="mt-14 p-4 bg-[#b9f1f7c8]">
      <CreatePost />
      <GetPost />
    </div>
  )
}

export default Gallery
