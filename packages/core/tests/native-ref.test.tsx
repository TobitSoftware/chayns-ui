import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { composeNativeRefs } from '../src/utils/native-ref.js';

describe('native ref composition', () => {
  it('detaches React 18 callbacks and executes React 19 cleanup exactly once', () => {
    const objectRef = createRef<HTMLButtonElement>();
    const legacyRef = vi.fn();
    const cleanup = vi.fn();
    const modernRef = vi.fn(() => cleanup);
    const composed = composeNativeRefs(objectRef, legacyRef, modernRef);
    const button = document.createElement('button');
    composed(button);
    expect(objectRef.current).toBe(button);
    composed(null);
    expect(objectRef.current).toBeNull();
    expect(legacyRef).toHaveBeenLastCalledWith(null);
    expect(modernRef).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
