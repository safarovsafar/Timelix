"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(1, {
        message: "Требуется пароль.",
    }),
    rememberMe: z.boolean().default(false).optional(),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [wrong, setWrong] = useState("")
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const { email } = values
        const { password } = values
        try {
            const res: any = await supabase.auth.signInWithPassword({ email, password })
            const token = res.data.session.access_token
            const userId = res.data.user.id
            console.log(userId);
            localStorage.setItem("access_token", `${token}`)
            localStorage.setItem("userId", `${userId}`)
            document.cookie = `token=${token}; path=/; max-age=3600`;
            if (token) {
                router.push("/")
            }
            else {
                setWrong("Неверный пароль или Email")
            }
        } catch (error) {
            setWrong("Неверный пароль или Email")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-4">
            <Card className="w-full max-w-md overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-500 pb-8 pt-8 text-white">
                    <CardTitle className="text-center text-2xl font-bold">Добро пожаловать</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Введите свой email" type="text" className="rounded-md" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Пароль</FormLabel>
                                            <Link href="/forgot-password" className="text-xs text-sky-600 hover:text-sky-800">
                                                Забыли пароль?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Введите свой пароль"
                                                    className="rounded-md pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                                </Button>
                                                <span className="text-red-500 mt-6">{wrong}</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-1.5 space-y-0 pt-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal">Запомнить</FormLabel>
                                        </div>
                                    </FormItem>)} />

                            <CardFooter className="flex flex-col items-center gap-4 px-0 pt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition-all hover:from-sky-600 hover:to-indigo-600"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Вход в систему..." : "Авторизатсия"}
                                </Button>

                                <p className="text-sm text-gray-600">
                                    У вас еще нет учетной записи?{" "}
                                    <Link href="/register" className="text-sky-600 hover:text-sky-800">
                                        Зарегистрироваться?
                                    </Link>
                                </p>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}