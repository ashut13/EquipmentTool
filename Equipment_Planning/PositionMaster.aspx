﻿<%@ Page Title="" Language="C#" MasterPageFile="~/UserSiteMaster.Master" AutoEventWireup="true" CodeBehind="PositionMaster.aspx.cs" Inherits="Equipment_Planning.PositionMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- left column -->
                    <div class="col-md-12">
                        <!-- general form elements -->
                        <div class="card card-primary" style="margin-top: 15px;">
                            <div class="card-header" style="background-color: #074e70fa;">
                                <h5 class="card-title"><b>POSITION MASTER</b></h5>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">Hinzufügen oder Aktualisieren Position</strong></h3>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Planergruppe<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="1" id="ddl_Planergruppe" ng-change="fn_bind_Thema()" ng-model="PlanergruppeModel" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Planergruppe</option>
                                                                <option ng-repeat="t in Planergruppe" value="{{t.PlanergruppeId}}">{{t.PlanergruppeName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Kostenart<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="2" id="ddl_Kostenart" ng-change="fn_bind_Thema()" ng-model="KostenartModel" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Kostenart</option>
                                                                <option ng-repeat="t in Kostenart" value="{{t.KostenartId}}">{{t.KostenartName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Thema<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="3" ng-model="ThemaModel" id="ddl_Thema" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Thema</option>
                                                                <option ng-repeat="t in Thema" value="{{t.ThemaId}}">{{t.ThemaName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Position<span style="color: red;">*</span></label>
                                                            <input type="text" class="form-control" tabindex="4" id="txt_Position" placeholder="Position">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Price<span style="color: red;">*</span></label>
                                                            <input type="text" onkeypress="return onlyNumberKey(event)" class="form-control" tabindex="5" id="txt_Price" placeholder="Price">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <input type="button" class="btn btn-primary" id="btn_Save" ng-click="fn_Save_Position_Data()" style="background-color: #074e70fa; margin-top: 33px;" value="Speichern" />
                                                            <input type="button" class="btn btn-primary" id="btn_Update" ng-click="fn_Update_PositionMaster()" style="background-color: #074e70fa; margin-top: 33px;" value="Aktualisieren" />
                                                            <input type="button" class="btn btn-primary" ng-click="fn_Reset()" style="background-color: #074e70fa; margin-top: 33px;" value="Zurücksetzen" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">Position Daten</strong></h3>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="card-header">
                                                            <input type="text" id="mySearchText" ng-model="search" style="width: 100%; border-radius: 18px; height: 36px; border: 1px solid #e7e8ed; background-color: #f8f8f9; text-align: center; box-shadow: none;" placeholder=" Search...">
                                                        </div>
                                                        <!-- /.card-header -->
                                                        <div class="card-body">
                                                            <table role="table" id="tbl_class" style="background-color: #fff; width: 100%; max-width: 100%" class="table-bordered">
                                                                <thead role="rowgroup" style="background-color: #e7e8ed; border: 1px solid #e7e8ed; height: 40px">
                                                                    <tr role="row">
                                                                        <th role="columnheader" style="width: 5%; text-align: center; vertical-align: middle;">S.No</th>
                                                                        <th role="columnheader" style="width: 10%; text-align: center; vertical-align: middle;">Planergruppe</th>
                                                                        <th role="columnheader" style="width: 10%; text-align: center; vertical-align: middle;">Kostenart</th>
                                                                        <th role="columnheader" style="width: 10%; text-align: center; vertical-align: middle;">Thema</th>
                                                                        <th role="columnheader" style="width: 25%; text-align: center; vertical-align: middle;">Position</th>
                                                                        <th role="columnheader" style="width: 10%; text-align: center; vertical-align: middle;">Position Price</th>
                                                                        <th role="columnheader" style="width: 20%; text-align: center; vertical-align: middle;">Eingefügt von</th>
                                                                        <th role="columnheader" style="width: 20%; text-align: center; vertical-align: middle;">Eingefügtes Datum</th>
                                                                        <th role="columnheader" style="width: 5%; text-align: center; vertical-align: middle;">Bearbeiten</th>
                                                                        <th role="columnheader" style="width: 5%; text-align: center; vertical-align: middle;">Aktion</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody role="rowgroup">
                                                                    <tr role="row" style="height: 38px" dir-paginate="t in PositionMaster|filter:search|itemsPerPage:4">
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{PositionMaster.indexOf(t) + 1}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PlanergruppeName}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.KostenartName}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.ThemaName}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PositionName}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PositionPrice}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UserName}}</td>
                                                                        <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UpdatedDate}}</td>
                                                                        <td style="text-align: center; vertical-align: middle;">
                                                                            <img ng-click="fn_Edit(t.PositionId);" title="Aktualisieren Position" ng-if="t.IsActive==1" style="height: 32px; width: 32px; cursor: pointer;" src="img/update_icon.ico" />
                                                                        </td>
                                                                        <td style="text-align: center; vertical-align: middle;">
                                                                            <img ng-if="t.IsActive==1" ng-click="fn_Active_De_Active(t.PositionId);" title="Activate" style="height: 32px; width: 32px; cursor: pointer;" src="img/Active.png" />
                                                                            <img ng-if="t.IsActive==0" ng-click="fn_Active_De_Active(t.PositionId);" title="Deactivate" style="height: 32px; width: 32px; cursor: pointer;" src="img/Deactivate.png" />
                                                                        </td>
                                                                    </tr>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div style="margin-top: 0px">
                                                                <dir-pagination-controls
                                                                    max-size="8"
                                                                    direction-links="true"
                                                                    boundary-links="true">
                                        </dir-pagination-controls>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script src="AngularJs_Page/PositionMaster.js?v=1"></script>
</asp:Content>
