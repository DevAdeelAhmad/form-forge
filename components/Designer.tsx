"use client"
import React from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import useDesigner from './hooks/useDesigner'
import { ElementsType, FormElements } from './FormElement'
import { idGenerator } from '@/lib/idGenerator'
import { DesignerElementWrapper } from './DesignerElementWrapper'

function Designer() {

  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner();
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
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

      const droppingSidebarButtonOverDropArea = isDesignerButtonElement && isDroppingOverDesignerDropArea;
      if (droppingSidebarButtonOverDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        addElement(elements.length, newElement);
        return;
      }
      const isDroppingOverDesignerElementTop = over.data?.current?.isTopHalfDesigner;
      const isDroppingOverDesignerElementBottom = over.data?.current?.isBottomHalfDesigner;
      const isDroppingOverDesignerElement = isDroppingOverDesignerElementTop || isDroppingOverDesignerElementBottom;
      const droppingSidebarButtonOverDesignerElement = isDesignerButtonElement && isDroppingOverDesignerElement;
      if (droppingSidebarButtonOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex(el => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("Element not found!");
        }
        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottom) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const draggingDesignerElementOverAnotherElement = isDroppingOverDesignerElement && isDraggingDesignerElement;
      if (draggingDesignerElementOverAnotherElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
        const activeElementIndex = elements.findIndex(el => el.id === activeId);
        const overElementIndex = elements.findIndex(el => el.id === overId);
        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }
        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);
        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottom) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, activeElement);
      }
    },
  });
  return (
    <div className='flex w-full h-full'>
      <div className="w-full p-4" onClick={() => {
        if (selectedElement) setSelectedElement(null)
      }}>
        <div ref={droppable.setNodeRef}
          className={cn("max-w-[920px] bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-inset ring-primary")}>
          {!droppable.isOver && elements.length === 0 && (
            <p className="sm:text-2xl text-muted-foreground text-center px-2 flex flex-grow items-center font-bold">Drop elements here to build a form</p>
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

export default Designer
