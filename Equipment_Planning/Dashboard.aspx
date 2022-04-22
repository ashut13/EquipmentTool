<%@ Page Title="" Language="C#" MasterPageFile="~/UserSiteMaster.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="Equipment_Planning.dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Dashboard</h1>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <section class="content">
            <div class="container-fluid">
                <!-- Small boxes (Stat box) -->
                <%--<div class="row">
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2020</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-gradient-lime">
                            <div class="inner" style="color: #fff!important;">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2021</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-dark">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2022</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-fuchsia">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2023</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-warning">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2024</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-danger">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2025</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-gradient-indigo">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>
                                <p>Gesamtpreis Jahr - 2026</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-success">
                            <div class="inner">
                                <h3 style="font-size: 1.8rem; font-weight: 600;">€ 0</h3>

                                <p>Gesamtpreis Jahr - 2027</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-stats-bars"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <!-- ./col -->
                </div>--%>
                <div class="row">
                    <div class="col-md-3">
                        <div class="small-box bg-info">
                            <select class="form-control select2" tabindex="2" ng-model="DerivatModel" ng-change="fn_data_for_chart()" id="ddl_Derivat" style="width: 100%;">
                                <option selected="selected" value="0">Auswählen Derivat</option>
                                <option ng-repeat="t in Derivat" value="{{t.DerivatId}}">{{t.DerivatName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="small-box bg-info">
                            <select class="form-control select2" tabindex="3" id="ddl_Planergruppe" ng-model="PlanergruppeModel" ng-change="fn_bind_Thema()" style="width: 100%;">
                                <option selected="selected" value="0">Auswählen Planergruppe</option>
                                <option ng-repeat="t in Planergruppe" value="{{t.PlanergruppeId}}">{{t.PlanergruppeName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="small-box bg-info">
                            <select class="form-control select2" tabindex="5" ng-change="fn_bind_Thema()" ng-model="KostenartModel" id="ddl_Kostenart" style="width: 100%;">
                                <option selected="selected" value="0">Auswählen Kostenart</option>
                                <option ng-repeat="t in Kostenart" value="{{t.KostenartId}}">{{t.KostenartName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="small-box bg-info">
                            <select class="form-control select2" tabindex="6" ng-model="ThemaModel" ng-change="fn_data_for_chart()" id="ddl_Thema" style="width: 100%;">
                                <option selected="selected" value="0">Auswählen Thema</option>
                                <option ng-repeat="t in Thema" value="{{t.ThemaId}}">{{t.ThemaName}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table width="100%">
                            <tr>
                                <td align="center">
                                    <div style="text-align: left; vertical-align: middle;">
                                        <div class="card">
                                            <div class="card-header ui-sortable-handle" style="cursor: move;">
                                                <h3 class="card-title">
                                                    <i class="fas fa-chart-pie mr-1"></i>
                                                    Jahresweise Menge Diagramm
                                                </h3>
                                            </div>
                                            <!-- /.card-header -->
                                            <div class="card-body" style="padding: 0;">
                                                <div class="tab-content p-0">
                                                    <!-- Morris chart - Sales -->
                                                    <div class="chart tab-pane active" id="sales-chart" style="position: relative; height: 480px; padding: 5px; min-width: 1279.2px; width: {{screen_width}};">
                                                        <canvas id="Chart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- /.row -->
            </div>
        </section>
    </div>
    <script src="AngularJs_Page/dashboard.js?v=1"></script>
</asp:Content>
