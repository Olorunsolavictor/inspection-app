import { ref } from "vue";

export const focusPoint = ref<{ x: number; y: number } | null>(null);

export function useFocusHighlight() {
  function handleFocusTap(
    event: MouseEvent | TouchEvent,
    element: EventTarget | null
  ) {
    if (!(element instanceof HTMLElement)) return;

    const rect = element.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if (event instanceof TouchEvent) {
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    } else if (event instanceof MouseEvent) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    focusPoint.value = { x, y };

    setTimeout(() => {
      focusPoint.value = null;
    }, 3000);
  }

  return { focusPoint, handleFocusTap };
}
