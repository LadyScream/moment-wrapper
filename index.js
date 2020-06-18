const moment = require('moment');
require('twix');

module.exports = {
  getDate: (date) => moment(date).startOf('day'),
  addDays: (date, days) => date.clone().add(days, 'days'),
  compare: (a, b) => a.isSame(b),
  range: (a, b) => a.twix(b.add(1, 'days')),
  splitRange: (range, c) => range.split(range.length('days') / c, 'days'),
  isInRange: (range, m) => range.contains(m),
  duration: (t, type = 'days') => m.duration(t, type),
  rangeFromString: (s) =>
    s.split(' - ').reduce((a, c) => (c ? moment(a).twix(moment(c)) : null)),
  join: (a, b) => a.union(b),
};
