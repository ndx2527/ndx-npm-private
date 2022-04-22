// 深度克隆
function deepClone(source) {
  // 如果类型不是对象
  if (typeof source != "object") {
    return source;
  }
  // 如果为null
  if (source == null) {
    return source;
  }
  var newObj = (source.constructor === Array) ? [] : {}; //开辟一块新的内存空间
  for (var i in source) {
    newObj[i] = deepClone(source[i]);
  }
  return newObj;
}

// 数组排序,true为降序,不传为升序
function fastSort(array, bool) {
  let nums = array;
  if (!bool) {
    function sortNumber(a, b) {
      return a - b;
    }
  } else {
    function sortNumber(a, b) {
      return b - a;
    }
  }
  nums = nums.sort(sortNumber);
  return nums;
}

// 数组对象排序 [{},{},{}]
function sortObj(object, option) {
  function compare(option) {
    return function (obj1, obj2) {
      var val1 = obj1[option];
      var val2 = obj2[option];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return object.sort(compare(option));
}

// 时差计算
var timediffer = function (last, now) {
  const options = {
    year: '年前',
    month: '个月前',
    day: '天前',
    hour: '小时前',
    minute: '分钟前',
    second: '秒前',
    just: '刚刚',
  }
  if (!now) {
    var now = new Date();
  }
  const timer = (now - last) / 1000; // 获取秒数
  let tip = '';
  if (timer <= 0 || Math.floor(timer / 60) <= 0) { // 小于60s,刚刚
    tip = options.just;
  } else if (timer < 60 * 60) {
    tip = Math.floor(timer / 60) + `${options.minute}`;
  } else if (timer < 60 * 60 * 24) {
    tip = Math.floor(timer / 3600) + `${options.hour}`;
  } else if (timer < 60 * 60 * 24 * 30) {
    tip = Math.ceil(timer / 86400) + `${options.day}`;
  } else {
    tip = Math.floor(timer / (86400 * 24)) + `${options.month}`;
  }
  return tip;
}

// 正则验证
const judge = {
  isMobile(parameter) {
    let patt = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    return patt.test(parameter);
  },
  isUrl(parameter) {
    let patt = /((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)/
    return patt.test(parameter);
  },
  isEmail(parameter) {
    let patt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return patt.test(parameter);
  }
}

// 乱序方法
function arrDisorder(arr) {
  var newArr = deepClone(arr)
  for (let i = 0; i < newArr.length; i++) {
    var index = Math.floor(Math.random() * newArr.length);
    var swap = newArr[i];
    newArr[i] = newArr[index];
    newArr[index] = swap;
  }
  return newArr;
}

function getRandom(num) {
  const currentNumber = Math.random().toString().slice(2, num + 2)
  return currentNumber;
}

// 数组去重
let unique = function (arr) {
  let hashTable = {};
  let data = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!hashTable[arr[i]]) {
      hashTable[arr[i]] = true;
      data.push(arr[i]);
    }
  }
  return data
}

/**
 * @description: 时间戳转日期对象 默认当前日期
 * @param {number} date 时间戳
 * @param {string} pattern 时间格式
 * @return {*}
 */
// formatDate(baseData.updateTime , 'yyyy-MM-dd hh:mm:ss')
const formatDate = function (date = new Date(), pattern) {
  if (typeof date == "string") date = Number(date)
  if (typeof date == "string" || typeof date == "number") {
    date = new Date((date + "").length == 10 ? date * 1000 : date)
  }
  pattern = pattern || DEFAULT_PATTERN
  return pattern.replace(SIGN_REGEXP, function ($0) {
    switch ($0.charAt(0)) {
      case "y":
        return padding(date.getFullYear(), $0.length)
      case "M":
        return padding(date.getMonth() + 1, $0.length)
      case "d":
        return padding(date.getDate(), $0.length)
      case "w":
        return date.getDay() + 1
      case "h":
        return padding(date.getHours(), $0.length)
      case "m":
        return padding(date.getMinutes(), $0.length)
      case "s":
        return padding(date.getSeconds(), $0.length)
    }
  })
}

/**
 * @description: 获取设备类型
 * @return { boolean }  facility:true移动端；反之PC端
 * @return {*}
 */
const getDeviceType = function () {
  const userAgent = navigator.userAgent
  const Agents = [
    "Android",
    "iPhone",
    "NokiaN9",
    "SymbianOS",
    "Windows Phone",
    "iPad",
  ]
  const facility = Agents.some((i) => {
    return userAgent.includes(i)
  })
  return facility
}


// 导出模块
module.exports = {
  deepClone,
  fastSort,
  sortObj,
  timediffer,
  judge,
  arrDisorder,
  getRandom,
  unique,
  formatDate,
  getDeviceType,
}