import type React from "react"
export interface NavLink {
  name: string
  href: string
}

export interface GooeyBackgroundProps {
  activeIndex: number
  itemCount: number
  containerRef: React.RefObject<HTMLDivElement>
}

export interface MobileMenuProps {
  isOpen: boolean
  navLinks: NavLink[]
  activeSection: string
  onNavigate: (href: string) => void
}

export interface NavItemProps {
  link: NavLink
  isActive: boolean
  onClick: (href: string) => void
}
