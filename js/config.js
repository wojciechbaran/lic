testApp.constant('CONFIG', {
  'route': 'lic',
  'languages': [{
    'key': 'pl',
    'label': 'Polski'
  }, {
    'key': 'en',
    'label': 'Angielski'
  }],
  'defaultLanguage': 'pl',
  'siteName': 'System do Organizacji Konferencji Naukowych',
  'baseURL': '',
  'fileUploadPath':'uploads',
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
    label: 'Opublikowany, z możlwością zapisów'
  }, {
    id: 3,
    label: 'Opublikowany, bez możlwości zapisów'
  }, {
    id: 4,
    label: 'Zakończony'
  }]
});