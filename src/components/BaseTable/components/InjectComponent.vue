<template>
  <component :is="name" v-bind="config">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'InjectComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
