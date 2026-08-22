'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback: reveal immediately if already within the viewport on mount
    // (covers above-the-fold content where the observer may not re-fire).
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
  variant?: 'fade' | 'clip'
  threshold?: number
}

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  variant = 'fade',
  threshold = 0.2,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>(threshold)
  return (
    <Tag
      ref={ref as never}
      className={cn(variant === 'clip' ? 'clip-reveal' : 'reveal', inView && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/**
 * Line-by-line masked heading. Pass an array of lines.
 */
export function MaskHeading({
  lines,
  className,
  as: Tag = 'h2',
  threshold = 0.3,
}: {
  lines: ReactNode[]
  className?: string
  as?: ElementType
  threshold?: number
}) {
  const { ref, inView } = useInView<HTMLElement>(threshold)
  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn('mask-line', inView && 'is-visible')}>
          <span style={{ transitionDelay: `${i * 90}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
