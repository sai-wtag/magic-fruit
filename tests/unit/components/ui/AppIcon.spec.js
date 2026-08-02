import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppIcon from '@/components/ui/AppIcon.vue'
import { ICONS, ICON_NAMES } from '@/constants/icons'

describe('@/components/ui/AppIcon.vue', () => {
  it.each(ICON_NAMES)('renders the "%s" icon body', name => {
    const wrapper = mount(AppIcon, { props: { name } })

    expect(wrapper.html()).toContain('<path')
    expect(wrapper.attributes('data-icon')).toBe(name)
  })

  it('renders nothing but an empty svg for an unknown icon', () => {
    const wrapper = mount(AppIcon, { props: { name: 'does-not-exist' } })

    expect(wrapper.element.tagName.toLowerCase()).toBe('svg')
    expect(wrapper.html()).not.toContain('<path')
  })

  it('is hidden from assistive tech when it has no label', () => {
    const wrapper = mount(AppIcon, { props: { name: 'play' } })

    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('becomes an image with a label when one is given', () => {
    const wrapper = mount(AppIcon, {
      props: { name: 'play', label: 'Play' },
    })

    expect(wrapper.attributes('aria-hidden')).toBeUndefined()
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Play')
  })

  it.each([
    ['sm', 'h-4 w-4'],
    ['lg', 'h-6 w-6'],
    ['nonsense', 'h-5 w-5'], // falls back to md
  ])('maps size "%s" to "%s"', (size, expected) => {
    const wrapper = mount(AppIcon, { props: { name: 'play', size } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(expected.split(' ')))
  })

  it('exposes every icon it advertises', () => {
    expect(ICON_NAMES.length).toBe(Object.keys(ICONS).length)
  })
})
