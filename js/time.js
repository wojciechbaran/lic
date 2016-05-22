testApp.directive('ngTime', function(CONFIG, CUDService) {
  function link(scope) {
    if(!scope.hours){
      scope.hours=12;
    }
    if(!scope.minutes){
      scope.minutes=0;
    }
    scope.init = function(){
      if(scope.minutes<0){
        scope.minutes=59;
        scope.hours--;
      }
      if(scope.minutes>59){
        scope.minutes=0;
        scope.hours++;
      }
      if(scope.hours<0){
        scope.hours=23;
      }
      if(scope.hours>23){
        scope.hours=0;
      }
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
      scope.time=(60*scope.hours)+scope.minutes;
    };
    scope.changeTime = function(d,t){
      if(d=='more'){
        scope[t]++;
      }else{
        scope[t]--;
      }
      scope.init();
    };
    scope.init();
    
  }
  return {
    restrict: 'A',
    scope: {
      time: '=',
    },
    templateUrl: CONFIG.route + '/views/time.html',
    link: link
  };
});