import IsoDate from './isodate';
import MockDate from 'mockdate';

describe('IsoDate', () => {
  beforeEach(() => {
    MockDate.set('2003-01-02');
  });

  describe('today', () => {
    it('prints todays date in ISO8601 format', () => {
      expect(IsoDate.today()).toBe('2003-01-02');
    });
  });

  describe('parse', () => {
    it('prints the parsed date in ISO8601 format', () => {
      // JavaScript Date months are indexed from 0...
      expect(IsoDate.parse(new Date(2020, 2, 14))).toBe('2020-03-14');
    });

    it('accepts dates in other parseable formats', () => {
      expect(IsoDate.parse('2020-03-14')).toBe('2020-03-14');
      expect(IsoDate.parse('2020-03-14T14:15:16Z')).toBe('2020-03-14');
      expect(IsoDate.parse(1584144000000)).toBe('2020-03-14');
    });
  });
});
