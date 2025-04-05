import { Image } from '@/types/frontend';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react'

const Carousel = () => {
    const { images } = usePage<{ images: Image[]}>().props;
    
  return (
    <>
    <div>
        {images.map((image) => (
            <img src={image.thumb}  key={image.id} />
        ))}
    </div>
    </>
  )
}

export default Carousel