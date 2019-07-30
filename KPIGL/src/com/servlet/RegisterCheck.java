package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.Aperator;
import com.util.NameUtil;
import com.util.Validata;

//import SOA.Util.Model.Xtcs;

@WebServlet("/http.do")
public class RegisterCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		
		PrintWriter out = null;
		try{
			Aperator CZY= null;
			String UserName = request.getParameter("username");
			String PassWord = request.getParameter("password");
//			String yzm = request.getParameter("yzm");
//			if(yzm==null||!yzm.equals(session.getAttribute("rand"))){
//				session.setAttribute("yzmbool", "0");
//				response.sendRedirect("Login/Login.jsp");
//				return;
//			}
			int ErrType = 101;
			if ((UserName != null) && (PassWord != null)) {
		        Validata validata = new Validata();
		        CZY = validata.Login(UserName, PassWord,NameUtil.SysNo);
		        ErrType = validata.getErrType();
		        switch(ErrType){
		        	case 100:
		        		if(CZY!=null){
		        			session.setAttribute("opr", CZY);
		        			session.setMaxInactiveInterval(-1);
		        			response.sendRedirect("Main.jsp");
		        		}else{
		        			response.sendRedirect("Login/Login.jsp");//密码错误
		        		}
		        		break;
		        	case 101:
		        		response.sendRedirect("Login/Login.jsp");//密码错误
		        		break;
		        	case 500:
		        		response.sendRedirect("Login/Login.jsp");//密码错误
		        		break;
		        }
		      }
		}catch(Exception e){
			response.sendRedirect("PubFrames/error/Error_noRegistFile.jsp");
		}finally {
			out = response.getWriter();
		    out.write("");
		    out.flush();
		    out.close();
		}
	}
}
