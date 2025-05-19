"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

const formSchema = z
    .object({
        email: z.string().email("Некорректный email"),
        password: z.string().min(8, {
            message: "Пароль должна быть не менее 8 символов.",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    })


export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const { email } = values
        const { password } = values
        try {
            const { error } = await supabase.auth.signUp({ email, password })
            console.log(error);
            if (error) alert('Что-то пошло не так проверьте подключение к Интернету')
            else router.push("/login")
        } catch (error) {
        } finally {
            setIsLoading(false)

        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-4">
            <Card className="w-full max-w-md overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-500 pb-8 pt-8 text-white">
                    <CardTitle className="text-center text-2xl font-bold">Создать аккаунт</CardTitle>
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
                                            <Input placeholder="Введите свой Email" className="rounded-md" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Создать пароль"
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
                                            </div>
                                        </FormControl>
                                        <p className="text-xs text-gray-500">Пароль должна быть не менее 8 символов.</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Подтвердите пароль</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Подтвердите ваш пароль"
                                                    className="rounded-md pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <CardFooter className="flex-col items-center gap-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition-all hover:from-sky-600 hover:to-indigo-600"
                                    disabled={isLoading}>
                                    {isLoading ? "Создание учетной записи..." : "Создать аккаунт"}
                                </Button>
                                <p className="text-sm text-gray-600">
                                    Уже есть аккаунт?{" "}
                                    <Link href="/login" className="text-sky-600 hover:text-sky-800">
                                        Авторизоваться?
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