testApp.directive('fileUpload', function(CONFIG) {
  function link(scope, el, attrs) {
    el.bind('change', function (event) {
        var files = event.target.files;
        for (var i = 0;i<files.length;i++) {
            scope.$emit("fileSelected", { file: files[i] });
        }                                       
    });    
  }
  return {
    scope: true,
    link: link
  };
});