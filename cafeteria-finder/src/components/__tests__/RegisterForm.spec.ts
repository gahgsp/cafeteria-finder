import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/RegisterForm.vue'
import type { VForm } from 'vuetify/components'

describe('RegisterForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(RegisterForm)

    expect(wrapper.html()).toBeTruthy()
  })

  it('emits "onSubmit" event when the "Registrar" when the form is submitted', async () => {
    const wrapper = mount(RegisterForm)
    const form = wrapper.vm.$refs.form as VForm
    form.validate = vi.fn().mockReturnValue({ valid: true })

    await wrapper.find('v-form').trigger('submit.prevent')

    expect(wrapper.emitted().onSubmit).toBeTruthy()
  })

  it('emits "onCancel" event when the "Cancelar" button is clicked', async () => {
    const wrapper = mount(RegisterForm)

    await wrapper.find('[data-testid="cancel-button"]').trigger('click')

    expect(wrapper.emitted().onCancel).toBeTruthy()
  })
})
