/** Validate exact decimal values before doing bounded integer arithmetic. */
export function stepperValues(
  value: number,
  min: number,
  max: number,
  step: number,
  precision: number,
) {
  if (!Number.isInteger(precision) || precision < 0 || precision > 6)
    throw new Error('Stepper precision must be an integer within 0..6.');
  const scale = 10 ** precision;
  const integers = [value, min, max, step].map((number) => {
    const integer = Math.round(number * scale);
    if (!Number.isSafeInteger(integer) || integer / scale !== number)
      throw new Error('Stepper values must be exact safe integers at the specified precision.');
    return integer;
  });
  const [current, lower, upper, increment] = integers as [number, number, number, number];
  const range = upper - lower;
  if (
    increment <= 0 ||
    range < 0 ||
    !Number.isSafeInteger(range) ||
    current < lower ||
    current > upper ||
    range % increment !== 0 ||
    (current - lower) % increment !== 0
  )
    throw new Error(
      'Stepper requires ordered bounds and value/max aligned to a positive min-based step.',
    );
  return {
    decrease: current === lower ? value : (current - increment) / scale,
    increase: current === upper ? value : (current + increment) / scale,
  };
}
