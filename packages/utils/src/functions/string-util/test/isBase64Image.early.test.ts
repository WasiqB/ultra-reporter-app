import { describe, expect, it } from '@jest/globals';
import { isBase64Image } from '..';

describe('isBase64Image() isBase64Image method', () => {
  describe('Happy Paths', () => {
    it('should return true for a valid base64 encoded image string', () => {
      const validBase64Image =
        'iVBORw0KGgoAAAANSUhEUgAAAAUA' +
        'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
        '//8/w38GIAXDIBKE0DHxgljNBAAO' +
        '9TXL0Y4OHwAAAABJRU5ErkJggg==';
      expect(isBase64Image(validBase64Image)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should return false for an empty string', () => {
      expect(isBase64Image('')).toBe(false);
    });

    it('should return false for a string with invalid base64 characters', () => {
      const invalidBase64 = 'This is not a base64 string!';
      expect(isBase64Image(invalidBase64)).toBe(false);
    });

    it('should return false for a string that is not properly padded', () => {
      const improperlyPaddedBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUA';
      expect(isBase64Image(improperlyPaddedBase64)).toBe(false);
    });

    it('should return false for a string that decodes to non-image data', () => {
      const base64NonImage = btoa('Hello, World!');
      expect(isBase64Image(base64NonImage)).toBe(false);
    });

    it('should return false for a null input', () => {
      expect(isBase64Image(null as unknown as string)).toBe(false);
    });

    it('should return false for a string with whitespace', () => {
      const base64WithWhitespace =
        'iVBORw0KGgoAAAANSUhEUgAAAAUA AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
      expect(isBase64Image(base64WithWhitespace)).toBe(false);
    });
  });
});
