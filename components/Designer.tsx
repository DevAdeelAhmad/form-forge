"use client"
import React from 'react'
import DesignerSidebar from './DesignerSidebar'

function Designer() {
  return (
    <div className='flex w-full h-full'>
      <div className="w-full p-4">
        <div className="max-w-[920px] bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
          <p className="text-3xl text-muted-foreground flex felx-grow items-center font-bold">Drop Here</p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

export default Designer
