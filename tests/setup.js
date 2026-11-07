import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Mock IntersectionObserver for JSDOM
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    // Immediately trigger as visible in tests
    this.callback([{ isIntersecting: true, target }]);
  }
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver;
window.HTMLElement.prototype.scrollIntoView = vi.fn();

beforeEach(() => {
  localStorage.clear();
});
