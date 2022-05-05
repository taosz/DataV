/**
 * 基础组件列表
 *
 * 未实例化
 */

import { defineStore } from 'pinia';

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
];

export const useBasicComponent = defineStore('basicComponents', {
  state: () => ({
    list: message.map((name, index) => {
      return { name, i: index + 1 };
    }),
  }),

  getters: {
    count: (state) => state.list.length,
  },
});
