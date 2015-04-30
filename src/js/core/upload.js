define('summernote/core/upload', function () {
  var upload = (function () {
    function upload(file, onStart, onProgress, onFinish, onError) {
      var url = 'http://dev.j.admin.shiyuehehu.com/media/upload?type=DEAL';
      var fileId = file;
      var fd = new FormData();
      fd.append('media', fileId);
      //p判断_tk是否过期
      /*var _tk = tkcheck.tkIsValid();
       var _rtk = tkcheck.rtkIsValid();*/


      //fd.append('_tk', tkcheck.getByKey('_tk').tokenString);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          onFinish(xhr.responseText);
        }
        if (xhr.readyState === 4 && xhr.status === 500) {
          onError(xhr);
        }
      };
      xhr.onerror = function () {
        onError(xhr);
      };
      xhr.upload.onprogress = function (e) {
        var loaded = e.loaded;
        var total = e.total;
        var percent = Math.floor(100 * loaded / total);
        onProgress(percent);
      };
      xhr.open('post', url);
      xhr.send(fd);
      onStart();
    }

    return {
      upload: upload
    };
  })();

  return upload;
});
