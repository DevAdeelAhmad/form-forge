"use client"
import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import useDesigner from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElement'
import { idGenerator } from '@/lib/idGenerator'

function Designer() {

  const { elements, addElement } = useDesigner();
  const droppadble = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    },
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement = active.data?.current?.isDesignerButtonElement;
      if (isDesignerButtonElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        addElement(0, newElement);
      }

    }
  })
  return (
    <div className='flex w-full h-full'>
      <div className="w-full p-4">
        <div ref={droppadble.setNodeRef}
          className={cn("max-w-[920px] bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppadble.isOver && "ring-2 ring-primary/20")}>

          {!droppadble.isOver && elements.length === 0 && <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop Here</p>}

          {droppadble.isOver && (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className='flex flex-col w-full gap-2 p-4'>
              {elements.map(element => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerElement = FormElements[element.type].designerComponent;
  const top = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesigner: true
    },
  })
  const bottom = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesigner: true
    },
  })
  return (
    <div className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'>
      <div ref={top.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottom.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
      <div className="flex w-full h-[120px] items-center rounded-md px-4 py-2 bg-accent/40 pointer-events-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div >
  )

}

export default Designer
