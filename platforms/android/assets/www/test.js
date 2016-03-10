var inDate  = new Date('2016','0','1');
console.log(inDate);
var tempDate= inDate;
console.log(tempDate);
tempDate.setHours(tempDate.getHours()-3);
console.log(tempDate.getDate());