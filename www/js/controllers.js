angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //traer usuarios
    $scope.usuarios = [];
    var messagesRef = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/usuarios/');
    messagesRef.on('value', function (snapshot) { 
      var message = snapshot.val();
      for(var index in message) { 
         if (message.hasOwnProperty(index)) {
             var attr = message[index];
             $scope.usuarios.push(attr);
         }
      }
      //$scope.usuarios.push(message);
      console.log($scope.usuarios); 
    });

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
    
    var usu = $scope.loginData.username;
    console.log(usu);
    console.log($scope.usuarios);
    $scope.loged = 0;
    $scope.usuarios.forEach(function(item, index) {
      console.log(item);
      if(item == usu && $scope.loged == 0){
        $scope.loged = 1;
      }
    });
    if($scope.loged == 1){
      location.href = "./#/app/browse";
      $scope.closeLogin();
    }else{
      alert("Usuario incorrecto. Intente otra vez");
    }
   

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
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

    //$scope.flag = 0;
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
    //$scope.flag = 0;
  });



  $scope.respuesta = function(boton){
    var acierto;
    if($scope.pregunta[$scope.indice].verdad == boton){
      //alert("verdadero");
      //acierto = true;
      //reproducir sonido y vibrar
    }else{
      //alert("falso");
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
    document.getElementById("texto").innerHTML  = "<center><h4><--  Deslice para nueva pregunta  <--</h4></center>";
    document.getElementById("texto").className = "bar bar-footer footerHH";
    document.getElementById("pregg").className = "card";
    //document.getElementById("cont").className = " ";
    $scope.flag = 1;

    /*setTimeout(function () {
      
      $scope.indice = ind;
      console.log(ind);
      document.getElementById("bt3").className = "button button-block button-stable";
      
    }, 2000);*/
  }

  $scope.nPregunta = function(){
    //CAMBIAR PREGUNTA
    var ind = Math.floor((Math.random() * 3));
    var oldInd = $scope.indice;
    //console.log("ran " +ind); 
    while(ind == $scope.indice){
      ind = Math.floor((Math.random() * 3));
      //console.log("ran " +ind); 
    }
    if($scope.flag == 1){
      $scope.flag = 0;
      $scope.indice = ind;
    }
    
    //document.getElementById("pregTemp").reload();
    console.log(location.href);
    /*if(oldInd ){
      console.log("ch " + $scope.flag);
      $scope.flag = 1;
      location.href = "./#/app/search2";   
    }else{
      console.log("chhhh " + $scope.flag);
      $scope.flag = 0;
      location.href = "./#/app/search";
    }*/
    document.getElementById("pregg").className = "card slidein";
    document.getElementById("bt1").className = "button button-block button-stable slidein";
    document.getElementById("bt2").className = "button button-block button-stable slidein";
    document.getElementById("bt3").className = "button button-block button-stable slidein";
    document.getElementById("texto").innerHTML  = "";
    document.getElementById("texto").className = "";
  }
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});
