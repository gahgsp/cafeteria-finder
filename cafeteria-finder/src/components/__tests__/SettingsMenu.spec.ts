import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SettingsMenu from '@/components/SettingsMenu.vue'

describe('SettingsMenu', () => {
  it('renders correctly', () => {
    const wrapper = mount(SettingsMenu)

    expect(wrapper.html()).toBeTruthy()
  })

  it('emits "onDeleteUser" event when the "Excluir Conta" item is clicked and is confirmed', async () => {
    const wrapper = mount(SettingsMenu)

    await wrapper.find('[data-testid="delete-user-item"]').trigger('click')

    await wrapper.vm.$nextTick()

    await wrapper.find('[data-testid="confirm-delete-user-button"]').trigger('click')

    expect(wrapper.emitted().onDeleteUser).toBeTruthy()
  })

  it('does not emit "onDeleteUser" event when the "Excluir Conta" item is clicked and is canceled', async () => {
    const wrapper = mount(SettingsMenu)

    await wrapper.find('[data-testid="delete-user-item"]').trigger('click')

    await wrapper.vm.$nextTick()

    await wrapper.find('[data-testid="cancel-delete-user-button"]').trigger('click')

    expect(wrapper.emitted().onDeleteUser).toBeFalsy()
  })

  it('emits "onLogout" event when the "Encerrar Sessão" item is clicked', async () => {
    const wrapper = mount(SettingsMenu)

    await wrapper.find('[data-testid="logout-item"]').trigger('click')

    expect(wrapper.emitted().onLogout).toBeTruthy()
  })
})
