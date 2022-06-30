using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WadaanSystemManagerCommand
{
  
        public class Utilities
        {
            public static DateTime? DateFormatter(string stringDate)
            {
                DateTime? _date = null;
                if (stringDate != "") { _date = DateTime.ParseExact(stringDate, "dd/M/yyyy", System.Globalization.CultureInfo.InvariantCulture); }

                return _date;
            }

            public static string DateDeFormatter(string stringDate)
            {
                if (stringDate == "")
                {
                    return "";
                }
                DateTime _date;
                DateTime.TryParse(stringDate.ToString(), out _date);
                return _date.ToString("dd/M/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            }


            public static T parseEnum<T>(string value)
            {
                return (T)Enum.Parse(typeof(T), value, true);
            }


            //public static DataTable ConvertCsvData(string CSVdata)
            //{
            //    // Convert a tab-separated set of data into a DataTable
            //    // to turn into an Excel file.
            //    DataTable dt = new DataTable();
            //    try
            //    {
            //        System.Diagnostics.Trace.WriteLine(CSVdata);
            //        string[] Lines = CSVdata.Split(new char[] { ControlChars.Cr, ControlChars.Lf });
            //        if (Lines == null)
            //            return dt;
            //        if (Lines.GetLength(0) == 0)
            //            return dt;
            //        string[] HeaderText = Lines[0].Split(ControlChars.Tab);
            //        int numOfColumns = HeaderText.Count();
            //        foreach (string header in HeaderText)
            //            dt.Columns.Add(header, typeof(string));
            //        DataRow Row;
            //        for (int i = 1; i <= Lines.GetLength(0) - 1; i++)
            //        {
            //            string[] Fields = Lines[i].Split(ControlChars.Tab);
            //            if (Fields.GetLength(0) == numOfColumns)
            //            {
            //                Row = dt.NewRow();
            //                for (int f = 0; f <= numOfColumns - 1; f++)
            //                    Row[f] = Fields[f];
            //                dt.Rows.Add(Row);
            //            }
            //        }
            //        return dt;
            //    }
            //    catch (Exception ex)
            //    {
            //        System.Diagnostics.Trace.WriteLine("An exception occurred: " + ex.Message);
            //        return null/* TODO Change to default(_) if this is not a reference type */;
            //    }
            //}

            //public static string ConvertTable2Excel(DataTable dt, string lang = "en-US")
            //{
            //    HSSFWorkbook hssfworkbook = new HSSFWorkbook();
            //    string strFileName = string.Empty;
            //    int SheetCount = 0;
            //    string value = string.Empty;
            //    int rowindex = 0;
            //    HSSFRow row;
            //    DataRow dr;

            //    HSSFSheet Sheet1 = null/* TODO Change to default(_) if this is not a reference type */;

            //    // ---- Create Header Style
            //    HSSFFont font = (HSSFFont)hssfworkbook.CreateFont();
            //    font.FontHeightInPoints = 10;
            //    font.Boldweight = (short)FontBoldWeight.BOLD;
            //    font.FontName = "Verdana";

            //    HSSFFont font1 = (HSSFFont)hssfworkbook.CreateFont();
            //    font1.FontHeightInPoints = 10;
            //    font1.FontName = "Verdana";

            //    HSSFCellStyle HeaderStyle = (HSSFCellStyle)hssfworkbook.CreateCellStyle();
            //    HeaderStyle.FillForegroundColor = NPOI.HSSF.Util.HSSFColor.GREY_25_PERCENT.index;
            //    HeaderStyle.FillPattern = FillPatternType.SOLID_FOREGROUND;
            //    HeaderStyle.BorderBottom = CellBorderType.THIN;
            //    HeaderStyle.BorderLeft = CellBorderType.THIN;
            //    HeaderStyle.BorderRight = CellBorderType.THIN;
            //    HeaderStyle.BorderTop = CellBorderType.THIN;
            //    HeaderStyle.WrapText = true;
            //    HeaderStyle.Alignment = HorizontalAlignment.CENTER;
            //    HeaderStyle.SetFont(font);

            //    HSSFCellStyle CellStyle = (HSSFCellStyle)hssfworkbook.CreateCellStyle();
            //    CellStyle.BorderBottom = CellBorderType.THIN;
            //    CellStyle.BorderLeft = CellBorderType.THIN;
            //    CellStyle.BorderRight = CellBorderType.THIN;
            //    CellStyle.BorderTop = CellBorderType.THIN;
            //    CellStyle.WrapText = true;
            //    CellStyle.Alignment = HorizontalAlignment.CENTER;
            //    CellStyle.SetFont(font1);
            //    // ------------

            //    int colcount = dt.Columns.Count - 1;
            //    int rowcount = dt.Rows.Count - 1;

            //    Sheet1 = (HSSFSheet)hssfworkbook.CreateSheet("Sheet1");
            //    row = (HSSFRow)Sheet1.CreateRow(rowindex);

            //    if (dt.Rows.Count > 0)
            //    {
            //        // --- Print the Headers
            //        for (var i = 0; i <= colcount; i++)
            //        {
            //            value = dt.Columns[i].ToString();
            //            row.CreateCell(i).SetCellValue(value);
            //            row.GetCell(i).CellStyle = HeaderStyle;
            //        }
            //        rowindex += 1;

            //        // ----- Print the data
            //        for (var i = 0; i <= rowcount; i++)
            //        {
            //            row = (HSSFRow)Sheet1.CreateRow(rowindex);
            //            dr = dt.Rows[i];
            //            for (var j = 0; j <= colcount; j++)
            //            {
            //                value = dr[dt.Columns[j]].ToString();
            //                row.CreateCell(j).SetCellValue(value);
            //                row.GetCell(j).CellStyle = CellStyle;
            //            }
            //            rowindex += 1;
            //        }
            //    }
            //    else
            //        row.CreateCell(0).SetCellValue("No Data to Display");

            //    // ---- Sheet Setup
            //    Sheet1.DisplayGridlines = true;
            //    for (var i = 0; i <= colcount; i++)
            //    {
            //        Sheet1.AutoSizeColumn(i);
            //        Sheet1.DisplayRowColHeadings = true;
            //    }
            //    if (lang == "ar-AE")
            //        Sheet1.IsArabic = true;
            //    // --------------------
            //    // hssfworkbook.GetSheetAt(hssfworkbook.ActiveSheetIndex).defaultSheetDirection = xlLTR

            //    strFileName = Path.GetTempFileName();
            //    if (System.IO.File.Exists(strFileName))
            //        System.IO.File.Delete(strFileName);


            //    FileStream ExcelFile = new FileStream(strFileName, FileMode.Create);
            //    hssfworkbook.Write(ExcelFile);
            //    ExcelFile.Close();
            //    hssfworkbook.Dispose();

            //    return strFileName;
            //}

           
            //public static byte[] exportpdf(DataTable dt, string title)
            //{

            //    // creating document object  
            //    System.IO.MemoryStream ms = new System.IO.MemoryStream();
            //    iTextSharp.text.Rectangle rec = new iTextSharp.text.Rectangle(PageSize.A4);
            //    rec.BackgroundColor = new BaseColor(System.Drawing.Color.Olive);
            //    Document doc = new Document(rec);
            //    doc.SetPageSize(iTextSharp.text.PageSize.A4);
            //    PdfWriter writer = PdfWriter.GetInstance(doc, ms);
            //    doc.Open();

            //    //Creating paragraph for header  
            //    BaseFont bfntHead = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            //    iTextSharp.text.Font fntHead = new iTextSharp.text.Font(bfntHead, 16, 1, iTextSharp.text.BaseColor.BLUE);
            //    Paragraph prgHeading = new Paragraph();
            //    prgHeading.Alignment = Element.ALIGN_LEFT;
            //    prgHeading.Add(new Chunk(title, fntHead));
            //    doc.Add(prgHeading);

            //    //Adding paragraph for report generated by  
            //    Paragraph prgGeneratedBY = new Paragraph();
            //    // BaseFont btnAuthor = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            //    BaseFont btnAuthor = BaseFont.CreateFont(Environment.GetEnvironmentVariable("windir") + @"\fonts\Arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            //    iTextSharp.text.Font fntAuthor = new iTextSharp.text.Font(btnAuthor, 8, 2, iTextSharp.text.BaseColor.BLUE);
            //    iTextSharp.text.Font fntHeader = new iTextSharp.text.Font(btnAuthor, 8, 2, iTextSharp.text.BaseColor.WHITE);
            //    iTextSharp.text.Font fntBody = new iTextSharp.text.Font(btnAuthor, 8, 2, iTextSharp.text.BaseColor.BLACK);

            //    prgGeneratedBY.Alignment = Element.ALIGN_RIGHT;
            //    //prgGeneratedBY.Add(new Chunk("Report Generated by : ASPArticles", fntAuthor));  
            //    //prgGeneratedBY.Add(new Chunk("\nGenerated Date : " + DateTime.Now.ToShortDateString(), fntAuthor));  
            //    doc.Add(prgGeneratedBY);

            //    //Adding a line  
            //    Paragraph p = new Paragraph(new Chunk(new iTextSharp.text.pdf.draw.LineSeparator(0.0F, 100.0F, iTextSharp.text.BaseColor.BLACK, Element.ALIGN_LEFT, 1)));
            //    doc.Add(p);

            //    //Adding line break  
            //    doc.Add(new Chunk("\n", fntHead));

            //    //Adding  PdfPTable  
            //    PdfPTable table = new PdfPTable(dt.Columns.Count);

            //    for (int i = dt.Columns.Count - 1; i >= 0; i--)
            //    {
            //        string cellText = HttpUtility.HtmlDecode(dt.Columns[i].ColumnName);
            //        PdfPCell cell = new PdfPCell();
            //        //cell.Phrase = new Phrase(cellText, new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.TIMES_ROMAN, 10, 1, new BaseColor(System.Drawing.ColorTranslator.FromHtml("#000000"))));
            //        cell.Phrase = new Phrase(cellText, fntHeader);
            //        cell.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#800000"));

            //        //cell.Phrase = new Phrase(cellText, new Font(Font.FontFamily.TIMES_ROMAN, 10, 1, new BaseColor(grdStudent.HeaderStyle.ForeColor)));  
            //        //cell.BackgroundColor = new BaseColor(grdStudent.HeaderStyle.BackColor);  
            //        cell.HorizontalAlignment = Element.ALIGN_CENTER;
            //        cell.RunDirection = PdfWriter.RUN_DIRECTION_RTL;
            //        cell.PaddingBottom = 5;
            //        table.AddCell(cell);
            //    }

            //    // _font.Color = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#000000"));
            //    //writing table Data  
            //    for (int i = 0; i < dt.Rows.Count; i++)
            //    {
            //        for (int j = dt.Columns.Count - 1; j >= 0; j--)
            //        {
            //            string cellText = HttpUtility.HtmlDecode(dt.Rows[i][j].ToString());
            //            PdfPCell cell = new PdfPCell();
            //            if (cellText == "null" || cellText == "1/1/1970") { cellText = ""; }
            //            cell.Phrase = new Phrase(cellText, fntBody);
            //            if (i % 2 != 0)
            //            { cell.BackgroundColor = new BaseColor(217, 217, 217); }
            //            cell.HorizontalAlignment = Element.ALIGN_CENTER;
            //            cell.RunDirection = PdfWriter.RUN_DIRECTION_RTL;
            //            table.AddCell(cell);
            //        }
            //    }

            //    doc.Add(table);
            //    doc.Close();

            //    byte[] result = ms.ToArray();
            //    return result;

            //}



        }

    }

