'use client'

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth"
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { LayoutList, Moon, Plus, Sun, Users } from "lucide-react"
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes";

type Props = {
    session: Session | null
}

export function HeaderNav({ session }: Props) {

    const pathname = usePathname();
    const tabValue = getTabValue(pathname);

    
    const { setTheme } = useTheme()

    if (!session?.user) {
        return (
            <div className="flex justify-end">
                <Button variant="secondary">
                    <Link href="/login">Войти</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 items-center gap-4">
            <div></div>
            <div className="flex jusify-center">
                <Tabs value={tabValue} className="w-fit">
                    <TabsList>
                        <TabsTrigger value="dashboard" asChild>
                            <Link href="/dashboard">
                                <Plus className="h-4 w-4" />
                                Создать сборку
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="builds" asChild>
                            <Link href="/builds">
                                <LayoutList className="h-4 w-4" />
                                Мои сборки
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="explore" asChild>
                            <Link href="/builds/explore">
                                <Users className="h-4 w-4" />
                                Публичные сборки
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex justify-end items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Светлая
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Тёмная
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            Системная
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => signOut({ redirectTo: '/' })}
                >
                    Выйти
                </Button>
            </div>
        </div>
    )
}