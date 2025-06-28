import { ref } from "vue";

export const focusPoint = ref<{ x: number; y: number } | null>(null);
const focusTimer = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

function stopFocusTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  focusTimer.value = 0;
  focusPoint.value = null;
}

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
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    focusPoint.value = { x, y };
    focusTimer.value = 5;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      if (focusTimer.value > 0) {
        focusTimer.value--;
      } else {
        stopFocusTimer();
      }
    }, 1000);
  }

  return {
    focusPoint,
    focusTimer,
    handleFocusTap,
    stopFocusTimer,
  };
}
