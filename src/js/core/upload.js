define(['jquery', 'summernote/core/tkcheck'], function ($, tkcheck) {
  var upload = (function () {

    function upload(deferred, file) {
      var url = $.summernote.options.tmcApi.upload;
      var fileId = file;
      var fd = new FormData();
      fd.append('media', fileId);
      fd.append('_tk', tkcheck.getByKey('_tk').tokenString);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          deferred.resolve($.summernote.options.tmcApi.img +
            JSON.parse(xhr.responseText).data.path);

        }
        if (xhr.readyState === 4 && xhr.status === 500) {
          deferred.reject(this);
        }
      };
      xhr.onerror = function () {
        deferred.reject(this);
      };
      xhr.open('post', url);
      xhr.send(fd);
    }

    return {
      upload: upload
    };
  })();

  return upload;
});
