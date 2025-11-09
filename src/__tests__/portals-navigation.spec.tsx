import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

function PortalStress({ show }: { show: boolean }) {
  return (
    <TooltipProvider delayDuration={0}>
      <div>
        {show && (
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button data-testid="tooltip-btn">Tooltip</button>
              </TooltipTrigger>
              <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>

            <Popover>
              <PopoverTrigger asChild>
                <button data-testid="popover-btn">Popover</button>
              </PopoverTrigger>
              <PopoverContent>Popover content</PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

describe('Portals unmount without NotFoundError', () => {
  it('mounts and unmounts tooltips/popovers without DOM removeChild errors', () => {
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { rerender, unmount, getByTestId } = render(<PortalStress show={true} />)

    // Interact with triggers to ensure portals render
    fireEvent.mouseEnter(getByTestId('tooltip-btn'))
    fireEvent.click(getByTestId('popover-btn'))

    // Unmount the subtree simulating navigation
    rerender(<PortalStress show={false} />)
    unmount()

    expect(spyError).not.toHaveBeenCalled()
    expect(spyWarn).not.toHaveBeenCalled()

    spyError.mockRestore()
    spyWarn.mockRestore()
  })
})