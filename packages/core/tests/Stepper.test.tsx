import { createRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Stepper from '../src/components/stepper/Stepper.js';
import { stepperValues } from '../src/components/stepper/stepper-values.js';

const labels = {
  label: 'Quantity',
  decreaseLabel: 'Decrease',
  increaseLabel: 'Increase',
  formatValue: (value: number) => `${value} units`,
};

describe('Stepper', () => {
  it('uses native keyboard activation, exact decimals and boundary states', async () => {
    function Example() {
      const [value, setValue] = useState(0.2);
      return (
        <Stepper
          {...labels}
          value={value}
          min={0.1}
          max={0.3}
          step={0.1}
          precision={1}
          onValueChange={setValue}
        />
      );
    }
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByRole('group', { name: 'Quantity' })).toBeInTheDocument();
    const increase = screen.getByRole('button', { name: 'Increase' });
    increase.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('0.3 units')).toHaveAttribute('aria-live', 'polite');
    expect(increase).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(screen.getByText('0.2 units')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
  });

  it('keeps controlled values unchanged and forwards root props/ref with cancellation', () => {
    const onValueChange = vi.fn();
    const ref = createRef<HTMLDivElement>();
    const { rerender } = render(
      <Stepper
        {...labels}
        ref={ref}
        data-purpose="quantity"
        value={2}
        min={0}
        max={4}
        step={1}
        onValueChange={onValueChange}
      />,
    );
    expect(ref.current).toHaveAttribute('data-purpose', 'quantity');
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(3);
    expect(screen.getByText('2 units')).toBeInTheDocument();
    rerender(
      <Stepper
        {...labels}
        value={2}
        min={0}
        max={4}
        step={1}
        onValueChange={onValueChange}
        onClick={(event) => event.preventDefault()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it.each([
    [0.1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 2, 0, 1, 0],
    [3, 0, 2, 1, 0],
    [0, 0, 5, 2, 0],
    [1, 0, 4, 2, 0],
    [0, 0, 1, 0.1, 7],
    [Infinity, 0, 1, 1, 0],
    [0, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1, 0],
  ])(
    'rejects invalid numeric contracts (%s, %s, %s, %s, %s)',
    (value, min, max, step, precision) => {
      expect(() => stepperValues(value, min, max, step, precision)).toThrow(/Stepper/);
    },
  );
});
