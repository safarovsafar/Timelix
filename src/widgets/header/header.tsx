"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [logo, setLogo] = useState<string>("")
    const router = useRouter()
    const pathName = usePathname()
    async function getLogo() {
        try {
            const { data } = supabase.storage
                .from('logo')
                .getPublicUrl('logo of timelix.PNG');
            setLogo(data.publicUrl)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLogo()
    }, [])

    function exit() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        localStorage.removeItem("access_token")
        localStorage.removeItem("userId")
        router.push("/login")
    }

    return (
        <header className="w-full bg-gradient-to-r z-10 fixed top-0 from-zinc-50/95 to-slate-100/95 border-b border-slate-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            {logo ? <Image src={logo!} alt="Timelix" width={100} height={100} /> : ""}
                            <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                                Timelix
                            </span>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className={` ${pathName == "/" ? "text-indigo-500" : "text-slate-600"} hover:text-slate-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all after:duration-300`}>Главная страница</Link>
                        <Link href="/goals" className={` ${pathName == "/goals" ? "text-indigo-500" : "text-slate-600"} hover:text-slate-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all after:duration-300`}> Цели</Link>
                        <Link href="/routine" className={`${pathName == "/routine" ? "text-indigo-500" : "text-slate-600"} hover:text-slate-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all after:duration-300`}> Pутина </Link>
                    </nav>

                    <div className="hidden lg:flex items-center space-x-4">
                        <Button onClick={exit} className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition-all hover:from-sky-600 hover:to-indigo-600"> Выйти </Button>
                    </div>

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>


            <div className={cn("lg:hidden bg-white border-t border-slate-200", isMenuOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-wrap justify-between">
                    <Link href="/" className="text-slate-600 block hover:text-slate-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300">Главная страница</Link>
                    <Link href="/goals" className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300"> Цели</Link>
                    <Link href="/routine" className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300"> Pутина </Link>
                </div>
                <div className="pt-4 pb-3 border-t border-slate-200 bg-slate-50">
                    <div className="mt-3 px-2 space-y-1">
                        <Button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition-all hover:from-sky-600 hover:to-indigo-600"> Выйти </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
