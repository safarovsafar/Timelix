"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { CheckCircle, X, XCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'


const Routine = () => {
  const router = usePathname()
  const path = router.slice(10)
  const [tasks, setTasks] = useState<any>([])

  async function getTasks() {
    try {
      const { data }: { data: any } = await supabase.from("tasks").select("*").eq("routineId", path)
      console.log(data);
      setTasks(data)
    } catch (error) {
      console.error(error);
    }
  }

  async function doneFunc(task: any) {
    console.log(task);
    try {
      let res = await supabase.from("tasks").update(task.done ? { done: false } : { done: true }).eq(`id`, task.id)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <Table className='w-[95%] m-auto'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Done</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task: any) => (
          <TableRow key={task.id}>
            <TableCell>{task.task}</TableCell>
            <TableCell className="font-medium">{task.time}</TableCell>
            <TableCell>{task.created_at}</TableCell>
            <TableCell>{task.created_at.slice(0, 10)}</TableCell>
            <TableCell>{task.done ? <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" /> : <XCircle className='h-4 w-4 text-red-500 flex-shrink-0' />}</TableCell>
            <TableCell><Checkbox checked={task.done ? true : false} onClick={() => doneFunc(task)} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Routine
