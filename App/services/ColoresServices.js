
'use strict';
app.factory('coloresService', ['$http' , function ($http) {

    
    var serviceBase = "http://192.168.80.70/PymesPlusWeb/api/Referential/Colors/AllColors"
    var ColoresServicesFactory = {};

    function ObtenerColores(){
        return $http.get(serviceBase)
        .success(function (results) {
            return results;
        }).error(function (error){
            console.log(error);
        });
    }
    ColoresServicesFactory.ObtenerColores = ObtenerColores;
    return ColoresServicesFactory;

}]);

app.factory('crearService', ['$http' , function ($http) {

    
    var serviceBase = "http://192.168.80.70/PymesPlusWeb/Api/Referential/Colors/CreateColor"
    var CrearServicesFactory = {};

    function Crear(obj){
      return $http.post(serviceBase,obj)
        .success(function (results){
        return results;
        }).error(function (error){
                console.log(error);
            });

    }

    CrearServicesFactory.Crear = Crear;
    return CrearServicesFactory;

}]);

app.factory('editService', ['$http' , function ($http) {

    
    var serviceBase = "http://192.168.80.70/PymesPlusWeb/Api/Referential/Colors/UpdateColorById?id="
    var EditServicesFactory = {};

    function Editar(id,obj){
      return $http.put(serviceBase+id, obj)
        .success(function (results){
        return results;
        }).error(function (error){
                console.log(error);
            });

    }

    EditServicesFactory.Editar = Editar;
    return EditServicesFactory;

}]);

app.factory('deleteService', ['$http' , function ($http) {

    
    var serviceBase = "http://192.168.80.70/PymesPlusWeb/Api/Referential/Colors/"
    var DeleteServicesFactory = {};

    function Eliminar(id){
  return $http.delete(serviceBase+id)
    .success(function (results){
    return results;
    }).error(function (error){
            console.log(error);
        });

    }

    DeleteServicesFactory.Eliminar = Eliminar;
    return DeleteServicesFactory;

}]);


