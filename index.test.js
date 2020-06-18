const CD = require('./index');
const moment = require('moment');
require('twix');

describe('getDate method', () => {
  test('should return the given date', () => {
    const date = '2020-10-20';
    expect(CD.getDate(date)).toEqual(moment(date));
  });

  test('should return the current date given no arguments', () => {
    const currentDate = moment().startOf('day');
    expect(CD.getDate()).toEqual(currentDate);
  });
});

describe('addDays method', () => {
  test('should return the given date plus "n" number of days', () => {
    const date = moment('2020-10-20');
    expect(CD.addDays(date, 5).isSame(moment('2020-10-25'))).toBe(true);
  });

  test('should return the same date given 0 as days to add', () => {
    const date = moment('2020-10-20');
    expect(CD.addDays(date, 0).isSame(date)).toBe(true);
  });
});

describe('compare method', () => {
  test('should return true given two identical dates', () => {
    const a = moment('2020-10-20');
    const b = moment('2020-10-20');
    expect(CD.compare(a, b)).toBe(true);
  });

  test('should return false given different dates', () => {
    const a = moment('2020-10-20');
    const b = moment('2020-10-22');
    expect(CD.compare(a, b)).toBe(false);
  });

  test('should return true given a date and a prior date plus day difference', () => {
    const date = moment('2020-10-25');
    const priorPlusDays = CD.addDays(moment('2020-10-20'), 5);
    expect(CD.compare(date, priorPlusDays)).toBe(true);
  });
});

describe('range method', () => {
  test('should return a range between two dates', () => {
    const A = moment('2020-10-01');
    const B = moment('2020-10-05');
    const range = CD.range(A, B);
    expect(range.start().isSame(A)).toBe(true);
    expect(range.end().isSame(B)).toBe(true);
  });
});

describe('splitRange method', () => {
  describe('given a range and 1 as a count', () => {
    test('should return an array containing the same range', () => {
      const A = moment('2020-10-01');
      const B = moment('2020-10-06');
      const range = CD.range(A, B, 2);
      const splited = CD.splitRange(range, 1);
      expect(splited.length).toEqual(1);
      expect(splited[0].isSame());
    });
  });
  describe('given a range and n as a count', () => {
    test('should return an array containing n ranges', () => {
      const A = moment('2020-10-01');
      const B = moment('2020-10-31');
      const range = CD.range(A, B);
      const splitted = CD.splitRange(range, 2);
      expect(splitted.length).toEqual(2);
      expect(splitted[0].start().isSame(A)).toBe(true);
      expect(splitted[1].end().isSame(B)).toBe(true);
    });
  });
});

describe('isInRange metdhod', () => {
  test('should return true if date is in range', () => {
    const A = moment('2020-10-01');
    const B = moment('2020-10-31');
    const range = CD.range(A, B);
    const tmp = moment('2020-10-15');
    expect(CD.isInRange(range, tmp)).toBe(true);
  });
  test('should return false if date is not in range', () => {
    const A = moment('2020-10-01');
    const B = moment('2020-10-31');
    const range = CD.range(A, B);
    const tmp = moment('2020-11-15');
    expect(CD.isInRange(range, tmp)).toBe(false);
  });
});
