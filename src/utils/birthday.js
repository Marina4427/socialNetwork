export const days = new Array(31).fill(null, 0, 31).map((item, idx) => idx + 1);
export const months = [
  { ru: "Январь", en: "January" },
  { ru: "Февраль", en: "Febriary" },
  { ru: "Март", en: "March" },
  { ru: "Апрель", en: "April" },
  { ru: "Май", en: "May" },
  { ru: "Июнь", en: "June" },
  { ru: "Июль", en: "July" },
  { ru: "Август", en: "August" },
  { ru: "Сентябрь", en: "September" },
  { ru: "Октябрь", en: "October" },
  { ru: "Ноябрь", en: "November" },
  { ru: "Декабрь", en: "December" },
];
export const years = new Array(60).fill(null).map((_, idx) => 2015 - idx);

