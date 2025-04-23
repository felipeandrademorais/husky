import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { mockStats, mockChartData, mockTableData } from "./mocks/api";

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock fetch API with our mock data
global.fetch = vi.fn().mockImplementation((url) => {
    if (url === "/api/dashboard/stats") {
        return Promise.resolve({
            json: () => Promise.resolve(mockStats),
        });
    }

    if (url === "/api/dashboard/chart-data") {
        return Promise.resolve({
            json: () => Promise.resolve(mockChartData),
        });
    }

    if (url === "/api/dashboard/table-data") {
        return Promise.resolve({
            json: () => Promise.resolve(mockTableData),
        });
    }

    return Promise.reject(new Error(`Unhandled request: ${url}`));
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Mock canvas for Recharts
const mockCanvasContext = {
    measureText: () => ({ width: 0 }),
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: new Array(4) }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    transform: () => {},
    rect: () => {},
    clip: () => {},
};

// Mock canvas
HTMLCanvasElement.prototype.getContext = () => mockCanvasContext as any;
HTMLCanvasElement.prototype.getBoundingClientRect = () => ({
    width: 120,
    height: 120,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
});

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});
