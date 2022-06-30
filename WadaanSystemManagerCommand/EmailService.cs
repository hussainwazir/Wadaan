using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WadaanSystemManagerCommand
{
    public class EmailService
    {

        public void SendEmail(object senderName, object senderSubject, object senderEmail, object senderMessage)
        {
            try
            {
                // Thread.Sleep(10000);
                //var body = "<p><b>Email<b>: {0} ({1})</p><p></p><p>{2}</p>";
                var body = senderMessage.ToString() ;
                var body1 = "<div class='tab-panep-20' id='InActiveEmployee'role='tabpanel'><div class='col-sm-12'><div class='card-body'><div class='col-md-12'><div class='card'><div class='card-header'><h5>EMPLOYEE(S)</h5><span> In Active Employee's Record List</span></div><br /><div class='card-body'><div id='employee-grid-in-active'></div></div></div></div></div></div></div></div></div>";
                var body2 = "<div class='row'><img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGoogle_Images&psig=AOvVaw0RAOQIHmURUwDUjvJyu2s7&ust=1625649754948000&source=images&cd=vfe&ved=0CAcQjRxqFwoTCKjm-7OPzvECFQAAAAAdAAAAABAD' /><h1>Welcome To Wadaan </h1><br /><h2> it is testing Email </h2><br /><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>";
                var message = new MailMessage();
                message.To.Add(new MailAddress(senderEmail.ToString(), "XPM Client".ToString()));  // replace with valid value 
                message.From = new MailAddress("xtremessoft@gmail.com");                          // replace with valid value
                message.Subject = senderSubject.ToString();
                message.Body = string.Format(body, senderName, senderEmail, senderMessage);
                message.IsBodyHtml = true;
                using (var smtp = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = "xtremessoft@gmail.com",  // replace with valid value
                        Password = "Xtreme12345"             // replace with valid value
                    };
                    smtp.Credentials = credential;
                    //  smtp.Host = "smtp-mail.outlook.com";
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                     
                    smtp.EnableSsl = true;
                    smtp.Send(message);
                   
                }

            }
            catch (Exception ex)
            {

                 ex.ToString();
            }
        }

    }
}

