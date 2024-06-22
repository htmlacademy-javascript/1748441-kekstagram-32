// Функция для проверки длины строки
function checkLength(str, max_length){
  if(str.length <= max_length){
    return true;
  }
  return false;
}

// проверка на палиндром
function isPalindrome(str){
  let normalizeStr = str.replaceAll(' ', '').toLowerCase();
  let reserved = '';
  for(let i = normalizeStr.length - 1; i >= 0; i--){
    reserved += normalizeStr[i];
  }
  if(normalizeStr === reserved){
    return true;
  }
  return false;
}

function getIntSlice(str){
  let p_str = str.toString();
  let result = '';
  for(let i = 0; i <= p_str.length; i++){
    if(!Number.isNaN(parseInt(p_str[i]))){
      result += p_str[i];
    }
  }
  if(result === ''){
    return NaN;
  }
  return result;
}

/*
// Тесты
console.log(checkLength('проверяемая строка', 20)); // true
console.log(checkLength('проверяемая строка', 18)); // true
console.log(checkLength('проверяемая строка', 10)); // false

console.log(isPalindrome('довОд'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));
console.log(isPalindrome('кекс'));


console.log(getIntSlice('2023 год'));            // 2023
console.log(getIntSlice('ECMAScript 2022'));     // 2022
console.log(getIntSlice('1 кефир, 0.5 батона')); // 105
console.log(getIntSlice('агент 007'));           // 7
console.log(getIntSlice('а я томат'));           // NaN

console.log(getIntSlice(2023)); // 2023
console.log(getIntSlice(-1));   // 1
console.log(getIntSlice(1.5));  // 15
*/
