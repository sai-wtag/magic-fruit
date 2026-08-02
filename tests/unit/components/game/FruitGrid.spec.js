import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '~~/tests/utils/mount'
import FruitGrid from '@/components/game/FruitGrid.vue'
import { ALL_FRUITS, FRUITS } from '@/constants/fruits'

describe('@/components/game/FruitGrid.vue', () => {
  it('renders nothing when there are no fruits', () => {
    const wrapper = mountWith(FruitGrid, { props: { fruits: [] } })

    expect(wrapper.find('[data-testid="fruit-grid"]').exists()).toBe(false)
  })

  it('renders one card per fruit', () => {
    const wrapper = mountWith(FruitGrid, { props: { fruits: ALL_FRUITS } })

    expect(wrapper.find('[data-testid="fruit-grid"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="fruit"]')).toHaveLength(
      ALL_FRUITS.length
    )
  })

  it('translates fruit names', () => {
    const wrapper = mountWith(FruitGrid, {
      props: { fruits: [FRUITS.mango, FRUITS.coconut] },
      locale: 'bn',
    })

    expect(
      wrapper.findAll('[data-testid="fruit-name"]').map(node => node.text())
    ).toEqual([messages.bn['fruit.mango'], messages.bn['fruit.coconut']])
  })

  it('serves webp with a png fallback and a translated alt text', () => {
    const wrapper = mountWith(FruitGrid, { props: { fruits: [FRUITS.mango] } })
    const image = wrapper.find('[data-testid="fruit-image"]')

    expect(wrapper.find('source').attributes('srcset')).toBe(
      '/images/fruits/1.webp'
    )
    expect(image.attributes('src')).toBe('/images/fruits/1.png')
    expect(image.attributes('alt')).toBe(messages.en['fruit.mango'])
  })

  it('lazy-loads grid images and reserves their space', () => {
    const image = mountWith(FruitGrid, {
      props: { fruits: [FRUITS.mango] },
    }).find('[data-testid="fruit-image"]')

    expect(image.attributes('loading')).toBe('lazy')
    expect(image.attributes('width')).toBe('64')
    expect(image.attributes('height')).toBe('64')
  })

  it('updates when the round changes', async () => {
    const wrapper = mountWith(FruitGrid, { props: { fruits: ALL_FRUITS } })

    await wrapper.setProps({ fruits: [FRUITS.mango] })

    expect(wrapper.findAll('[data-testid="fruit"]')).toHaveLength(1)
  })
})
