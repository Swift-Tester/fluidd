
<template>
  <div>
    <v-subheader id="theme">{{ $t('app.setting.title.theme') }}</v-subheader>
    <v-card
      :elevation="5"
      dense
      class="mb-4">

      <app-setting :title="$t('app.setting.label.primary_color')">
        <theme-picker
          v-if="theme"
          v-model="themeColor">
        </theme-picker>
      </app-setting>

      <v-divider></v-divider>

      <app-setting :title="$t('app.setting.label.dark_mode')">
        <v-switch
          @click.native.stop
          v-model="isDark"
          hide-details
          class="mb-5"
        ></v-switch>
      </app-setting>

      <v-divider></v-divider>

      <app-setting :title="$t('app.setting.label.reset')">
        <app-btn
          outlined
          small
          color="primary"
          @click="handleReset"
        >
          {{ $t('app.setting.btn.reset') }}
        </app-btn>
      </app-setting>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import StateMixin from '@/mixins/state'
import { ThemeConfig } from '@/store/config/types'
import ThemePicker from './ThemePicker.vue'

@Component({
  components: {
    ThemePicker
  }
})
export default class ThemeSettings extends Mixins(StateMixin) {
  get theme () {
    return this.$store.getters['config/getTheme']
  }

  get themeColor () {
    return this.theme.currentTheme.primary
  }

  set themeColor (value: string) {
    this.setTheme(value, this.isDark)
    this.$store.dispatch('config/saveByPath', {
      path: 'uiSettings.theme.currentTheme.primary',
      value,
      server: true
    })
  }

  get isDark () {
    return this.theme.isDark
  }

  set isDark (value: boolean) {
    this.setTheme(this.themeColor, value)
    this.$store.dispatch('config/saveByPath', {
      path: 'uiSettings.theme.isDark',
      value,
      server: true
    })
  }

  setTheme (primary: string, isDark: boolean) {
    this.$vuetify.theme.dark = isDark
    this.$vuetify.theme.currentTheme.primary = primary
  }

  handleReset () {
    const value: ThemeConfig = {
      isDark: true,
      currentTheme: {
        primary: '#2196F3'
      }
    }
    this.setTheme('#2196F3', true)
    this.$store.dispatch('config/saveByPath', {
      path: 'uiSettings.theme',
      value,
      server: true
    })
  }
}
</script>
