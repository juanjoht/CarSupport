// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app/menu/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/home.html'
       }
    } 
  })
.state('app.fallas', {
    url: '/fallas',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/fallas.html'
      }
    }
  })
.state('app.mantenimiento', {
    url: '/mantenimiento',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/mantenimiento.html'
      }
    }
  })
.state('app.tips', {
    url: '/tips',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/tips.html'
      }
    }
  })
.state('app.foro', {
    url: '/foro',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/foro.html'
      }
    }
  })

.state('app.aspectos', {
    url: '/aspectos',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/fallas/aspectos.html'
      }
    }
  })
.state('app.registrofallas', {
    url: '/registrofallas',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/fallas/registrofallas.html'
      }
    }
  })
.state('app.fallasximagen', {
    url: '/fallasximagen',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/fallas/fallasximagen.html'
      }
    }
  })
.state('app.fallasxpreguntas', {
    url: '/fallasxpreguntas',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/fallas/fallasxpreguntas.html'
      }
    }
  })
.state('app.confignotificacion', {
    url: '/confignotificacion',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/menu/mantenimiento/confignotificacion.html'
      }
    }
  })
.state('diagnostico', {
    url: '/diagnostico',
    //views: {
      //'menuContent': {
        templateUrl: 'templates/app/menu/fallas/diagnostico.html'
     // }
   // }
  })
 /* .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
*/
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
