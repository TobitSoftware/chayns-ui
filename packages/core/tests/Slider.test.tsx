import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Slider from '../src/components/slider/Slider.js';

const formatValue = (value: number) => `${value} Prozent`;

describe('Slider', () => {
  it('forwards native props and ref and shows a localized effective value', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Slider
        data-control="volume"
        defaultValue={25}
        formatValue={formatValue}
        label="Lautstärke"
        name="volume"
        ref={ref}
      />,
    );
    const slider = screen.getByRole('slider', { name: 'Lautstärke' });
    expect(slider).toBe(ref.current);
    expect(slider).toHaveAttribute('name', 'volume');
    expect(slider).toHaveAttribute('data-control', 'volume');
    expect(slider).toHaveAttribute('aria-valuetext', '25 Prozent');
    expect(screen.getByText('25 Prozent')).toBeInTheDocument();
  });
  it('updates uncontrolled output and forwards the native event', () => {
    const onChange = vi.fn();
    render(
      <Slider defaultValue={25} formatValue={formatValue} label="Lautstärke" onChange={onChange} />,
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '30' } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(screen.getByText('30 Prozent')).toBeInTheDocument();
  });
  it('keeps controlled output aligned with the external value', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Slider formatValue={formatValue} label="Lautstärke" onChange={onChange} value={25} />,
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '30' } });
    expect(screen.getByText('25 Prozent')).toBeInTheDocument();
    rerender(
      <Slider formatValue={formatValue} label="Lautstärke" onChange={onChange} value={30} />,
    );
    expect(screen.getByText('30 Prozent')).toBeInTheDocument();
  });
  it('uses the browser-normalized range value for the visible and spoken output', () => {
    render(
      <Slider defaultValue={150} formatValue={formatValue} label="Lautstärke" max={100} min={0} />,
    );
    expect(screen.getByText('100 Prozent')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '100 Prozent');
  });
});
