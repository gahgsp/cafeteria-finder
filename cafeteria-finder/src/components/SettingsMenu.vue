<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['onDeleteUser', 'onLogout'])

const isShowingConfirmationModal = ref(false)

const handleOnDeleteUser = () => {
  isShowingConfirmationModal.value = true
}

const handleOnConfirmDeleteUser = () => {
  emits('onDeleteUser')
}

const handleOnCancelDeleteUser = () => {
  isShowingConfirmationModal.value = !isShowingConfirmationModal.value
}

const handleOnLogout = () => {
  emits('onLogout')
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-col cols="12" style="padding-bottom: 0">
            <div><span class="text-h5 primary">Configurações</span></div>
            <v-divider class="divider" />
          </v-col>
          <v-col cols="12" style="padding-top: 0">
            <v-list density="compact">
              <v-list-item
                link
                @click="handleOnDeleteUser"
                aria-label="Excluir Conta"
                data-testid="delete-user-item"
              >
                <v-list-item-title class="text-body-1">Excluir Conta</v-list-item-title>
                <template v-slot:append>
                  <v-avatar color="#FFDAB9">
                    <v-icon color="white">mdi-delete</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-divider />
              <v-list-item
                link
                @click="handleOnLogout"
                aria-label="Encerrar Sessão"
                data-testid="logout-item"
              >
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >Encerrar Sessão</v-list-item-title
                >
                <template v-slot:append>
                  <v-avatar color="#F08080">
                    <v-icon color="white">mdi-logout</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="isShowingConfirmationModal">
      <v-card>
        <v-card-title class="text-h5 primary">Confirmação</v-card-title>
        <v-card-text> Você realmente deseja excluir a sua conta? </v-card-text>
        <v-card-actions>
          <v-btn
            color="#f4978e"
            variant="tonal"
            @click="handleOnConfirmDeleteUser"
            data-testid="confirm-delete-user-button"
            >Sim</v-btn
          >
          <v-btn
            color="#f8ad9d"
            variant="tonal"
            @click="handleOnCancelDeleteUser"
            data-testid="cancel-delete-user-button"
            >Não</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.primary {
  color: #f08080;
}

.divider {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
