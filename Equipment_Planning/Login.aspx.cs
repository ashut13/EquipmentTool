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
    public partial class login : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    WindowsIdentity identity = System.Web.HttpContext.Current.Request.LogonUserIdentity;
                    string[] GetLoginId = identity.Name.Split('\\');
                    string ShortId = GetLoginId[GetLoginId.Length - 1];
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "store_access_key", "store_access_key('" + ShortId + "')", true);
                }
                catch (Exception)
                {

                }
            }
        }

        [System.Web.Services.WebMethod()]
        public static string user_login(string Login_Id, string Password)
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
            sqlParam[0] = dbc.MakeInParameter("@User_Login_Id", SqlDbType.NVarChar, 250, Login_Id);
            sqlParam[1] = dbc.MakeInParameter("@User_Password", SqlDbType.NVarChar, 1500, ut.EncryptTripleDES(Password));
            dbc.RunProcedure("sp_user_login", sqlParam, out dt);
            Result= JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }
    }
}