import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'
import { BUTTON_VARIANTS } from '@/components/ui/button.styles'

describe('@/components/ui/BaseButton.vue', () => {
  it('renders its default slot', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Play' } })

    expect(wrapper.text()).toBe('Play')
  })

  it('renders leading and trailing slots', () => {
    const wrapper = mount(BaseButton, {
      slots: { leading: '<i data-testid="lead" />', trailing: '<i data-testid="trail" />' },
    })

    expect(wrapper.find('[data-testid="lead"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="trail"]').exists()).toBe(true)
  })

  it('defaults to type="button" so it never submits a form by accident', () => {
    expect(mount(BaseButton).attributes('type')).toBe('button')
  })

  it.each(Object.keys(BUTTON_VARIANTS))(
    'applies the "%s" variant classes',
    variant => {
      const wrapper = mount(BaseButton, { props: { variant } })

      expect(wrapper.classes()).toEqual(
        expect.arrayContaining(BUTTON_VARIANTS[variant].split(' '))
      )
    }
  )

  it('keeps a thumb-friendly minimum height at every size', () => {
    const heights = ['sm', 'md', 'lg'].map(size =>
      mount(BaseButton, { props: { size } })
        .classes()
        .find(className => className.startsWith('min-h-'))
    )

    expect(heights).toEqual([
      'min-h-[2.75rem]',
      'min-h-[3rem]',
      'min-h-[3.5rem]',
    ])
  })

  it('spans the full width when block is set', () => {
    expect(mount(BaseButton, { props: { block: true } }).classes()).toContain(
      'w-full'
    )
  })

  it('emits a click', async () => {
    const wrapper = mount(BaseButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
