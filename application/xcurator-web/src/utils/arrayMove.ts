export function arrayMove<T>(array: T[], fromIndex: number, toIndex: number) {
  if (toIndex > array.length - 1) toIndex = toIndex % array.length;
  if (toIndex < 0)
    toIndex = (array.length + (toIndex % array.length)) % array.length;
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  return array;
}
