import { describe, it, expect } from 'vitest';

function add(a: number, b: number): number {
  return a + b;
}

describe('add function', () => {
  it('should return the sum of two numbers', () => {
    // Arrange
    const a = 1;
    const b = 2;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(3);
  });
});