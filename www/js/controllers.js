angular.module('starter.controllers', ['ngCordova'])

/*.value('UsuarioLogueado', {
  UsuarioLog:null
})
.value('Loged', {
  log:null
})*/

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //TRAER USUARIOS
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

    //traer preguntas
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

.controller('Login', function($scope, $rootScope) {
  $scope.doLogin = function() {
    var usu = document.getElementById("usuario").value.toLowerCase();
    console.log(usu);
    $scope.loged = 0;
    $scope.usuarios.forEach(function(item, index) {
      console.log(item);
      if(item.nombre == usu && $scope.loged == 0){
        $scope.loged = 1;
      }
    });
    if($scope.loged == 1){
      $scope.logusu = usu;
      document.getElementById("LogedUsu").className = "card";
      document.getElementById("LogedUsu").innerHTML  = "<center><h4>Usuario Actual: " + usu + "</h4></center>";
      $rootScope.Loged = 1;
      $rootScope.LogedUsu = usu;
      console.log($rootScope);
    }else{
      alert("Usuario incorrecto. Intente otra vez");
    }
  };
})

.controller('CargarTrivia', function($scope) {
  
})


.controller('PreguntaCtrl', function($scope, $cordovaVibration, $rootScope, $cordovaFile) {
  $scope.indice = Math.floor((Math.random() * 4));
  $scope.pregunta = [];
  var messagesRef = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/preguntas/');
  messagesRef.on('value', function (snapshot) { 
    var message = snapshot.val();
    $scope.pregunta.push(message.pregunta1);
    $scope.pregunta.push(message.pregunta2);
    $scope.pregunta.push(message.pregunta3);
    $scope.pregunta.push(message.pregunta4);
    $scope.responded = 0;
  });

  var jsonRes = { };
  var count = 0;

  $scope.respuesta = function(boton){
    if($scope.responded == 0){
      if($scope.pregunta[$scope.indice].verdad == boton){
        //sonido    
        try{
          window.plugins.NativeAudio.play( 'success' );
        }catch(e){
          alert("Error Sonido success");
        }
        //vibrar
        try{
        // Vibrate 100ms
          $cordovaVibration.vibrate(100);
        } catch(e){
          alert("Error vibrar");
        }
        
      }else{
        //sonido
        try{
          window.plugins.NativeAudio.play( 'fail' );
        }catch(e){
          alert("Error Sonido fail");
        }
        //vibrar
        try{
          $cordovaVibration.vibrate(1000);
          setTimeout(function(){ $cordovaVibration.vibrate(0); }, 100);
          setTimeout(function(){ $cordovaVibration.vibrate(100); }, 200);
        } catch(e){
          alert("Error vibrar");
        }    
        
      }
    }
      

    //CAMBIO DE COLOR
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
    //BUTTON OUTLINE
    if($scope.responded == 0){
      switch(boton){
        case 1:
          document.getElementById("bt1").style = "border: 2px solid #ffffff";
          break;
        case 2:
          document.getElementById("bt2").style = "border: 2px solid #ffffff";
          break;
        case 3:
          document.getElementById("bt3").style = "border: 2px solid #ffffff";
          break;
      }
    }
    document.getElementById("texto").innerHTML  = "<center><h4><--  Deslice para nueva pregunta  <--</h4></center>";
    document.getElementById("texto").className = "bar bar-footer footerHH";
    document.getElementById("pregg").className = "card";

    //SE RESPONDIÓ LA PREGUNTA
    $scope.responded = 1;
    count++;
    //MANDAR PREGUNTA, RESPUESTAS POSIBLES, Y RESPUESTA ELEGIDA AL PERFIL DEL USUARIO EN FIREBASE
    if($rootScope.Loged == 1){
      var saveUser = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/usuarios/' + $rootScope.LogedUsu + '/');
      saveUser.push({
        "-Pregunta": $scope.pregunta[$scope.indice].pre,
        "Opcion1": $scope.pregunta[$scope.indice].res1,
        "Opcion2": $scope.pregunta[$scope.indice].res2,
        "Opcion3": $scope.pregunta[$scope.indice].res3,
        "Respuesta": $scope.pregunta[$scope.indice].verdad,
        "Opción_elegida": boton
      });
      jsonSec[count + "pregunta"] = {
        "-Pregunta": $scope.pregunta[$scope.indice].pre,
        "Opcion1": $scope.pregunta[$scope.indice].res1,
        "Opcion2": $scope.pregunta[$scope.indice].res2,
        "Opcion3": $scope.pregunta[$scope.indice].res3,
        "Respuesta": $scope.pregunta[$scope.indice].verdad,
        "Opción_elegida": boton
      };
    }
    
  }

  $scope.nPregunta = function(){
    //CAMBIAR PREGUNTA
    var ind = Math.floor((Math.random() * 3));
    //NO ELEGIR LA MISMA PREGUNTA EN LA QEU SE ESTÁ
    while(ind == $scope.indice){
      ind = Math.floor((Math.random() * 3)); 
    }
    //NO CAMBIAR PREGUNTA SI NO SE RESPONDIÓ
    if($scope.responded == 1){
      $scope.responded = 0;
      $scope.indice = ind;
    }
    //RESTAURAR COLOR Y TAMAÑO/ELIMINAR FOOTER
    document.getElementById("pregg").className = "card slidein";
    document.getElementById("bt1").className = "button button-block button-stable slidein";
    document.getElementById("bt2").className = "button button-block button-stable slidein";
    document.getElementById("bt3").className = "button button-block button-stable slidein";
    document.getElementById("bt1").style = " ";
    document.getElementById("bt2").style = " ";
    document.getElementById("bt3").style = " ";
    document.getElementById("texto").innerHTML  = "";
    document.getElementById("texto").className = "";

    //GUARDAR ARCHIVO
    try{
      var secuencia = $scope.secuencia.toString();
      $cordovaFile.writeFile(cordova.file.dataDirectory, "json.txt", JSON.stringify(jsonSec), true)
      .then(function (success) {
        alert(JSON.stringify(jsonSec));
      }, function (error) {
        alert("error escritura");
      });
    }catch(e){
      console.log("No es dispositivo movil. No se escribió archivo");
    }  
  }
})

.controller('PlaylistsCtrl', function($scope, $cordovaFile) {
  $scope.reload = function(){
    try{
      $cordovaFile.readAsText(cordova.file.dataDirectory, "json.txt")
      .then(function (success) {
        alert(success);
        $scope.json = /*JSON.parse(*/success/*)*/;
      }, function (error) {
        alert("Error lectura");
      });
    }catch(e){

    }
  }
});
