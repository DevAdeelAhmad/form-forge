import React from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'

function SaveFormButton() {
  return (
    <Button variant={"outline"} className='gap-2'>
      <HiSaveAs className="h-4 w-4" />
      Save
    </Button>
  )
}

export default SaveFormButton
