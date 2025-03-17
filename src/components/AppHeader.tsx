import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PawPrint, Menu, X, Home, Search, PlusCircle, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"

export function AppHeader() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse Reports", href: "/browse", icon: Search },
    { name: "Create Report", href: "/create", icon: PlusCircle },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PawPrint className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold text-slate-900">PAWS</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-amber-50 text-amber-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>anonymous_user</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? "bg-amber-50 text-amber-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600"
                onClick={() => {
                  setMobileMenuOpen(false)
                  // Handle logout
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

