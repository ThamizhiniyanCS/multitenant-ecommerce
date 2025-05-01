import { RefObject } from 'react'

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>,
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 }

    const rect = ref.current.getBoundingClientRect()
    const dropdownWidth = 240 // NOTE: Width of dropdown ("w-60" = 15rem = 240px)

    // NOTE: Calculate Initial Position
    let left = rect.left + window.scrollX
    let top = rect.bottom + window.scrollY

    // NOTE: Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // NOTE: Align to right edge of button instead
      left = rect.right + window.scrollX - dropdownWidth

      // NOTE: If still off-screen, align to the right edge of viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16
      }
    }

    // NOTE: Ensure dropdown doesn't go off left edge
    if (left < 0) {
      left = 16
    }

    return { top, left }
  }

  return { getDropdownPosition }
}
