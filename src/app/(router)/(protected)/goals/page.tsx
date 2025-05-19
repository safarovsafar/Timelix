"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabaseClient'
import { CheckCircle, PlusCircle, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
const userId = localStorage.getItem(`userId`)

const Goals = () => {

  const [goal, setGoal] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [goals, setGoals] = useState<any>([])

  async function getGoals() {
    try {
      const { data } = await supabase.from("goals").select("*").eq(`userId`, userId)
      setGoals(data)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGoals()
  }, [])

  async function goalFunc() {
    setLoading(true)
    try {

      let res = await supabase.from("goals").insert([{ userId: userId, done: false, goal: goal }])
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
      setGoal("")
    }
  }

  async function goalDone(el:any){
    try {
      await supabase.from("goals").update(el.done ? { done: false } : { done: true }).eq(`id`, el.id)
    } catch (error) {
      console.error(error);
    }
  }

  return <div>
    <div className='mt-24 flex justify-center'>
      <Textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder='Напишите свой цель' name="" id="" className='w-[95%] p-4 h-60 text-3xl' />
    </div>
    <Button disabled={loading} onClick={goalFunc} className='flex items-center justify-center py-2 rounded-xl text-white cursor-poin bg-gradient-to-r from-sky-500 to-indigo-500 m-auto cursor-pointer mb-5 mt-5 w-[95%]'><PlusCircle className="mr-2 h-4 w-4" />Сохранить</Button>

    <Table className='w-auto mt-5 ml-10'>
      <TableCaption>A list of your goals.</TableCaption>
      <TableHeader>
      </TableHeader>
      <TableBody>
        {goals?.map((e: any) => (
          <TableRow key={e.id}>
            <TableCell><Checkbox checked={e.done} onClick={()=>goalDone(e)} /></TableCell>
            <TableCell className="font-medium">{e.goal}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}

export default Goals
