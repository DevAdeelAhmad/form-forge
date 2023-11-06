"use client";
import React, { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import useDesigner from './hooks/useDesigner';
import { FormElementInstance, FormElements } from './FormElement';
import { Button } from './ui/button';
import { BiSolidTrash } from 'react-icons/bi';

export function DesignerElementWrapper({ element }: { element: FormElementInstance; }) {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    }
  });

  const top = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesigner: true
    },
  });
  const bottom = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesigner: true
    },
  });

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
        setSelectedElement(element);
      }}
    >
      <div ref={top.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottom.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500' variant={"outline"} onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
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
  );

}
