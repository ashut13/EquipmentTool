var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    $("#txt_login_password").focus();

    $scope.user_login = function () {

        if ($("#txt_login_id").val() == "") {
            toastr.warning("Please enter login id..!");
            $("#txt_login_id").focus();
            document.getElementById("txt_login_id").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_login_id").style.borderColor = "#ccc";
        }

        if ($("#txt_login_password").val() == "") {
            toastr.warning("Please enter password..!");
            $("#txt_login_password").focus();
            document.getElementById("txt_login_password").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_login_password").style.borderColor = "#ccc";
        }

        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'Login.aspx/user_login',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { Login_Id: $("#txt_login_id").val(), Password: $("#txt_login_password").val() }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d != "[]") {
                sessionStorage.setItem("epl_userid", JSON.parse(response.d)[0].UserId);
                sessionStorage.setItem("epl_username", JSON.parse(response.d)[0].UserName);
                sessionStorage.setItem("epl_isadmin", JSON.parse(response.d)[0].IsAdmin);
                sessionStorage.setItem("epl_firsttimelogin", JSON.parse(response.d)[0].FirstTimeLogin);
                window.location.href = "dashboard.aspx";
            }
            else {
                toastr.warning("Please enter correct id and password..!");
                $("#txt_login_password").val("");
                $("#txt_login_password").focus();
                document.getElementById("txt_login_password").style.borderColor = "#FF0000";
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    };

}]);