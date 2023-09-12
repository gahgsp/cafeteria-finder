<script setup lang="ts"></script>

<template>
    <main style="width: 100vw; height: 100vh;">
        <v-form>
            <v-container style="display: flex; justify-content: center; align-items: center;">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" md="12">
                            <span class="text-h2">Create Account</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Username" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="E-Mail" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Confirm E-Mail" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Password" type="password" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Confirm Password" type="password" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="display: flex; justify-content: space-around; align-items: center;">
                            <v-btn variant="outlined">
                                Register
                            </v-btn>
                            <v-btn variant="outlined">
                                Cancel
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-container>
        </v-form>
    </main>
</template>