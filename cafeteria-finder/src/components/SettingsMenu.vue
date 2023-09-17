<script setup lang="ts">
const emits = defineEmits(['onDeleteUser', 'onLogout'])

const handleOnDeleteUser = () => {
  emits('onDeleteUser')
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
            <div><span class="text-h5" style="color: #f08080">Configurações</span></div>
            <v-divider style="margin-top: 12px; margin-bottom: 12px" />
          </v-col>
          <v-col cols="12" style="padding-top: 0">
            <v-list density="compact">
              <v-list-item link @click="handleOnDeleteUser">
                <v-list-item-title class="text-body-1">Excluir Conta</v-list-item-title>
                <template v-slot:append>
                  <v-avatar color="#FFDAB9">
                    <v-icon color="white">mdi-delete</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-divider />
              <v-list-item link @click="handleOnLogout">
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
  </v-container>
</template>
