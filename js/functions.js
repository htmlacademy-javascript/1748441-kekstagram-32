// Функция для проверки длины строки
function checkLength(str, maxLength){
  if(str.length <= maxLength){
    return true;
  }
  return false;
}

// проверка на палиндром
function isPalindrome(str){
  const normalizeStr = str.replaceAll(' ', '').toLowerCase();
  let reserved = '';

  for (let i = normalizeStr.length - 1; i >= 0; i--) {
    reserved += normalizeStr[i];
  }

  if(normalizeStr === reserved){
    return true;
  }
  return false;
}

function getIntSlice(str){
  const pStr = str.toString();
  let result = '';

  for (let i = 0; i <= pStr.length; i++) {
    if(!Number.isNaN(parseInt(pStr[i], 10))){
      result += pStr[i];
    }
  }
  if(result === ''){
    return NaN;
  }
  return parseInt(result, 10);
}

checkLength('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
getIntSlice(-1);

// Делу — время
function inInterval(start, end, meeting, duration){

  const [startHour, startMinute] = start.split(':').map((part) => parseInt(part, 10));
  const startTime = startHour * 60 + startMinute;

  const [endHour, endMinute] = end.split(':').map((part) => parseInt(part, 10));
  const endTime = endHour * 60 + endMinute;

  const [meetingHour, meetingMinute] = meeting.split(':').map((part) => parseInt(part, 10));
  const meetingTime = meetingHour * 60 + meetingMinute;

  if ((meetingTime + duration <= endTime) && (startTime <= meetingTime)) {
    return true;
  }

  return false;
}

inInterval('08:00', '17:30', '14:00', 90); // true
inInterval('8:0', '10:0', '8:0', 120); // true
inInterval('08:00', '14:30', '14:00', 90); // false
inInterval('14:00', '17:30', '08:0', 90); // false
inInterval('8:00', '17:30', '08:00', 900); // false
