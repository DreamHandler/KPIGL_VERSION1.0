package servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.Aperator;

import sun.misc.BASE64Encoder;
import utils.CommonXLS;

@SuppressWarnings("serial")
@WebServlet("/createExcle")
public class CreateExcle extends HttpServlet{
	@SuppressWarnings("rawtypes")
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 ByteArrayOutputStream boas=null;
		 HttpSession session = request.getSession();
		 Aperator CZY= (Aperator)session.getAttribute("opr");
		 String stat = (String)request.getParameter("stat");
		 String fileName = "";
		 String adName = "";
		 if("1".equals(stat)){
			 fileName = "原药库管理";
			 adName="utils.CWB_xls";
		 }else if("2".equals(stat)){
			 fileName = "中间库管理";
			 adName="utils.ZJK_xls";
		 }else if("3".equals(stat)){
			 fileName = "成品库管理";
			 adName="utils.CPK_xls";
		 }
		 
		try {
			Class clazz = Class.forName(adName);
			CommonXLS commonXLS = (CommonXLS) clazz.newInstance();
			boas = commonXLS.createExcle(CZY,request);
			download(boas,request,response,fileName+".xls");
//			System.out.println("下载完成..............");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private void download(ByteArrayOutputStream byteArrayOutputStream,
			HttpServletRequest request, HttpServletResponse response,
			String returnName ) throws Exception {
		response.setContentType("application/octet-stream;charset=utf-8");
		String agent = request.getHeader("user-agent");
		returnName = encodeDownloadFilename(returnName,agent);
		
		response.addHeader("Content-Disposition",   "attachment;filename=" + returnName);  
		response.setContentLength(byteArrayOutputStream.size());
		
		ServletOutputStream outputstream = response.getOutputStream();	//取得输出流
		byteArrayOutputStream.writeTo(outputstream);					//写到输出流
		byteArrayOutputStream.close();									//关闭
		outputstream.flush();
		
	}
	private String encodeDownloadFilename(String filename, String agent) throws UnsupportedEncodingException {
		if(agent.contains("Firefox")){ // 火狐浏览器
			filename = "=?UTF-8?B?"+new BASE64Encoder().encode(filename.getBytes("utf-8"))+"?=";
		}else{ // IE及其他浏览器
			filename = URLEncoder.encode(filename,"utf-8");
		}
		return filename;
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}
