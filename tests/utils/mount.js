import { mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import messages from '~~/tests/mocks/i18n'

export function createI18nPlugin(locale = 'en') {
  return createI18n({ legacy: false, locale, messages })
}

function globalOptions({ locale = 'en', pinia = true } = {}) {
  const plugins = [createI18nPlugin(locale)]

  if (pinia) {
    plugins.push(createTestingPinia({ createSpy: vi.fn, stubActions: false }))
  }

  return { plugins }
}

/** Mount a component with i18n + a testing Pinia already wired up. */
export function mountWith(component, { props, locale, pinia, ...rest } = {}) {
  return mount(component, {
    props,
    global: globalOptions({ locale, pinia }),
    ...rest,
  })
}

export function shallowMountWith(
  component,
  { props, locale, pinia, ...rest } = {}
) {
  return shallowMount(component, {
    props,
    global: globalOptions({ locale, pinia }),
    ...rest,
  })
}

export { messages }
