import { ActionTree } from 'vuex'
import { DevicePowerState } from './types'
import { RootState } from '../types'
import { SocketActions } from '@/socketActions'

export const actions: ActionTree<DevicePowerState, RootState> = {
  /**
   * Reset our store
   */
  async reset ({ commit }) {
    commit('setReset')
  },

  /**
   * Make a socket request to init the power plugin.
   */
  async init () {
    SocketActions.machineDevicePowerDevices()
  },

  /**
   * Inits the list of available devices. Notified by init action.
   */
  async onInit ({ commit }, payload) {
    if (
      payload.devices &&
      payload.devices.length > 0
    ) {
      commit('setDevices', payload)
    }
  },

  /**
   * Fires when we receive a notification of power changing
   */
  async onStatus ({ commit }, payload) {
    commit('setStatus', payload)
  },

  /**
   * On toggling a power device.
   */
  async onToggle ({ commit }, payload) {
    commit('setStatus', payload)
  }

}
