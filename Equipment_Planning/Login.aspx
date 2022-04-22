<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Equipment_Planning.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>MIB LOG</title>
    <link rel='icon' href="img/bfc_logo_part1.PNG" type='image/x-icon' />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="css/adminlte.min.css">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
    <link rel="stylesheet" href="css/toastr.css" />
    <link rel="stylesheet" href="css/mystyle.css" />
    <link href="css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <script type="text/javascript" src="AngularJs/jquery.min.js"></script>
    <script type="text/javascript" src="AngularJs/jquery-ui.min.js"></script>
    <script type="text/javascript" src="AngularJs/angular.min.js"></script>
    <script type="text/javascript" src="AngularJs/ui-bootstrap.min.js"></script>
    <script type="text/javascript" src="AngularJs/ui-bootstrap-tpls.min.js"></script>
    <script type="text/javascript" src="AngularJs/smart-table.js"></script>
    <script type="text/javascript" src="AngularJs/dirPaginate.js"></script>
    <script type="text/javascript" src="AngularJs/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" src="AngularJs/Chart.min.js"></script>
    <script type="text/javascript" src="AngularJs/toastr.js"></script>
    <script type="text/javascript" src="AngularJs/pdfmake.min.js"></script>
    <script type="text/javascript" src="AngularJs/html2canvas.min.js"></script>
    <script type="text/javascript" src="AngularJs/table2excel.js"></script>
    <script type="text/javascript" src="AngularJs/jspdf.min.js"></script>
    <script type="text/javascript" src="AngularJs/xlsx.full.min.js"></script>
    <script src="AngularJs/ng-file-upload-shim.min.js"></script>
    <script src="AngularJs/ng-file-upload.min.js"></script>
    <script src="js/dirPaginate.js"></script>
    <script>
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    </script>
</head>
<body style="color: #d47677; background: #fff;" ng-app="myApp" ng-controller="myCntrl">
    <form id="form1" runat="server" autocomplete="off">
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="padding-top:120px;">
                    <table style="width:100%;">
                        <tr>
                            <td align="center">
                                <img src="../img/CarImageWithName.png" style="width: 570px; margin-bottom: 30px; margin-left: 0px;" alt="MIB LOG" />
                            </td>
                        </tr>
                    </table>
                    <div class="login-form" style="width:360px;padding:0;">
                        <div class="form-group">
                            <input type="text" class="form-control" id="txt_login_id" name="txt_login_id" style="text-transform: uppercase;" maxlength="150" placeholder="Nutzername" required="required" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="txt_login_password" name="txt_login_password" maxlength="150" placeholder="Passwort" required="required" />
                        </div>
                        <div class="form-group">
                            <input type="button" id="btn_Login" class="btn btn-primary btn-lg btn-block" style="background-color:#074e70fa;" ng-click="user_login();" value="Anmelden" />
                        </div>
                        <%-- <div class="clearfix">
                <a href="#" class="pull-right">Forgot Password?</a>
            </div>--%>
                    </div>
                </div>
            </div>
        </div>
        <!-- Loader -->
        <div class="container">
            <div id="Loader" style="display: none; opacity: 0.7" class="loader-overlay">
                <div class="loader-content">
                    <div class="loader-index" style="opacity: 1">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
        <!-- Bootstrap 4 -->
        <script src="js/bootstrap.bundle.min.js"></script>
        <!-- jquery-validation -->
        <script src="js/jquery.validate.min.js"></script>
        <script src="js/additional-methods.min.js"></script>
        <!-- AdminLTE App -->
        <script src="js/adminlte.min.js"></script>
        <!-- AdminLTE for demo purposes -->
        <%--<script src="../js/demo.js"></script>--%>
        <%--        <script src="../js/custom.js"></script>--%>
        <script type="text/javascript" src="AngularJs/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="AngularJs/dataTables.bootstrap.min.js"></script>
        <script src="AngularJs/jszip.min.js"></script>
        <script src="AngularJs_Page/Login.js?v=1"></script>
        <script type="text/javascript">
            function store_access_key(ShortId) {
                $("#txt_login_id").val(ShortId);
            }

            $("#txt_login_password").keyup(function (event) {
                if (event.keyCode === 13) {
                    $("#btn_Login").click();
                }
            });
        </script>
    </form>
</body>
</html>
