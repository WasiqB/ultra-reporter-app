import { describe, expect, it } from '@jest/globals';
import { isJson } from '..';

describe('isJson() isJson method', () => {
  describe('Happy Paths', () => {
    it('should return true for a valid JSON object', () => {
      const jsonString = '{"name": "John", "age": 30}';
      expect(isJson(jsonString)).toBe(true);
    });

    it('should return true for a valid JSON array', () => {
      const jsonArray = '[1, 2, 3, 4]';
      expect(isJson(jsonArray)).toBe(true);
    });

    it('should return true for a valid JSON string', () => {
      const jsonString = '"Hello, World!"';
      expect(isJson(jsonString)).toBe(true);
    });

    it('should return true for a valid JSON number', () => {
      const jsonNumber = '12345';
      expect(isJson(jsonNumber)).toBe(true);
    });

    it('should return true for a valid JSON boolean', () => {
      const jsonBoolean = 'true';
      expect(isJson(jsonBoolean)).toBe(true);
    });

    it('should return true for a valid JSON null', () => {
      const jsonNull = 'null';
      expect(isJson(jsonNull)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should return false for an empty string', () => {
      const emptyString = '';
      expect(isJson(emptyString)).toBe(false);
    });

    it('should return false for a malformed JSON string', () => {
      const malformedJson = '{"name": "John", "age": 30';
      expect(isJson(malformedJson)).toBe(false);
    });

    it('should return false for a string that is not JSON', () => {
      const notJson = 'Hello, World!';
      expect(isJson(notJson)).toBe(false);
    });

    it('should return false for a string with only whitespace', () => {
      const whitespaceString = '   ';
      expect(isJson(whitespaceString)).toBe(false);
    });

    it('should return false for a number that is not a JSON string', () => {
      const numberString = '123abc';
      expect(isJson(numberString)).toBe(false);
    });

    it('should return false for a boolean that is not a JSON string', () => {
      const booleanString = 'True';
      expect(isJson(booleanString)).toBe(false);
    });

    it('should return false for a null that is not a JSON string', () => {
      const nullString = 'Null';
      expect(isJson(nullString)).toBe(false);
    });
  });
});
