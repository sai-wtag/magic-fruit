import { describe, expect, it } from 'vitest'
import { mountWith } from '@/tests/utils/mount'
import RoundProgress from '@/components/game/RoundProgress.vue'

const props = { current: 3, total: 7, percentage: 43 }

describe('@/components/game/RoundProgress.vue', () => {
  it('announces which question the player is on', () => {
    const wrapper = mountWith(RoundProgress, { props })

    expect(wrapper.find('[data-testid="round-progress-label"]').text()).toBe(
      'Question 3 of 7'
    )
    expect(wrapper.find('[data-testid="round-progress-value"]').text()).toBe(
      '43%'
    )
  })

  it('sizes the bar to the percentage', () => {
    const wrapper = mountWith(RoundProgress, { props })

    expect(
      wrapper.find('[data-testid="round-progress-bar"]').attributes('style')
    ).toContain('width: 43%')
  })

  it('exposes progress to assistive tech', () => {
    const bar = mountWith(RoundProgress, { props }).find('[role="progressbar"]')

    expect(bar.attributes('aria-valuenow')).toBe('3')
    expect(bar.attributes('aria-valuemin')).toBe('0')
    expect(bar.attributes('aria-valuemax')).toBe('7')
  })
})
