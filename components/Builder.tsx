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
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import Link from 'next/link'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

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

    const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`
    if (form.publised) {
        return <>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className='max-w-md'>
                    <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
                        Your Form is Published!
                    </h1>
                    <h2 className='text-2xl'>Share this form</h2>
                    <h3 className='text-xl text-muted-foreground border-b pb-10'>Anyone with the link can view and submit the form</h3>
                    <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                        <Input className='w-full' readOnly value={shareUrl} />
                        <Button className='mt-2 w-full' onClick={() => {
                            navigator.clipboard.writeText(shareUrl);
                            toast({
                                title: "Copied!",
                                description: "Url Copied to Clipboard..."
                            })
                        }}>Copy Form Link</Button>
                    </div>
                    <div className="flex justify-between">
                        <Button variant={"link"} asChild>
                            <Link href={'/'} className='gap-2'>
                                <BsArrowLeft />
                                Go to Homepage
                            </Link>
                        </Button>
                        <Button variant={"link"} asChild>
                            <Link href={`/forms/${form.id}`} className='gap-2'>
                                <BsArrowRight />
                                Form Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
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
                                <PublishFormButton id={form.id} />
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
