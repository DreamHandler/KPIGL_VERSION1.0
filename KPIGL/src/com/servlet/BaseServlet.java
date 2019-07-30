package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.model.Aperator;
import com.util.BaseClass;
import com.util.NameUtil;


/**
 * 通用后台调用接口
 * @author Administrator
 * <xml>
 * 	<MSH>
 * 		<MSH.1>类名</MSH.1>
 * 		<MSH.2>类名<MSH.2>
 * 	</MSH>
 * 	<DATAS>
 * 		<DATA 名称=值>
 * 	</DATAS>
 * </xml>
 */
@WebServlet("/http.dos")
public class BaseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = null;
		Document inDom = null;
		String ret = "";
		try {
			SAXReader reader  = new SAXReader();
			inDom = reader.read(request.getInputStream());
			if(inDom == null){
				throw new Exception("传入的值错误：未获得该值，或格式不正确");
			}
			//获得Session
			HttpSession  Session = request.getSession();
			//获得操作员对象
			Aperator apr = (Aperator)Session.getAttribute("opr");
			if(apr == null){
				throw new Exception("未检测到登录信息"); 
			}
			Element root = inDom.getRootElement();
			Element MSH= root.element("MSH");
			Element classEle = MSH.element("MSH.1");
			Element methodELe = MSH.element("MSH.2");
			if(classEle == null||methodELe == null){
				throw new Exception("未传入调用方法节点");
			}
			String clas = classEle.getText();
			String methods = methodELe.getText();
			if(clas == null||"".equals(clas)||methods==null||"".equals(methods)){
				throw new Exception("未传入调用方法");
			}
			BaseClass baseClass = (BaseClass)Class.forName(clas).newInstance();
			ret = baseClass.Execute(methods, inDom, apr);
		} catch (Exception e) {
			e.printStackTrace();
			ret = NameUtil.RtnExcFail(e);
		}finally {
			out = response.getWriter();
		    out.write(ret);
		    out.flush();
		    out.close();
		}
	}
}
