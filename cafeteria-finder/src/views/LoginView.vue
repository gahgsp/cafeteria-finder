<script setup lang="ts"></script>

<template>
    <v-form>
        <v-container>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field :counter="10" label="First name" required hide-details></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field :counter="10" label="Last name" hide-details required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field label="E-mail" hide-details required></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-container>
    </v-form>
</template>