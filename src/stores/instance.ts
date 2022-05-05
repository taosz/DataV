/**
 * 添加到舞台上的实例组件
 */

import { defineStore } from 'pinia';

type Hash = number

interface IInstance {
  hash: Hash;
  name?: string;
  dragData?: {};
  formData: {
    emitFormInput: string
    receiveFormInput: string
  };
  inject: {
    target: Hash[]
  };
}

export const useInstance = defineStore('instance', {
  state: () => ({
    list: <IInstance[]>[],
    activeInstance: <IInstance | null>null,
  }),

  getters: {
    count: (state) => state.list.length,
  },

  actions: {
    /**
     * 将交互数据传递到目标组件
     * @param payload
     * @param instance
     */
    publish(payload: string, instance: IInstance) {        debugger
      instance.inject.target.forEach(hash => {
        const target = this.list.find(instance => instance.hash === hash);
        target && (target.formData.receiveFormInput = payload);
      });
    },

    /**
     * 设置焦点组件
     * @param instance
     */
    setActiveInstance(instance: IInstance) {
      this.activeInstance = instance;
    },

    /**
     * 新增组件到画布
     * @param name
     * @param i
     */
    addInstance(name: string, i: number) {
      this.list.push({
        hash: Date.now(),
        name,
        inject: {
          target: [],
        },
        formData: {
          emitFormInput: '',
          receiveFormInput: '',
        },
      });
    },
  },
});
