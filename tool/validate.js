class validate{
  check(type, realType) {
    return realType.find(real => real.type === type);
  }
  city(city, realCity) {
    return realCity.find(real => real.city === city);
  }
  sex(sex, realSex) {
    return realSex.find(real => real.sex === sex);
  }
}
module.exports = validate;