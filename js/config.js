testApp.constant('CONFIG', {
  'route': 'lic',
  'languages': [{
    'key': 'pl',
    'label': 'Polski'
  }, {
    'key': 'en',
    'label': 'English'
  }],
  'defaultLanguage': 'pl',
  'siteName': 'System do Organizacji Konferencji Naukowych',
  //'baseURL': 'http://wojbaran.webd.pl',
  'baseURL': '',
  'userDataFilds': [{
    'name': 'name',
    'label': 'Imie',
    'required': true
  }, {
    'name': 'surname',
    'label': 'Nazwisko',
    'required': true
  }, {
    'name': 'email',
    'label': 'Adres mail',
    'required': false
  }],
  'projectStatus': [{
    id: 0,
    label: 'Nieopublikowany'
  }, {
    id: 1,
    label: 'Informacja wstępna'
  }, {
    id: 2,
    label: 'Opublikowany, z możlwoścą zapisów'
  }, {
    id: 3,
    label: 'Opublikowany, bez możlwosci zapisów'
  }, {
    id: 4,
    label: 'Zakończony'
  }]
});