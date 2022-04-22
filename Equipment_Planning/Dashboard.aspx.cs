using Newtonsoft.Json;
using Equipment_Planning.App_Code;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

namespace Equipment_Planning
{
    public partial class dashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod()]
        public static string get_data_for_chart_Derivat_Wise(string DerivatId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[1];
            sqlParam[0] = dbc.MakeInParameter("@DerivatId", SqlDbType.NVarChar, 500, DerivatId);
            dbc.RunProcedure("sp_get_data_for_chart_Derivat_Wise", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_data_for_chart_Kostenart_Wise(string KostenartId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[1];
            sqlParam[0] = dbc.MakeInParameter("@KostenartId", SqlDbType.NVarChar, 500, KostenartId);
            dbc.RunProcedure("sp_get_data_for_chart_Kostenart_Wise", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_data_for_chart_ChanceRisiko_Wise(string ChanceRisikoId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[1];
            sqlParam[0] = dbc.MakeInParameter("@ChanceRisikoId", SqlDbType.NVarChar, 500, ChanceRisikoId);
            dbc.RunProcedure("sp_get_data_for_chart_ChanceRisiko_Wise", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_data_for_chart_department_wise()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_data_for_chart_department_Wise", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Derivat_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_derivat_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Kostenart_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_kostenart_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Planergruppe_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_planergruppe_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Thema_Data(string PlanergruppeId, string KostenartId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[2];
            sqlParam[0] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.Int, 8, PlanergruppeId);
            sqlParam[1] = dbc.MakeInParameter("@KostenartId", SqlDbType.Int, 8, KostenartId);
            dbc.RunProcedure("sp_get_thema_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Position_Data_For_Chart(string DerivatId, string PlanergruppeId, string KostenartId, string ThemaId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[4];
            sqlParam[0] = dbc.MakeInParameter("@DerivatId", SqlDbType.Int, 8, DerivatId);
            sqlParam[1] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.Int, 8, PlanergruppeId);
            sqlParam[2] = dbc.MakeInParameter("@KostenartId", SqlDbType.Int, 8, KostenartId);
            sqlParam[3] = dbc.MakeInParameter("@ThemaId", SqlDbType.Int, 8, ThemaId);
            dbc.RunProcedure("sp_get_added_position_data_For_Chart", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

    }
}