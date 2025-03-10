import { expect, test, describe } from 'vitest'
import { timeFormat } from '@/helpers/timeFormat'

describe.concurrent('time format', () => {
  test('check example sunrise time', () => {
    expect(timeFormat(1741582425)).toBe('05:53')
  });

  test('check example sunset time', () => {
    expect(timeFormat(1741623689)).toBe('17:21')
  })
})
