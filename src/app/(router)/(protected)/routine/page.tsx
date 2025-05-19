"use client"

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardShell } from '@/widgets/dashboard-shell'
import { CheckCircle, Clock, Filter, PlusCircle, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { supabase } from '@/lib/supabaseClient'
import { useDispatch, useSelector } from "react-redux";
import AddTask from '@/widgets/add-task-dialog'
import Link from 'next/link'

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Имя рутины должно содержать минимум 2 символа"
  }),
  category: z.string().min(1, {
    message: "Выберите категероию"
  })
})


const Routine = () => {

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [routines, setRoutines] = useState<any>()
  const [openTask, setOpanTask] = useState<boolean>(false)
  const { routineId } = useSelector((store: any) => store.routine)
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    let category = values.category
    const userId = localStorage.getItem("userId")
    let title = values.title
    try {
      const res = await supabase.from("routine").insert({ category, title, userId })
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
      setOpen(false)
    }
  }

  async function getRoutines(userId: any) {
    try {
      let { data }: { data: any } = await supabase.from("routine").select('*').eq("userId", userId)
      setRoutines(data)
    } catch (error) {
      console.error(error);
    }
  }

  async function getTasks() {
    console.log(routineId);
    try {
     await supabase.from("tasks").select("*").eq("routineId", routineId)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    getRoutines(userId)
  }, [])

  return (
    <div>
      <DashboardShell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className='flex items-center justify-center py-2 rounded-xl text-white cursor-poin bg-gradient-to-r from-sky-500 to-indigo-500'><PlusCircle className="mr-2 h-4 w-4" />Создать новую рутину</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить рутину</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя рутины</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите имя рутины" type="text" className="rounded-md" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>)} />

                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <Select {...field} value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Категория рутины" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent defaultValue={"daily"}>
                        <SelectItem value="daily">Ежедневно</SelectItem>
                        <SelectItem value="monday">Понедельник</SelectItem>
                        <SelectItem value="tuesday">Вторник</SelectItem>
                        <SelectItem value="wednesday">Среда</SelectItem>
                        <SelectItem value="thursday">Четверг</SelectItem>
                        <SelectItem value="friday">Пятница</SelectItem>
                        <SelectItem value="saturday">Суббота</SelectItem>
                        <SelectItem value="sunday">Воскресенье</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition-all hover:from-sky-600 hover:to-indigo-600">{loading ? "Создается новый рутина..." : "Создать рутину"}</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search routines..." className="w-full pl-8" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Фильтр
            </Button>
            <Button variant="outline" size="sm">
              Все
            </Button>
            <Button variant="outline" size="sm">
              Ежедневно
            </Button>
            <Button variant="outline" size="sm">
              Еженедельно
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="daily">Ежедневно</TabsTrigger>
            <TabsTrigger value="weekly">Еженедельно</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routines?.map((routine: any) => (
                <Card key={routine.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="p-4 pb-2 bg-gradient-to-r from-primary/10 to-purple-500/10">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-background">
                        {routine.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                      </div>
                    </div>
                    <CardTitle className="mt-2">{routine.title}</CardTitle>
                  </CardHeader>
                  <Link href={`/routine/:${routine.id}`} className='flex flex-row items-center w-[95%] gap-2 m-auto hover:bg-gray-200 p-2 rounded-md'>
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <p className='text-lg font-medium'>Задачи</p>
                  </Link>
                  <CardContent className="p-4 pt-2">
                    <p onClick={() => dispatch(routine.id)} className="mt-4 w-full justify-start">
                      <AddTask open={openTask} setOpen={setOpanTask} />
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>


          <TabsContent value="daily" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routines?.filter((routine: any) => routine.category === "daily")
                .map((routine: any) => (
                  <Card key={routine.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-4 pb-2 bg-gradient-to-r from-primary/10 to-purple-500/10">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="bg-background">
                          {routine.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                        </div>
                      </div>
                      <CardTitle className="mt-2">{routine.title}</CardTitle>
                    </CardHeader>
                    <CardDescription onClick={() => {
                      dispatch(routine.id)
                      getTasks()
                    }} className='flex gap-2 flex-row items-center w-[95%] m-auto hover:bg-gray-200 p-2 rounded-md'>
                      <Link href={`/routine/:${routine.id}`} className='flex flex-row items-center w-[95%] gap-2 m-auto hover:bg-gray-200 p-2 rounded-md'>
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <p className='text-lg font-medium'>Задачи</p>
                      </Link>
                    </CardDescription>
                    <CardContent className="p-4 pt-2">
                      <p onClick={() => dispatch(routine.id)} className="mt-4 w-full justify-start">
                        <AddTask open={openTask} setOpen={setOpanTask} />
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>


          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routines?.filter((routine: any) => routine.category != "daily")
                .map((routine: any) => (
                  <Card key={routine.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-4 pb-2 bg-gradient-to-r from-primary/10 to-purple-500/10">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="bg-background">
                          {routine.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {routine.time}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{routine.title}</CardTitle>
                    </CardHeader>
                    <CardDescription className='flex gap-2 flex-row items-center w-[95%] m-auto hover:bg-gray-200 p-2 rounded-md'>
                      <Link href={`/routine/:${routine.id}`} className='flex flex-row items-center w-[95%] gap-2 m-auto hover:bg-gray-200 p-2 rounded-md'>
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <p className='text-lg font-medium'>Задачи</p>
                      </Link>
                    </CardDescription>
                    <CardContent className="p-4 pt-2">
                      <p onClick={() => dispatch(routine.id)} className="mt-4 w-full justify-start">
                        <AddTask open={openTask} setOpen={setOpanTask} />
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </div>
  )
}

export default Routine
