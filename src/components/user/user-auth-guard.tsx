"use client"

import type React from "react"

interface UserAuthGuardProps {
  children: React.ReactNode
}

export function UserAuthGuard({ children }: UserAuthGuardProps) {
  return <>{children}</>
}
