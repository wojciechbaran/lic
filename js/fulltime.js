testApp.directive('ngFulltime', function(CONFIG) {
  function link(scope) {

    scope.hours=Math.floor(scope.time/60);
    scope.minutes=scope.time-(scope.hours*60);
    if(scope.hours<10){
      scope.hoursShow='0'+scope.hours;
    }else{
      scope.hoursShow=scope.hours;
    }
    if(scope.minutes<10){
      scope.minutesShow='0'+scope.minutes;
    }else{
      scope.minutesShow=scope.minutes;
    }
  }
  return {
    restrict: 'A',
    scope: {
      time: '@',   
    },
    templateUrl: CONFIG.route + '/views/fulltime.html',
    link: link
  };
});