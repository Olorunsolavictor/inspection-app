import { mount } from "@vue/test-utils";
import Button from "~/components/util/Button.vue";
import { describe, it, expect } from "vitest";

describe("Button", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click Me",
      },
    });
    expect(wrapper.text()).toBe("Click Me");
  });

  it("applies 'filled' variant styles by default", () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain("bg-green-primary");
    expect(wrapper.classes()).toContain("text-white");
  });

  it("applies 'outline' variant styles", () => {
    const wrapper = mount(Button, {
      props: {
        variant: "outline",
      },
    });
    expect(wrapper.classes()).toContain("bg-white");
    expect(wrapper.classes()).toContain("text-gray-700");
  });

  it("respects disabled prop", () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.attributes("disabled")).toBe("");
    expect(wrapper.classes()).toContain("cursor-not-allowed");
  });

  it("applies size class for 'lg'", () => {
    const wrapper = mount(Button, {
      props: {
        size: "lg",
      },
    });
    expect(wrapper.classes()).toContain("text-lg");
  });

  it("applies fullWidth class", () => {
    const wrapper = mount(Button, {
      props: {
        fullWidth: true,
      },
    });
    expect(wrapper.classes()).toContain("w-full");
  });

  it("forwards extra attrs (e.g. type='submit')", () => {
    const wrapper = mount(Button, {
      attrs: {
        type: "submit",
      },
    });
    expect(wrapper.attributes("type")).toBe("submit");
  });
});
