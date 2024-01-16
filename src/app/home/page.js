import { notFound } from 'next/navigation';
import React from 'react'

export default function homePage({searchParams}) {
  if(searchParams.test==="true"){notFound();}
  return (
    <div> 
    <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>

    </div>
  )
}
