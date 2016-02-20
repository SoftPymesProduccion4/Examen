'use strict';
 
app.controller('homeController', [ '$scope' , '$uibModal', 'coloresService' , 'crearService', 'editService', 'deleteService', function ($scope , $uibModal , coloresService, crearService, editService, deleteService) {

	$scope.NuevoColor = {};
	$scope.model = {};
	$scope.colores = [];
    $scope.animationsEnabled = false;
    
    //ModificarColor
    
    $scope.EditThisItem = function (size) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'ModificarColor.html',
          controller: 'ModalModificarColorInstanceCtrl',
          size: size,
            resolve: {
            items: function () {
              return ObtenerRegistroSeleccionado();
            }
      }
        });

       modalInstance.result.then(function (selectedItem) {
           console.log(selectedItem);
           
            console.log(selectedItem);
            editService.Editar(selectedItem.colorId, selectedItem)
                .then(function (result){
                    console.log(result);
                    
                 }, function (error) {
                   console.log(error);
                });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };
    
    $scope.DeleteThisItem = function (size) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'EliminarColor.html',
          controller: 'ModalEliminarColorInstanceCtrl',
          size: size,
            resolve: {
            items: function () {
              return ObtenerRegistroSeleccionado();
            }
      }
        });

       modalInstance.result.then(function (selectedItem) {
           console.log(selectedItem);
           
            console.log(selectedItem);
            deleteService.Eliminar(selectedItem.colorId)
                .then(function (result){
                    console.log(result);
                    
                 }, function (error) {
                   console.log(error);
                });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

    
    $scope.AgregarColor = function (size) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'AgregarColor.html',
          controller: 'ModalAgregarColorInstanceCtrl',
          size: size
        });

       modalInstance.result.then(function (selectedItem) {
           console.log(selectedItem);
           var color = {
                code: selectedItem.code,
                createdBy: selectedItem.createdBy,
                creationDate:  new Date(),
                isDeleted: false,
                name: selectedItem.name,
                updateBy: selectedItem.createdBy,
                updateDate:  new Date()
           };

            crearService.Crear(color)
            .then(function (result){
                console.log(result);
                $scope.colores.push(color);
            }, function (error) {
                   console.log(error);
                });		
           /*$scope.colores.push();*/
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

	var CargarColores = function ()
	{
		coloresService.ObtenerColores()
            .then(function (result){
                console.log(result.data);
                $scope.colores = result.data;
            }, function (error) {
               console.log(error);
            });
	};

    function ObtenerRegistroSeleccionado()
    {
        for (var i = 0; $scope.colores.length; i ++)
        {
            var item =  $scope.colores[i];
            
            if(item === undefined)
                return;
            
            if(item.selected)
                return item;
        }
    };
    
    function SeleccionarRegistro(model)
    {
        for (var i = 0; $scope.colores.length; i ++)
        {
            var item =  $scope.colores[i];
            
            if(item === undefined)
                return;
            
            if(item !== model)
                item.selected = false;
        }
    };
    
   
    
	CargarColores();

    $scope.seleccionarRegistro = SeleccionarRegistro;

}]);

app.controller('ModalAgregarColorInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.selected = {
    item: {}
  };

  $scope.ok = function () {
      if($scope.selected.item === undefined)
          {
              alert("Debe de llenar los campos");
              return;
              
          }
      
     if( $scope.selected.item.code === undefined || $scope.selected.item.code === '')
     {         
         alert("Debe de escribir el código");
         return;
     }
      if($scope.selected.item.name === undefined || $scope.selected.item.name === '')
     {         
         alert("Debe de escribir el nombre");
         return;
     }
      if($scope.selected.item.createdBy === undefined || $scope.selected.item.createdBy === '')
     {         
         alert("Debe de escribir el Creado Por");
         return;
     }
      
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
      

app.controller('ModalModificarColorInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.selected = {
    item: items
  };

  $scope.ok = function () {
      if($scope.selected.item === undefined)
      {
          alert("Debe de llenar los campos");
          return;

      }
      
     if( $scope.selected.item.code === undefined || $scope.selected.item.code === '')
     {         
         alert("Debe de escribir el código");
         return;
     }
      if($scope.selected.item.name === undefined || $scope.selected.item.name === '')
     {         
         alert("Debe de escribir el nombre");
         return;
     }
      if($scope.selected.item.createdBy === undefined || $scope.selected.item.createdBy === '')
     {         
         alert("Debe de escribir el Creado Por");
         return;
     }
      
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('ModalEliminarColorInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.selected = {
    item: items
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
      
  
  