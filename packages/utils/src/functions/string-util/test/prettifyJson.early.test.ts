import { describe, expect, it } from '@jest/globals';
import { prettifyJson } from '../index';

describe('prettifyJson() prettifyJson method', () => {
  describe('Happy Paths', () => {
    it('should prettify a valid JSON string', () => {
      const input = '{"name":"John","age":30,"city":"New York"}';
      const expectedOutput = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
      expect(prettifyJson(input)).toBe(expectedOutput);
    });

    it('should handle an already prettified JSON string', () => {
      const input = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
      const expectedOutput = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
      expect(prettifyJson(input)).toBe(expectedOutput);
    });

    it('should handle a JSON string with arrays', () => {
      const input = '{"fruits":["apple","banana","cherry"]}';
      const expectedOutput = `{
  "fruits": [
    "apple",
    "banana",
    "cherry"
  ]
}`;
      expect(prettifyJson(input)).toBe(expectedOutput);
    });
  });

  describe('Edge Cases', () => {
    it('should return the original string if it is not valid JSON', () => {
      const input = 'Invalid JSON string';
      expect(prettifyJson(input)).toBe(input);
    });

    it('should handle an empty string', () => {
      const input = '';
      expect(prettifyJson(input)).toBe(input);
    });

    it('should handle a JSON string with special characters', () => {
      const input = '{"special":"!@#$%^&*()_+{}|:\"<>?"}';
      const expectedOutput = `{
  "special": "!@#$%^&*()_+{}|:\\\"<>?"
}`;
      expect(prettifyJson(input)).toBe(expectedOutput);
    });

    it('should handle a JSON string with numbers and booleans', () => {
      const input = '{"number":123,"boolean":true}';
      const expectedOutput = `{
  "number": 123,
  "boolean": true
}`;
      expect(prettifyJson(input)).toBe(expectedOutput);
    });

    it('should handle a JSON string with nested objects', () => {
      const input = '{"person":{"name":"John","age":30}}';
      const expectedOutput = `{
  "person": {
    "name": "John",
    "age": 30
  }
}`;
      expect(prettifyJson(input)).toBe(expectedOutput);
    });
  });
});
