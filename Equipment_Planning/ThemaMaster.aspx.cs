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
using System.Security.Principal;

namespace Equipment_Planning
{
    public partial class ThemaMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod()]
        public static string get_Thema_Master_Data()
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
            dbc.RunProcedure("sp_get_added_Thema_Master_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

       


        [System.Web.Services.WebMethod()]
        public static string Save_Thema_Master_Data(string ThemaName, string UserId, string PlanergruppeId, string KostenartId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[5];
            sqlParam[0] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 500, PlanergruppeId);
            sqlParam[1] = dbc.MakeInParameter("@KostenartId", SqlDbType.NVarChar, 500, KostenartId);
            sqlParam[2] = dbc.MakeInParameter("@ThemaName", SqlDbType.NVarChar, 500, ThemaName);
            sqlParam[3] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 50, UserId);
            sqlParam[4] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_save_Thema_data", sqlParam);
            Result = Convert.ToString(sqlParam[4].Value);
            return Result;

        }


        [System.Web.Services.WebMethod()]
        public static string Activate_DeActivate_Thema_Master(string ThemaId)
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
            sqlParam[0] = dbc.MakeInParameter("@ThemaId", SqlDbType.NVarChar, 250, ThemaId);
            dbc.RunProcedure("sp_Activate_DeActivate_Thema_Master", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }



        [System.Web.Services.WebMethod()]
        public static string Update_Thema_Master_Data(string ThemaId, string ThemaName, string UserId, string PlanergruppeId, string KostenartId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[6];
            sqlParam[0] = dbc.MakeInParameter("@ThemaId", SqlDbType.Int, 8, ThemaId);
            sqlParam[1] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 10, PlanergruppeId);
            sqlParam[2] = dbc.MakeInParameter("@KostenartId", SqlDbType.NVarChar, 50, KostenartId);
            sqlParam[3] = dbc.MakeInParameter("@ThemaName", SqlDbType.NVarChar, 500, ThemaName);
            sqlParam[4] = dbc.MakeInParameter("@UserId", SqlDbType.Int, 8, UserId);
            sqlParam[5] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_Update_Thema_Data", sqlParam);
            Result = Convert.ToString(sqlParam[5].Value);
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

    }
}