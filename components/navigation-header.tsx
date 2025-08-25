import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NavigationHeader() {
  return (
    <header className="max-w-6xl border-b p-4 mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="https://www.theauspiciouscompany.com">
            The Auspicious Company
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="https://tools.theauspiciouscompany.com">
            ← Back to Tools
          </Link>
        </Button>
      </div>
    </header>
  )
}