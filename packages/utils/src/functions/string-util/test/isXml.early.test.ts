import { describe, expect, it } from '@jest/globals';
import { isXml } from '..';

describe('isXml() isXml method', () => {
  describe('Happy paths', () => {
    it('should return true for a valid XML string', () => {
      const validXml =
        "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
      expect(isXml(validXml)).toBe(true);
    });

    it('should return true for a valid XML string with namespaces', () => {
      const validXmlWithNamespace =
        '<note xmlns:h="http://www.w3.org/TR/html4/"><h:to>Tove</h:to><h:from>Jani</h:from></note>';
      expect(isXml(validXmlWithNamespace)).toBe(true);
    });

    it('should return true for a valid XML string with self-closing tags', () => {
      const validXmlWithSelfClosingTags =
        '<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body/><footer/></note>';
      expect(isXml(validXmlWithSelfClosingTags)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should return false for an empty string', () => {
      expect(isXml('')).toBe(false);
    });

    it('should return false for a string with only whitespace', () => {
      expect(isXml('   ')).toBe(false);
    });

    it('should return false for a string that is not XML', () => {
      const notXml = 'This is not an XML string';
      expect(isXml(notXml)).toBe(false);
    });

    it('should return false for a malformed XML string', () => {
      const malformedXml =
        "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body>";
      expect(isXml(malformedXml)).toBe(false);
    });

    it('should return false for a JSON string', () => {
      const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
      expect(isXml(jsonString)).toBe(false);
    });

    it('should return false for a string with XML-like structure but invalid syntax', () => {
      const invalidXmlSyntax =
        "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body><note>";
      expect(isXml(invalidXmlSyntax)).toBe(false);
    });

    it('should return false for a string with special characters', () => {
      const specialChars =
        "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!@#$%^&*()</body></note>";
      expect(isXml(specialChars)).toBe(true);
    });
  });
});
