testApp.directive('ngCalendar', function(CONFIG,$filter) {
  function link(scope) {
    console.log(scope.formcalendardate);
    if(scope.formcalendardate && scope.formcalendardate!=''){
      scope.val = new Date(scope.formcalendardate);
    }else{
      scope.val = new Date();
    }
    console.log(scope.formcalendardate);
    scope.calOn = false;
    scope.date = {};
    scope.dayOfWeek = [{
      day: 'Pon',
      t: ''
    }, {
      day: 'Wt',
      t: ''
    }, {
      day: 'Śr',
      t: ''
    }, {
      day: 'Czw',
      t: ''
    }, {
      day: 'Pt',
      t: ''
    }, {
      day: 'Sb',
      t: ''
    }, {
      day: 'Nd',
      t: 'holly'
    }];
    scope.months = {
      0: 'Styczeń',
      1: 'Luty',
      2: 'Marzec',
      3: 'Kwiecień',
      4: 'Maj',
      5: 'Czerwiec',
      6: 'Lipiec',
      7: 'Sierpień',
      8: 'Wrzesień',
      9: 'Październik',
      10: 'Listopad',
      11: 'Grudzień'
    };
    scope.showCal = function() {
      scope.calOn = true;
    };
    scope.hideCal = function() {
      scope.calOn = false;
    };
    scope.nextM = function() {
      var d = new Date();
      d.setFullYear(scope.date.year, scope.date.month, scope.date.day);
      scope.initDate(d);
    };
    scope.prevM = function() {
      var d = new Date();
      d.setFullYear(scope.date.year, scope.date.month - 2, scope.date.day);
      scope.initDate(d);
    };
    scope.setDate = function(val) {
      var d = new Date();
      d.setFullYear(scope.date.year, scope.date.month - 1, val);
      scope.initDate(d);
      scope.calOn = false;
    }
    scope.initDate = function(val) {
      if ( Object.prototype.toString.call(val) === "[object Date]" ) {
        if ( isNaN( val.getTime() ) ) {
          val = new Date();
        }
      }else{
        val = new Date();
      }

      scope.date.year = val.getFullYear();
      scope.date.month = val.getMonth() + 1;
      scope.date.day = val.getDate();
      scope.date.dayShufle = new Date(scope.date.year, scope.date.month - 1, 0).getDay();
      scope.date.daysInMonth = new Date(scope.date.year, scope.date.month, 0).getDate();
      scope.date.cal = [];
      for (var i = 0; i < scope.date.dayShufle + scope.date.daysInMonth; i++) {
        if (i < scope.date.dayShufle) {
          scope.date.cal[i] = {
            day: ' ',
            t: ''
          };
        } else {
          var t = '';
          if ((new Date(scope.date.year, scope.date.month - 1, i - scope.date.dayShufle).getDay()) == 6) {
            t = 'holly';
          }
          if (scope.date.day + scope.date.dayShufle - 1 == i) {
            t = 'active';
          }
          scope.date.cal[i] = {
            day: (i - scope.date.dayShufle) + 1,
            t: t
          };
        }

      };
      scope.formcalendardate=$filter('date')(val, 'dd/MM/yyyy');
    }
    scope.initDate(scope.val);
  }
  return {
    restrict: 'A',
    scope: {
      formcalendardate: '=inp'
    },
    templateUrl: CONFIG.route + '/views/calendar.html',
    link: link
  };
});