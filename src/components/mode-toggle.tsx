import { Moon, Sun, SunMoon, Cog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import React from "react"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="outline" size="icon">
            <SunMoon className="dark:hidden"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
            <Cog className="mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
