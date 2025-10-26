<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useCustomizerStore } from '@/stores/customizer';

const customizer = useCustomizerStore();
function toTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth',
  })
}

</script>

<template>
    <v-locale-provider >
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
<!--             
            <Header01></Header01> -->

            <v-main  class="">
                <RouterView /> 

                <VLayoutItem model-value position="bottom" class="text-end" size="88">
                    <div class="ma-4">
                        <VBtn @click="toTop" icon="mdi-chevron-up" size="small" color="primary" elevation="8" />
                    </div>
                </VLayoutItem>

                
                <v-footer class="bg-grey-lighten-1 mt-3">
                    <v-row justify="center" no-gutters>
                        <v-col class="text-center mt-4" cols="12">
                            <NuxtLink to="/term" class="text-decoration-none">
                                <v-btn variant="text" color="#546E7A">利用規約</v-btn>
                            </NuxtLink>
                            <NuxtLink to="/privacy" class="text-decoration-none">
                                <v-btn variant="text" color="#546E7A">プライバシーポリシー </v-btn>
                            </NuxtLink>
                            <NuxtLink to="https://twitter.com/messages/compose?recipient_id=1653601808131166209" class="text-decoration-none">
                                <v-btn variant="text" color="#546E7A">お問合せ(DM)</v-btn>
                            </NuxtLink>
                        </v-col>

                        <v-col class="text-center mt-4" cols="12">
                            <strong>AdMarker</strong>
                        </v-col>
                    </v-row>

                </v-footer>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<style>
.v-main{
    margin: 0px;
}
</style>

