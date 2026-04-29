'use client'
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
}

export default function Loading({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const timer = useRef<number | NodeJS.Timeout>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prevLoading) => !prevLoading)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className={clsx('flex flex-col items-center gap-4', loading ? 'animate-spin' : '')}>
        <div className="w-10 h-10 border-2 border-zinc-200 border-t-zinc-900 rounded-full" />
        <p className="text-sm text-zinc-400 font-medium">Loading…</p>
      </div>
      {children}
    </div>
  )
}