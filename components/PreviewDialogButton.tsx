import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md'
import useDesigner from './hooks/useDesigner'
import { Dialog } from './ui/dialog';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';

function PreviewDialogButton() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='gap-2'>
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className="px-4 py-2 border-b">
          <p className='text-lg font-bold text-muted-foreground'>
            Form Preview
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewDialogButton
