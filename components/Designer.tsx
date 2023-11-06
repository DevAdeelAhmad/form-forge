"use client"
import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import useDesigner from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElement'
import { idGenerator } from '@/lib/idGenerator'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'

function Designer() {

  const { elements, addElement, selectedElement, setSelectedElement } = useDesigner();
  const droppable = useDroppable({
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
      <div className="w-full p-4" onClick={() => {
        if (selectedElement) setSelectedElement(null)
      }}>
        <div ref={droppable.setNodeRef}
          className={cn("max-w-[920px] bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20")}>
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop Here</p>
          )}
          {droppable.isOver && elements.length === 0 && (
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
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    }
  })

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

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element)
      }}
    >
      <div ref={top.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottom.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500' variant={"outline"} onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id)
            }}>
              <BiSolidTrash className="w-6 h-6" />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>Click for Properties or Drag for Move</p>
          </div>
        </>
      )}
      {top.isOver && (
        <div className='absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-primary' />
      )}
      {bottom.isOver && (
        <div className='absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-primary' />
      )}
      <div className={cn("flex w-full h-[120px] items-center rounded-md px-4 py-2 bg-accent/40 pointer-events-none opacity-100", mouseIsOver && "opacity-30")}>
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  )

}

export default Designer
