import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Displays the Dr Satinder Eye Care logo inside a clean neutral container
 * so its white circle and dark border never clash with the site palette.
 *
 * Swap `/images/logo-placeholder.png` with the supplied logo file to use the
 * real brand mark — aspect ratio and container are preserved.
 */
export function Logo({
  className,
  size = 44,
  showWordmark = true,
  tone = 'dark',
}: {
  className?: string
  size?: number
  showWordmark?: boolean
  tone?: 'dark' | 'light'
}) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/10 shadow-sm"
        style={{ width: size, height: size, padding: size * 0.08 }}
      >
        <Image
          src="/images/dr-satinder-eye-care-logo.jpeg"
          alt="Dr Satinder Eye Care logo"
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-serif text-lg tracking-tight',
              tone === 'light' ? 'text-ivory' : 'text-charcoal',
            )}
          >
            Dr Satinder
          </span>
          <span
            className={cn(
              'label-caps mt-1 text-[0.6rem]',
              tone === 'light' ? 'text-ivory/70' : 'text-muted-foreground',
            )}
          >
            Eye Care
          </span>
        </span>
      )}
    </span>
  )
}
