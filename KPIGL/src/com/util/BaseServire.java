package com.util;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.model.Aperator;

import SOA.Port.DataService.IserviceImpl;


public class BaseServire {
	public static final String SysQuer = "quer"; 
	public static final String SysModify = "modify"; 
	public static IserviceImpl se = new IserviceImpl();
	/*private BASE64Encoder encode = new BASE64Encoder();
	private BASE64Decoder decode = new BASE64Decoder();*/
	/*IserviceImplDelegate se = null;
	IserviceImplService  service = null;*/
	/*{
		//服务的具体类，继承了service类
		service=new IserviceImplService();
		//服务的接口，通过getPort()方法得到
		se=service.getPort(IserviceImplDelegate.class);
	}*/

	public Document ServireSQL(String type,String SQL ,ArrayList<String> list,Aperator opr) throws Exception{
		 Document document = null;
		document = DocumentHelper.createDocument();
		Element xml = document.addElement("xml");
		Element czyjd = xml.addElement("CZY");
		czyjd.addAttribute("UserName",opr.getVuser());
		Element MSH = xml.addElement("MSH");
		Element method = MSH.addElement("MSH.2");
		method.addText(type);
		Element DATA = MSH.addElement("DATAS");
		DATA.addAttribute("SQL", SQL);
		if(list!=null&&list.size()>0){
			for(String val : list){
				Element DATAS = DATA.addElement("DATA");
				DATAS.addAttribute("Value",val);
			}
		}
		String re = se.Excute(document.asXML());
		if(re == null||"".equals(re)){
			throw new Exception("未完成对应操作！SQL:"+SQL);
		}
		Document doc = DocumentHelper.parseText(re);
		Element not = doc.getRootElement();
		Element ret = not.element("RES.2");
		if(ret!=null&&"0".equals(ret.getText())){
			Element retE = not.element("RES.3");
			if(retE!=null&&!"".equals(retE.getText())){
				throw new Exception(retE.getText());
			}else{
				throw new Exception("未完成对应操作！SQL:"+SQL);
			}
		}
		return doc;
	 }
}
