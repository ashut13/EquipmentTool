using System;
using System.IO;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Text;

namespace Equipment_Planning.App_Code
{
    public class Utils
    {
        //24 byte or 192 bit key and IV for TripleDES
        //One nice thing is you control what these numbers are so it is totally random!
        private Byte[] KEY_192 = { 40, 50, 60, 89, 92, 6, 217, 30, 15, 16, 44, 60, 65, 25, 14, 12, 2, 14, 10, 20, 19, 9, 14, 17 };

        private Byte[] IV_192 = { 5, 13, 52, 4, 8, 1, 17, 3, 42, 5, 82, 83, 16, 7, 29, 13, 11, 3, 22, 8, 16, 10, 11, 25 };


        //TRIPLE DES encryption
        public string EncryptTripleDES(string value)
        {
            if (value != "")
            {
                TripleDESCryptoServiceProvider cryptoProvider = new TripleDESCryptoServiceProvider();
                MemoryStream ms = new MemoryStream();
                CryptoStream cs = new CryptoStream(ms, cryptoProvider.CreateEncryptor(KEY_192, IV_192), CryptoStreamMode.Write);
                StreamWriter sw = new StreamWriter(cs);
                sw.Write(value);
                sw.Flush();
                cs.FlushFinalBlock();
                ms.Flush();

                //'convert back to a string

                return System.Convert.ToBase64String(ms.GetBuffer(), 0, Convert.ToInt32(ms.Length));
            }
            else
            {
                return value;
            }
        }
        //TRIPLE DES decryption
        public string DecryptTripleDES(string value)
        {
            if ((value != "") && (value != null))
            {

                TripleDESCryptoServiceProvider cryptoProvider = new TripleDESCryptoServiceProvider();
                //convert from string to byte array
                Byte[] buffer = Convert.FromBase64String(value);
                MemoryStream ms = new MemoryStream(buffer);
                CryptoStream cs = new CryptoStream(ms, cryptoProvider.CreateDecryptor(KEY_192, IV_192), CryptoStreamMode.Read);
                StreamReader sr = new StreamReader(cs);

                return sr.ReadToEnd();
            }
            else
            {
                return value;
            }
        }
    }
}