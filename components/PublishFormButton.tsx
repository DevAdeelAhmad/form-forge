import React, { startTransition, useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { FaIcons } from 'react-icons/fa'
import { toast } from './ui/use-toast'
import { PublishForm } from '@/actions/form'
import { useRouter } from 'next/navigation'

function PublishFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success!",
        description: "Your form was publsihed successfully.",
      })
      router.refresh();
    } catch (error) {
      toast({
        title: "Error!",
        description: "Error publishing form. Try Again.",
        variant: "destructive"
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className='gap-2 text-white font-bold  bg-gradient-to-r from-indigo-400 to-cyan-400'>
          <MdOutlinePublish className="w-4 h-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. Once you publish the form. It is not editable. <br /><br />
            <span className='font-medium'>By publishing this form, you will make it available to anyone who has it{'s'} link and they will be able to submit their response to this form.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={e => {
            e.preventDefault();
            startTransition(publishForm);
          }}><span className={loading ? "hidden" : "flex"}>Proceed</span> {loading && <FaIcons className="animate-spin" />}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormButton
