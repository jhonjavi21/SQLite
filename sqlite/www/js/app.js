// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
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
      db = window.openDatabase("prueba.db", "1.0", "prueba", "20000");
      $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT, dni VARCHAR, nombre VARCHAR, apellido VARCHAR)");
       $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE Usuarios (IdUsuario	integer NOT NULL PRIMARY KEY AUTOINCREMENT, Nombres	varchar(50), Apellidos	varchar(50), Cedula	varchar(10),	Password	varchar(30),	Estado	bit DEFAULT ((1)))");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE Categorias (CatID	int NOT NULL,	Titulo	nvarchar(255),	Pond	float(53),	PRIMARY KEY(`CatID`))");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE SubCategoria (CatId	integer,	SECID	nvarchar(255),	Titulo	nvarchar(255),	SecCatId	integer NOT NULL PRIMARY KEY AUTOINCREMENT,	foreign key (CatId) references Categorias(CatID) on delete cascade on update cascade)");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE LugarOperacion (IdLugarOperacion	integer NOT NULL PRIMARY KEY AUTOINCREMENT,LugarDeOperacion	nvarchar(255))");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE EstandaresAuditoria (IdEstandart	integer NOT NULL PRIMARY KEY AUTOINCREMENT,Estandart	nvarchar(255))");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE PuntosAuditables (ID_Estandart	int,ID_Punto	nvarchar(255),PuntoAuditable	nvarchar(255),LugarDeOperacion	nvarchar(255),OrganizacionResponsable	nvarchar(255),FrecuenciaDeEvaluacion	nvarchar(255),CaracteristicaEspecifica1	nvarchar(255),CaracteristicaEspecifica2	nvarchar(255),CaracteristicaEspecifica3	nvarchar(255),CaracteristicaEspecifica4	nvarchar(255),CaracteristicaEspecifica5	nvarchar(255),NombrePuntoAuditable	nvarchar(255),IdPuntoAuditable	integer NOT NULL PRIMARY KEY AUTOINCREMENT,FOREIGN KEY(ID_Estandart) REFERENCES EstandaresAuditoria(IdEstandart) on delete cascade on update cascade)");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE CompetenciasUsuarios (IdCompetenciaUsuario	integer NOT NULL PRIMARY KEY AUTOINCREMENT,IdUsuario	INTEGER,IdEstandart	INTEGER,FechaDesde	datetime,FechaHasta	datetime,FechaAsignacion	datetime,IdUsuarioAsignador	INTEGER,EstadoCompetencia	bit,foreign key (IdUsuario) references Usuarios(IdUsuario) on delete cascade on update cascade, foreign key (IdUsuarioAsignador) references Usuarios(IdUsuario) on delete cascade on update cascade, foreign key (IdEstandart) references EstandaresAuditoria(IdEstandart) on delete cascade on update cascade)");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");
      $cordovaSQLite.execute(db,
        "CREATE TABLE Auditorias (IdAuditoria	integer NOT NULL PRIMARY KEY AUTOINCREMENT,IdSubCategoria	integer,Cumple	bit,Observacion	varchar(300),FechaResolucion	datetime,IdUsuario	integer,FechaAuditoriaItem	datetime,IdPuntoAuditable	integer,foreign key(IdSubCategoria) references SubCategoria(SecCatId) on delete cascade on update cascade,foreign key(IdUsuario) references Usuarios(IdUsuario) on delete cascade on update cascade, foreign key(IdPuntoAuditable) references PuntosAuditables(IdPuntoAuditable) on delete cascade on update cascade)");
         $cordovaSQLite.execute(db, "PRAGMA foreign_keys = ON;");


    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.formulario', {
        url: '/formulario',
        views: {
          'menuContent': {
            templateUrl: 'templates/formulario.html'
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
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
  });
