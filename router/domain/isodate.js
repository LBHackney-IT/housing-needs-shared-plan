module.exports = class IsoDate {
  static today() {
    return IsoDate.parse(Date.now());
  }

  static parse(date) {
    if (!date) {
      return date;
    }

    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }

    return IsoDate.parse(new Date(date));
  }
};
