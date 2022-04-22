using System;
using System.Data;
using System.Configuration;
using System.Text;
using System.Web;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Net;
using System.IO;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace Equipment_Planning.App_Code
{
    public class DBController
    {
        DBController dbc;
        StringBuilder xml = new StringBuilder();
        private SqlConnection Conn = null;
        SmtpClient smtp;
        Utils ut = new Utils();
        public DBController()
        {
            //
            // TODO: Add constructor logic here
            //
        }



        public DateTime converttodatetime(string date1)
        {
            DateTime date = Convert.ToDateTime(Convert.ToDateTime(date1.ToString().Trim()).ToString("yyyy/MM/dd"));
            return date;
        }

        public SqlConnection Connect()
        {
            string sConnStr = ConfigurationSettings.AppSettings["ConnectionString"];
            if (object.Equals(Conn, null))
            {
                //Conn = new SqlConnection(ut.DecryptTripleDES(sConnStr));
                Conn = new SqlConnection(sConnStr);
                //string adasd = ut.EncryptTripleDES("Server=148.72.232.166;Database=sequel_db;User ID=sequel_db;Password=India@123;Encrypt=True;TrustServerCertificate=True;Connection Timeout=500; Max Pool Size=1000;");
            }
            if (Conn.State == ConnectionState.Closed)
            {
                Conn.Open();
            }
            // Conn.Open();            
            return Conn;
        }
        public int Execute_NonQuery(string qur_str)
        {
            try
            {
                Conn = Connect();
                SqlCommand Cmd = new SqlCommand(qur_str, Conn);
                Cmd.CommandType = CommandType.Text;
                int i = Cmd.ExecuteNonQuery();
                return i;
            }
            catch (SqlException ex)
            {
                this.funCloseConnection();
                //MessageBox.Show(ex.ToString());
                return 0;

            }
            catch (OutOfMemoryException ex)
            {
                this.funCloseConnection();
                //MessageBox.Show(ex + "error").ToString();
                return 0;
            }
            catch (StackOverflowException ex)
            {
                this.funCloseConnection();

                //MessageBox.Show(ex + "error").ToString();
                return 0;
            }
            catch (Exception ex)
            {
                this.funCloseConnection();
                //MessageBox.Show(ex + "error").ToString();
                return 0;
            }
            finally
            {
                this.funCloseConnection();
            }

        }

        public SqlParameter MakeInParameter(string sParamName, SqlDbType objDbType, int iSize, object objValue)
        {
            return MakeParameter(sParamName, objDbType, iSize, ParameterDirection.Input, objValue);
        }

        public int RunProcedure(string sProcName)
        {
            SqlCommand objCommand = funCreateCommand(Connect(), sProcName, null);
            objCommand.ExecuteNonQuery();
            this.funCloseConnection();
            return (int)objCommand.Parameters["ReturnValue"].Value;
        }

        public void RunProcedure(string sProcName, SqlParameter[] objaPrams, out DataTable objDataTable)
        {
            SqlCommand objCommand = new SqlCommand();
            objCommand = funCreateCommand(Connect(), sProcName, objaPrams);
            objDataTable = new DataTable();
            objDataTable.Load(objCommand.ExecuteReader(System.Data.CommandBehavior.CloseConnection));
        }

        public int RunProcedure(string sProcName, SqlParameter[] objaPrams)
        {
            SqlCommand objCommand = funCreateCommand(Connect(), sProcName, objaPrams);
            objCommand.ExecuteNonQuery();
            this.funCloseConnection();
            return (int)objCommand.Parameters["ReturnValue"].Value;
        }


        public void RunProcedure(string sProcName, out SqlDataReader objDataReader)
        {
            SqlCommand objCommand = funCreateCommand(Connect(), sProcName, null);
            objDataReader = objCommand.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
        }


        public void RunProcedure(string sProcName, SqlParameter[] objaPrams, out SqlDataReader objDataReader)
        {
            SqlCommand objCommand = funCreateCommand(Connect(), sProcName, objaPrams);
            objDataReader = objCommand.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
        }


        public void RunProcedure(string sProcName, SqlParameter[] objaPrams, out DataSet objDataSet)
        {
            SqlDataAdapter objDataAdapter = new SqlDataAdapter();
            SqlCommand objCommand = funCreateCommand(Connect(), sProcName, objaPrams);
            objDataAdapter.SelectCommand = objCommand;
            objDataSet = new DataSet();
            objDataAdapter.Fill(objDataSet);
            this.funCloseConnection();
        }

        public void RunProcedure(string sProcName, out DataSet objDataSet)
        {
            SqlDataAdapter objDataAdapter = new SqlDataAdapter();
            SqlCommand objCommand = funCreateCommand(Connect(), sProcName);
            objDataAdapter.SelectCommand = objCommand;
            objDataSet = new DataSet();
            objDataAdapter.Fill(objDataSet);
            this.funCloseConnection();
        }


        private SqlCommand funCreateCommand(SqlConnection Conn, string sProcName, SqlParameter[] objaPrams)
        {

            SqlCommand objCommand = new SqlCommand(sProcName, Conn);
            objCommand.CommandTimeout = Conn.ConnectionTimeout;
            objCommand.CommandType = CommandType.StoredProcedure;


            if (objaPrams != null)
            {
                foreach (SqlParameter objParameter in objaPrams)
                    objCommand.Parameters.Add(objParameter);
            }

            objCommand.Parameters.Add(new SqlParameter("ReturnValue", SqlDbType.Int, 4, ParameterDirection.ReturnValue, false, 0, 0, string.Empty, DataRowVersion.Default, null));

            return objCommand;
        }

        private SqlCommand funCreateCommand(SqlConnection Conn, string sProcName)
        {
            SqlCommand objCommand = new SqlCommand(sProcName, Conn);
            objCommand.CommandType = CommandType.StoredProcedure;
            return objCommand;
        }




        public void funCloseConnection()
        {
            if (Conn.State == ConnectionState.Open) Conn.Close();
            if (Conn != null)
            {
                Conn.Dispose();

                Conn = null;
            }

        }


        public void Dispose()
        {
            // make sure connection is closed
            if (Conn != null)
            {
                Conn.Dispose();
                Conn = null;
            }
        }


        public SqlParameter MakeOutParameter(string sParamName, SqlDbType objDbType, int iSize)
        {
            return MakeParameter(sParamName, objDbType, iSize, ParameterDirection.Output, null);
        }


        public SqlParameter MakeParameter(string sParamName, SqlDbType objDbType, Int32 iSize, ParameterDirection objDirection, object objValue)
        {
            SqlParameter objParameter;

            if (iSize > 0)
                objParameter = new SqlParameter(sParamName, objDbType, iSize);
            else
                objParameter = new SqlParameter(sParamName, objDbType);

            objParameter.Direction = objDirection;
            if (!(objDirection == ParameterDirection.Output && objValue == null))
                objParameter.Value = objValue;
            return objParameter;
        }


        public string GetCurrentPageName()
        {
            string sPath = System.Web.HttpContext.Current.Request.Url.AbsolutePath;
            System.IO.FileInfo oInfo = new System.IO.FileInfo(sPath);
            string sRet = oInfo.Name;
            return sRet;

        }

        public bool check_user_login()
        {
            try
            {
                string st1 = System.Web.HttpContext.Current.Session["user_id"].ToString();

            }
            catch (Exception)
            {
                System.Web.HttpContext.Current.Session["user_id"] = string.Empty;
            }
            if (System.Web.HttpContext.Current.Session["user_id"].ToString() != string.Empty)
            {
                //genuine login 
            }
            else
            {
                //invalid login
                System.Web.HttpContext.Current.Session["user_id"] = string.Empty;
                System.Web.HttpContext.Current.Session.Abandon();
                System.Web.HttpContext.Current.Session.Clear();
                System.Web.Security.FormsAuthentication.SignOut();
                System.Web.HttpContext.Current.Response.Cookies.Clear();
                System.Web.HttpContext.Current.Response.Redirect("message.aspx?msg_value=Invalid username or password.Please try again.....");

            }

            return true;
        }
        public bool mail(string subject, string body, string to, string bcc)
        {
            MailMessage mail = new MailMessage();
            try
            {

                if (object.Equals(smtp, null))
                {
                    smtp = new SmtpClient();
                }
                mail.From = new MailAddress("noreply@hindustanwellness.com", "Hindustan Wellness");
                string[] EmailSplit = to.Split(',');
                int k = EmailSplit.Length;
                for (int i = 0; i < k; i++)
                {
                    if (i == 0)
                    {
                        mail.To.Add(EmailSplit[i]);
                    }
                    else
                    {
                        if (EmailSplit[i] != "")
                        {
                            mail.CC.Add(EmailSplit[i]);
                        }
                    }
                }
                //if (bcc != "")
                //{
                //    mail.Bcc.Add(bcc);
                //}
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                mail.ReplyTo = (new MailAddress("noreply@hindustanwellness.com"));
                smtp.Host = "smtpout.secureserver.net";
                smtp.EnableSsl = false;
                smtp.Credentials = new System.Net.NetworkCredential("ankit.dixit@hindustanwellness.com", "Dixit1234!");
                try
                {
                    smtp.Send(mail);
                    mail.Dispose();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool mailwithattachment(string subject, string body, string to, string cc, string path)
        {
            if (to == "cfc1@perfectwebtech.in" || to == "cfc2@perfectwebtech.in" || to == "")
            {
                return false;
            }
            else
            {
                MailMessage mm = new MailMessage();
                try
                {
                    // MailMessage mm = new MailMessage("MCA-noreply@mcambala.gov.in", "MCA");
                    mm.From = new MailAddress("MCA-noreply@mcambala.gov.in", "MC-AMBALA");
                    mm.To.Add(to);
                    if (cc != "")
                    {
                        mm.CC.Add(cc);
                    }
                    else
                    {
                    }
                    mm.Subject = subject;
                    mm.Body = body;
                    mm.IsBodyHtml = true;
                    mm.Attachments.Add(new Attachment(path));
                    string replyto = "mcambala26@yahoo.com";
                    //  string replyto = "support@mcambala.gov.in";
                    mm.ReplyTo = new System.Net.Mail.MailAddress(replyto);
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "10.1.1.216";
                    smtp.EnableSsl = false;
                    System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 25;
                    try
                    {
                        smtp.Send(mm);
                        mm.Dispose();
                        return true;
                    }
                    catch (Exception ex)
                    {

                        return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
        public bool INB_Mail_HW(string subject, string body, string to, string bcc, string path)
        {
            MailMessage mail = new MailMessage();
            try
            {

                if (object.Equals(smtp, null))
                {
                    smtp = new SmtpClient();
                }
                mail.From = new MailAddress("noreply@hindustanwellness.com", "Hindustan Wellness");
                string[] EmailSplit = to.Split(',');
                int k = EmailSplit.Length;
                for (int i = 0; i < k; i++)
                {
                    if (i == 0)
                    {
                        mail.To.Add(EmailSplit[i]);
                    }
                    else
                    {
                        if (EmailSplit[i] != "")
                        {
                            mail.CC.Add(EmailSplit[i]);
                        }
                    }
                }
                //if (bcc != "")
                //{
                //    mail.Bcc.Add(bcc);
                //}
                mail.Bcc.Add("report.hindustanwellness@gmail.com");
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                mail.ReplyTo = (new MailAddress("customer.service@hindustanwellness.com"));
                if (path.ToString() != "")
                {
                    mail.Attachments.Add(new Attachment(path));
                }
                smtp.Host = "mail.smtp2go.com";
                smtp.EnableSsl = false;
                smtp.Credentials = new System.Net.NetworkCredential("noreply@hindustanwellness.com", "Y5DmHVaOA6Cg");
                //smtp.Host = "smtpout.secureserver.net";
                //smtp.EnableSsl = false;
                //smtp.Credentials = new System.Net.NetworkCredential("Sourabh.sharma@hindustanwellness.com", "Sharma1234!");
                try
                {
                    smtp.Send(mail);
                    mail.Dispose();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool mailwithoutattachment(string subject, string body, string to, string cc)
        {
            if (to == "cfc1@perfectwebtech.in" || to == "cfc2@perfectwebtech.in" || to == "")
            {
                return false;
            }
            else
            {
                MailMessage mm = new MailMessage();
                try
                {
                    // MailMessage mm = new MailMessage("MCA-noreply@mcambala.gov.in", "MCA");
                    mm.From = new MailAddress("MCA-noreply@mcambala.gov.in", "MC-AMBALA");
                    mm.To.Add(to);
                    if (cc != "")
                    {
                        mm.CC.Add(cc);
                    }
                    else
                    {
                    }
                    mm.Subject = subject;
                    mm.Body = body;
                    mm.IsBodyHtml = true;
                    string replyto = "mcambala26@yahoo.com";
                    //  string replyto = "support@mcambala.gov.in";
                    mm.ReplyTo = new System.Net.Mail.MailAddress(replyto);
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "10.1.1.216";
                    smtp.EnableSsl = false;
                    System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 25;
                    try
                    {
                        smtp.Send(mm);
                        mm.Dispose();
                        return true;
                    }
                    catch (Exception ex)
                    {

                        return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public DataSet GetReport(string QueryStr, DataSet ds)
        {
            Conn = Connect();
            SqlDataAdapter dap = new SqlDataAdapter(QueryStr, Conn);
            dap.Fill(ds);
            this.funCloseConnection();
            return ds;
        }

        private bool ColumnEqual(object A, object B)
        {

            // Compares two values to see if they are equal. Also compares DBNULL.Value.
            // Note: If your DataTable contains object fields, then you must extend this
            // function to handle them in a meaningful way if you intend to group on them.

            if (A == DBNull.Value && B == DBNull.Value) //  both are DBNull.Value
                return true;
            if (A == DBNull.Value || B == DBNull.Value) //  only one is DBNull.Value
                return false;
            return (A.Equals(B));  // value type standard comparison
        }

        public DataTable filter_ds(DataTable SourceTable, string fieldname)
        {
            DataTable dt1 = new DataTable();
            dt1 = SourceTable.Clone();
            object LastValue = null;
            foreach (DataRow dr in SourceTable.Select("", fieldname))
            {
                if (LastValue == null || !(ColumnEqual(LastValue, dr[fieldname])))
                {
                    LastValue = dr[fieldname];
                    dt1.Rows.Add(dr.ItemArray);
                }
            }
            return dt1;
        }

        public static String readHtmlPage(string url)
        {
            String result = "";
            String sResult = "";
            String strPost = "x=1&y=2&z=YouPostedOk";
            StreamWriter myWriter = null;
            HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);
            objRequest.Method = "POST";
            objRequest.ContentLength = strPost.Length;
            objRequest.ContentType = "application/x-www-form-urlencoded";
            try
            {
                myWriter = new StreamWriter(objRequest.GetRequestStream());
                myWriter.Write(strPost);
            }
            catch (Exception e)
            {
                sResult = "0";
                return sResult;
            }
            finally
            {
                myWriter.Close();
            }
            HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
            using (StreamReader sr =
            new StreamReader(objResponse.GetResponseStream()))
            {
                result = sr.ReadToEnd();
                sr.Close();
            }
            return result;
        }

        public string ShortURL(string LongURL)
        {
            string key = "AIzaSyBRu2IJHhMxJ2TqM1gGN1BNiaOc8UMdMRI";
            string URL = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.googleapis.com/urlshortener/v1/url?key=" + key);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{\"longUrl\":\"" + LongURL + "\"}";
                Console.WriteLine(json);
                streamWriter.Write(json);
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var responseText = streamReader.ReadToEnd();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                Dictionary<string, object> dict = jss.Deserialize<dynamic>(responseText);
                URL = dict["id"].ToString();
            }
            return URL;
        }
    }
}