import React from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'

function PublishFormButton() {
  return (
    <Button variant={"outline"} className='gap-2 text-white font-bold  bg-gradient-to-r from-indigo-400 to-cyan-400'>
      <MdOutlinePublish className="w-4 h-4" />
      Publish
    </Button>
  )
}

export default PublishFormButton
