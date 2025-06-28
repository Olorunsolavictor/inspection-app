import { mount } from "@vue/test-utils";
import Gallery from "~/components/gallery/InspectionGallery.vue";
import { describe, it, beforeEach, expect, vi } from "vitest";

const mockInspectionData = {
  Front: "data:image/jpeg;base64,front",
  Back: "data:image/jpeg;base64,back",
  "Left Side": "data:image/jpeg;base64,left",
};

describe("Gallery.vue", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) =>
        key === "inspectionData" ? JSON.stringify(mockInspectionData) : null
      ),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it("loads and displays images from localStorage", async () => {
    const wrapper = mount(Gallery);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Step 1");
    expect(wrapper.text()).toContain("Step 2");
    expect(wrapper.text()).toContain("Step 3");

    const imgs = wrapper.findAll("img[alt='Inspection']");
    expect(imgs.length).toBe(3);
  });

  it("deletes a single image", async () => {
    const wrapper = mount(Gallery);
    await wrapper.vm.$nextTick();

    let deleteButtons = wrapper.findAll("button[title='Delete']");
    expect(deleteButtons.length).toBe(3);

    await deleteButtons[1].trigger("click");
    await wrapper.vm.$nextTick();

    const imgsAfter = wrapper.findAll("img[alt='Inspection']");
    expect(imgsAfter.length).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("clears the entire gallery", async () => {
    const wrapper = mount(Gallery);
    await wrapper.vm.$nextTick();

    const clearButton = wrapper.find("button:has-text('Clear')");
    expect(clearButton.exists()).toBe(true);

    await clearButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("No inspection photos found.");
    expect(localStorage.removeItem).toHaveBeenCalledWith("inspectionData");
  });

  it("shows preview modal when image is clicked", async () => {
    const wrapper = mount(Gallery);
    await wrapper.vm.$nextTick();

    const firstImage = wrapper.find("img[alt='Inspection']");
    await firstImage.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("img[alt='Full preview']").exists()).toBe(true);
  });

  it("closes preview modal on overlay click", async () => {
    const wrapper = mount(Gallery);
    await wrapper.vm.$nextTick();

    await wrapper.find("img[alt='Inspection']").trigger("click");
    await wrapper.vm.$nextTick();

    const overlay = wrapper.find(".fixed.inset-0");
    await overlay.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("img[alt='Full preview']").exists()).toBe(false);
  });
});
