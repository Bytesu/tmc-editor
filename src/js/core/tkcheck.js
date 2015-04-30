define('summernote/core/tkcheck', function () {
  var tkcheck = (function () {
    /**
     * 存储到ls
     * @param data
     */
    function setKVs(data) {
      if (data.value.tokenString !== undefined) {
        data.value = this.toCurrentDate(data.value);
      }
      var tmp = JSON.parse(data.value);
      window.localStorage.setItem(data.key, tmp);
    }

    /**
     * get key
     * @param key
     * @returns {{}}
     */
    var getByKey = function (key) {
      var tmp = window.localStorage.getItem(key);
      if (tmp !== null) {
        tmp = JSON.parse(tmp);
        return tmp;
      } else {
        return {};
      }
    };

    /**
     * remove by key
     * @param key
     */
    function rmByKey(key) {
      window.localStorage.removeItem(key);
    }

    /**
     * rtk is valid ?
     * @returns {{flag: string, rtk: *}}
     */
    function rtkIsValid() {
      var rtk = getByKey('_rtk');
      var _flag = '';
      if (rtk.createTime === undefined) {
        _flag = false;
      } else {
        _flag = compareDate(rtk.expireTime);
      }
      return {flag: _flag, rtk: _flag ? rtk.tokenString : ''};
    }

    /***
     * 验证_tk有效性,有效时连同tk值一块传回
     * @returns {flag:true,tk:''}
     */
    function tkIsValid() {
      var tk = this.getByKey('_tk');
      var _flag = '';
      if (tk.createTime === undefined) {
        _flag = false;
      } else {
        _flag = compareDate(tk.expireTime);
      }
      return {flag: _flag, tk: _flag ? tk.tokenString : ''};

    }

    /***
     * 日期tmp是否大于客户端本地时间
     * @param tmp
     * @returns {boolean}
     */
    function compareDate(tmp) {
      if ((new Date(tmp) - new Date()) >= 0) {
        return true;
      } else {
        return false;
      }
    }

    /***
     * 转化日期为客户端日期
     * @param data
     * @returns {*}
     */
    function toCurrentDate(data) {
      var current = new window.Date(),
        preDate = new window.Date(data.createTime).getTime(),
        postDate = new window.Date(data.expireTime).getTime();
      var tmp = postDate - (preDate - current.getTime());
      tmp = new window.Date(tmp);
      data.expireTime = formatDate(tmp);
      data.createTime = formatDate(current);
      return data;
    }

    /***
     * 格式化日期 ：yyyy-MM-dd HH:mm:ss
     * @param tmp
     * @returns {string}
     */
    function formatDate(tmp) {
      return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) +
        '-' + tmp.getDate() + ' ' + tmp.getHours() +
        ':' + tmp.getMinutes() + ':' + tmp.getSeconds();
    }

    return {
      setKVs: setKVs,
      getByKey: getByKey,
      rmByKey: rmByKey,
      rtkIsValid: rtkIsValid,
      tkIsValid: tkIsValid,
      toCurrentDate: toCurrentDate
    };
  })();
  return tkcheck;
});
