angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('CargarTrivia', function($scope) {
  $scope.indice = Math.floor((Math.random() * 4));
  $scope.pregunta = [];
  var messagesRef = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/preguntas/');
  messagesRef.on('value', function (snapshot) { 
    var message = snapshot.val();
    $scope.pregunta.push(message.pregunta1);
    $scope.pregunta.push(message.pregunta2);
    $scope.pregunta.push(message.pregunta3);
    $scope.pregunta.push(message.pregunta4);
    console.log($scope.pregunta); 
    console.log($scope.indice); 
  });
})


.controller('PreguntaCtrl', function($scope) {
  $scope.indice = Math.floor((Math.random() * 4));
  $scope.pregunta = [];
  var messagesRef = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/preguntas/');
  messagesRef.on('value', function (snapshot) { 
    var message = snapshot.val();
    $scope.pregunta.push(message.pregunta1);
    $scope.pregunta.push(message.pregunta2);
    $scope.pregunta.push(message.pregunta3);
    $scope.pregunta.push(message.pregunta4);
    console.log($scope.pregunta); 
    console.log($scope.indice); 
  });



  $scope.respuesta = function(boton){
    var acierto;
    if($scope.pregunta[$scope.indice].verdad == boton){
      alert("verdadero");
      //acierto = true;
      //reproducir sonido y vibrar
    }else{
      alert("falso");
      //acierto = false;
      //reproducir sonido y vibrar dis veces
    }

    //cambio de color
    document.getElementById("bt1").className = "button button-block button-assertive";
    document.getElementById("bt2").className = "button button-block button-assertive";
    document.getElementById("bt3").className = "button button-block button-assertive";
    switch($scope.pregunta[$scope.indice].verdad){
      case 1:
        document.getElementById("bt1").className = "button button-block button-balanced";
        break;
      case 2:
        document.getElementById("bt2").className = "button button-block button-balanced";
        break;
      case 3:
        document.getElementById("bt3").className = "button button-block button-balanced";
        break;
    }
    //console.log(document.getElementById("bt3").className);
    //document.getElementById("bt3").className = "button button-block button-balanced";
    document.getElementById("texto").innerHTML  = "<br><br><center><h4>Deslice para nueva pregunta ---></h4></center><br><br>";
    document.getElementById("texto").className = "item item-divider";
      

    /*setTimeout(function () {
      
      $scope.indice = ind;
      console.log(ind);
      document.getElementById("bt3").className = "button button-block button-stable";
      
    }, 2000);*/
  }

  $scope.nPregunta = function(){
    //CAMBIAR PREGUNTA
    var ind = Math.floor((Math.random() * 3));
    //console.log("ran " +ind); 
    while(ind == $scope.indice){
      ind = Math.floor((Math.random() * 3));
      //console.log("ran " +ind); 
    }
    $scope.indice = ind;
    document.getElementById("bt1").className = "button button-block button-stable";
    document.getElementById("bt2").className = "button button-block button-stable";
    document.getElementById("bt3").className = "button button-block button-stable";
    document.getElementById("texto").innerHTML  = "";
    document.getElementById("texto").className = "";
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
