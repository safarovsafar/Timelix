"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSelector } from "react-redux";
import { PlusCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const formSchema = z.object({
    task: z.string().min(2, {
        message: "Имя рутины должно содержать минимум 2 символа"
    }),
    time: z.string().min(1, {
        message: "Выберите время"
    })
})

const AddTask = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
    const { loading, routineId } = useSelector((store: any) => store.routine)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            time: "8:00"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await supabase.from("tasks")
                .insert([{ routineId: routineId, task: values.task, time: values.time, done: false }])
        } catch (error) {
            console.error(error);
        }
        finally{
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex items-center justify-center py-2 rounded-md cursor-pointer text-white cursor-poin bg-gradient-to-r from-sky-500 to-indigo-500 w-full'><PlusCircle className="mr-2 h-4 w-4" />Добавить задачу</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить рутину</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="task" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Задача</FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите задачу" type="text" className="rounded-md" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />

                        <FormField control={form.control} name="time" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Время</FormLabel>
                                <FormControl>
                                    <Input placeholder="Время" type="time" min={"1:00"} max={"24:00"} className="rounded-md" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition-all hover:from-sky-600 hover:to-indigo-600">{loading ? "Добавляется задача..." : "Добавить задачу"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask