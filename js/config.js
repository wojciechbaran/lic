testApp.constant('CONFIG', {
  'route': 'lic',
  'languages': [{
    'key': 'pl',
    'label': 'Polski'
  },{
    'key': 'en',
    'label': 'English'
  }],
  'defaultLanguage': 'en',
  'siteName': 'System do Organizacji Konferencji Naukowych',
  'baseURL': 'http://wojbaran.webd.pl',
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
  }]
});