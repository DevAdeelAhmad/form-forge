"use client"
import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import useDesigner from './hooks/useDesigner'

function Designer() {

  const { elements, addElement } = useDesigner();
  const droppadble = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    },

  })
  return (
    <div className='flex w-full h-full'>
      <div className="w-full p-4">
        <div ref={droppadble.setNodeRef}
          className={cn("max-w-[920px] bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppadble.isOver && "ring-2 ring-primary/20")}>

          {!droppadble.isOver && <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop Here</p>}

          {droppadble.isOver && (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}

        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

export default Designer
