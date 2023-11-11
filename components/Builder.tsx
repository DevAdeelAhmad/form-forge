"use client"
import { Form } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import PreviewDialogButton from './PreviewDialogButton'
import SaveFormButton from './SaveFormButton'
import PublishFormButton from './PublishFormButton'
import Designer from './Designer'
import { DndContext, MouseSensor, useSensor, useSensors, TouchSensor } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'
import useDesigner from './hooks/useDesigner'
import { ImSpinner2 } from 'react-icons/im'

function Builder({ form }: { form: Form }) {
    const { setElements } = useDesigner();
    const [isReady, setIsReady] = useState(false);
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10, } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 300, tolerance: 5 } })

    const sensors = useSensors(mouseSensor, touchSensor)
    useEffect(() => {
        if (isReady) return;
        const elements = JSON.parse(form.content)
        setElements(elements);
        setIsReady(true);
        const readyTimeout = setTimeout(() => setIsReady(true), 500)
        return () => clearTimeout(readyTimeout);
    }, [form, setElements, isReady])
    if (!isReady) {
        return <div className='flex flex-col items-center justify-center w-full h-full'>
            <ImSpinner2 className="animate-spin h-12 w-12" />
        </div>
    }
    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full">
                <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
                    <h2 className='truncate font-medium'>
                        <span className='text-muted-foreground mr-2'>Form:</span>
                        {form.name}
                    </h2>
                    <div className='flex items-center gap-2'>
                        <PreviewDialogButton />
                        {!form.publised && (
                            <>
                                <SaveFormButton id={form.id} />
                                <PublishFormButton />
                            </>
                        )}
                    </div>
                </nav>
                {/* h-[120px] removed from below div*/}
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    )
}

export default Builder
