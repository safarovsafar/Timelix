import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t bg-muted/40 px-10">
            <div className="container flex flex-col gap-2 py-10 md:h-24 md:flex-row md:items-center md:justify-between md:py-0">
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                    <Link href="/" className="text-sm font-medium">
                        © 2024 GoalTracker
                    </Link>
                </div>
                <div className="flex gap-4 md:gap-6">
                    <Link href="/about" className="text-sm font-medium hover:underline">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:underline">
                        Contact
                    </Link>
                    <Link href="https://github.com" className="text-sm font-medium hover:underline">
                        <span className="flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            GitHub
                        </span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
