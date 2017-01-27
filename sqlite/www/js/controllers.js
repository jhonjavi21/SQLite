angular.module('starter.controllers', ['ionic'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  })

  .controller('FormularioCtrl', function ($scope, $cordovaSQLite) {
    $scope.insert = function (student) {
      var query = "INSERT INTO students (dni, nombre, apellido) VALUES (?,?,?)";
      $cordovaSQLite.execute(db, query, [student.dni, student.nombre, student.apellido]).then(function (res) {
        alert($scope.status = "Estudiante agregado exitosamente");
      }, function (err) {
        alert($scope.status = "Error al agregar el estudiante: " + err.message);
      });
      // $scope.load();
    }


    $scope.load = function () {
      $scope.donnees = [];
      $cordovaSQLite.execute(db, "SELECT dni, nombre, apellido FROM students")
        .then(function (res) {
          if (res.rows.length) {
            for (var i = 0; i < res.rows.length; i++) {
              $scope.donnees.push(res.rows.item(i));
            }
            $scope.status = "Cargado exitosamente"
          }
        }, function (err) {
          $scope.status = "error loading: " + err.message;
        })

    }

  })
  ;
