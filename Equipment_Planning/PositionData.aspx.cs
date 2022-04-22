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
    public partial class PositionData : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod()]
        public static string get_Position_Data()
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
            dbc.RunProcedure("sp_get_added_position_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Position_Data_Download()
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
            dbc.RunProcedure("sp_get_added_position_data_download", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Position_Data_Header()
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
            dbc.RunProcedure("sp_get_added_position_data_Year_Header", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

    }
}