<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "filled" },
  size: { type: String, default: "md" },
  disabled: { type: Boolean, default: false },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="props.disabled"
    :class="`
      px-4 py-3 rounded w-full font-medium transition duration-200
      ${
        props.variant === 'filled'
          ? 'bg-green-primary text-white'
          : 'bg-white text-gray-700'
      }
      ${
        props.size === 'sm'
          ? 'text-sm'
          : props.size === 'lg'
          ? 'text-lg'
          : 'text-base'
      }
      ${
        props.disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:brightness-110'
      }
    `"
  >
    <slot />
  </button>
</template>
