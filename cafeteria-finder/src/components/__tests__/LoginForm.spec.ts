import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import type { VForm } from 'vuetify/components'

describe('LoginForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(LoginForm)

    expect(wrapper.html()).toBeTruthy()
  })

  it('emits "onLogin" event when the "Entrar" button is clicked', async () => {
    const wrapper = mount(LoginForm)
    const form = wrapper.vm.$refs.form as VForm
    form.validate = vi.fn().mockReturnValue(true)

    await wrapper.find('[data-testid="login-button"]').trigger('click')

    expect(wrapper.emitted().onLogin).toBeTruthy()
  })

  it('emits "onRegister" event when the "Registrar" button is clicked', async () => {
    const wrapper = mount(LoginForm)

    await wrapper.find('[data-testid="register-button"]').trigger('click')

    expect(wrapper.emitted().onRegister).toBeTruthy()
  })
})
