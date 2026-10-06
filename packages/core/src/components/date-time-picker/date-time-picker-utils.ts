export function dateAtMidnight(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function clampDate(value: Date, minDate?: Date, maxDate?: Date) {
  const date = dateAtMidnight(value);
  if (minDate !== undefined && date < dateAtMidnight(minDate)) return new Date(minDate);
  if (maxDate !== undefined && date > dateAtMidnight(maxDate)) return new Date(maxDate);
  return value;
}

export function normalizeMinute(value: Date, minuteStep: number) {
  const normalized = new Date(value);
  normalized.setMinutes(Math.floor(normalized.getMinutes() / minuteStep) * minuteStep);
  return normalized;
}
