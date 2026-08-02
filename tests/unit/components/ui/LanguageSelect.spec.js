import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '~~/tests/utils/mount'
import LanguageSelect from '@/components/ui/LanguageSelect.vue'
import { LOCALES } from '@/constants/locales'

describe('@/components/ui/LanguageSelect.vue', () => {
  it('lists every supported locale', () => {
    const wrapper = mountWith(LanguageSelect)
    const options = wrapper.findAll('option')

    expect(options).toHaveLength(LOCALES.length)
    expect(options.map(option => option.attributes('value'))).toEqual(
      LOCALES.map(({ code }) => code)
    )
    expect(options.map(option => option.text())).toEqual(
      LOCALES.map(({ name }) => name)
    )
  })

  it('preselects the active locale', () => {
    const wrapper = mountWith(LanguageSelect, { locale: 'bn' })

    expect(wrapper.find('[data-testid="language-select"]').element.value).toBe(
      'bn'
    )
  })

  it('switches the locale on change', async () => {
    const wrapper = mountWith(LanguageSelect, { locale: 'en' })
    const select = wrapper.find('[data-testid="language-select"]')

    await select.setValue('fr')

    expect(select.element.value).toBe('fr')
  })

  it('labels itself for screen readers', () => {
    const wrapper = mountWith(LanguageSelect)

    expect(
      wrapper.find('[data-testid="language-select"]').attributes('aria-label')
    ).toBe(messages.en['general.select-language'])
  })
})
