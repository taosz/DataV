<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Draggable from 'vuedraggable';
import { useBasicComponent } from '@/stores/basicComponent';
import { useInstance } from '@/stores/instance';

const basicComponent = useBasicComponent();
const { list: basicComponents } = storeToRefs(basicComponent);

const Instance = useInstance();
const { list: instances, activeInstance, count: instanceCount } = storeToRefs(Instance);
const { addInstance, setActiveInstance, publish } = Instance;

const dragOptions = () => ({
  animation: 0,
  group: 'description',
  disabled: true,
  ghostClass: 'ghost',
});
</script>

<template>
  <div class="flex">
    <div class="w-35 border p-2 m-2">
      <div class="border p-2 m-2">
        <div class="font-bold" v-text="`basicComponents`" />

        <div
          class="border-dashed"
          v-for="basicComponent of basicComponents"
          :key="basicComponent.name"
          @click="addInstance(basicComponent.name, basicComponent.i)"
          v-text="basicComponent.name"
        />
      </div>

      <div class="border p-2 m-2">
        <div class="font-bold" v-text="`instances ${instanceCount}`" />

        <div
          v-for="instance of instances"
          :key="instance.name"
          v-text="instance.name"
        />
      </div>


    </div>

    <div class="flex-grow w-64 border p-2 m-2">
      <Draggable
        v-model="instances"
        v-bind="dragOptions"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
      >
        <template v-slot:item="{ element : instance }">
          <div
            class="list-group-item"
            @click="setActiveInstance(instance)"
            v-text="instance.name"
          />
        </template>
      </Draggable>

    </div>

    <div class="w-35 border p-2 m-2">
      <div class="font-bold" v-text="`组件表单`" />

      <template v-if="activeInstance">
        <div class="mt-5" v-text="`当前选中组件: ${activeInstance.name}`" />

        <div class="mt-5">
          选择交互对象组件:
          <template v-for="instance of instances">
            <label
              v-if="instance.hash !== activeInstance.hash"
              class="block flex items-center"
              :key="instances.hash"
            >
              <input
                type="checkbox"
                @click="e => e.target.checked && activeInstance.inject.target.push(instance.hash)"
              />
              <span class="ml-2" v-text="instance.name" />
            </label>
          </template>
        </div>

        <button
          class="border block mt-5 mb-5 pl-5 pr-5 rounded bg-black text-amber-300"
          @click="publish(activeInstance.formData.emitFormInput, activeInstance)"
          v-text="`Send`"
        />

        <input type="text" v-model="activeInstance.formData.emitFormInput" />

        <div class="mt-5">
          <span>receiverData:</span>
          <span class="border p-2" v-text="activeInstance.formData.receiveFormInput" />
        </div>
      </template>
    </div>
  </div>
</template>
