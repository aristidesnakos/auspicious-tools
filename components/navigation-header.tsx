import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NavigationHeader() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Button variant="ghost" asChild>
            <Link 
              href="https://www.theauspiciouscompany.com"
              className="flex items-center space-x-2"
            >
              <span className="font-bold">The Auspicious Company</span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://tools.theauspiciouscompany.com">
                ← Back to Tools
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}