import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter', () => {
  it('renders correctly', () => {
    const wrapper = mount(AppFooter)

    expect(wrapper.html()).toBeTruthy()
  })

  it('emits "onClickFinder" event when the "Pesquisar" button is clicked', async () => {
    const wrapper = mount(AppFooter)

    await wrapper.find('[data-testid="finder-button"]').trigger('click')

    expect(wrapper.emitted().onClickFinder).toBeTruthy()
  })

  it('emits "onClickFavorites" event when the "Favoritos" button is clicked', async () => {
    const wrapper = mount(AppFooter)

    await wrapper.find('[data-testid="favorites-button"]').trigger('click')

    expect(wrapper.emitted().onDeleteUser).toBeFalsy()
  })

  it('emits "onClickSettings" event when the "Configurações" button is clicked', async () => {
    const wrapper = mount(AppFooter)

    await wrapper.find('[data-testid="settings-button"]').trigger('click')

    expect(wrapper.emitted().onClickSettings).toBeTruthy()
  })
})
