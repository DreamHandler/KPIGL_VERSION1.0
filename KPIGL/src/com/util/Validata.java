package com.util;

import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.Init.InitMenu;
import com.model.Aperator;
import com.model.TMenu;

import SOA.Port.DataService.IserviceImpl;



/**
 * 登录类
 * @author Administrator
 *
 */
public class Validata {
	public static IserviceImpl se = new IserviceImpl();
	private int ErrType = 101;
	public int getErrType(){
		return this.ErrType;
	}
	public Aperator Login(String UserName,String PassWord,String SysNo) throws Exception{
		/*BASE64Encoder encode = new BASE64Encoder();
		BASE64Decoder decode = new BASE64Decoder();*/
		Aperator CZY = null;
		Document document = null;
		document = DocumentHelper.createDocument();
		
		Element rsElement = document.addElement("xlm");
		Element data = rsElement.addElement("DATA");
		SysNo = SysNo+"|";
		
		/*//服务的具体类，继承了service类
		IserviceImplService  service=new IserviceImplService();
		//服务的接口，通过getPort()方法得到
		IserviceImplDelegate se=service.getPort(IserviceImplDelegate.class);
		*/
		data.addAttribute("UserName",UserName);
		data.addAttribute("SysNo",SysNo);
		String re = se.Login(document.asXML());
		if(re==null||"".equals(re)){
			this.ErrType = 500;
			throw new Exception("未获得返回值！");
		}
		Document doc = DocumentHelper.parseText(re);
		Element not = doc.getRootElement();
		Element ret = not.element("RES.2");
		if(ret!=null&&"0".equals(ret.getText())){
			Element retE = not.element("RES.3");
			this.ErrType = 500;
			if(retE!=null&&!"".equals(retE.getText())){
				throw new Exception(retE.getText());
			}else{
				throw new Exception("操作员未完成对应操作！");
			}
		}
		Element Files = not.element(NameUtil.Dom_Explains);
		Element Filev = not.element(NameUtil.Dom_Values).element(NameUtil.Dom_Value);
		if(Filev==null){
			this.ErrType = 101;
			return null;
		}
		String VPSWD = Filev.attributeValue("VPSWD");
		if(VPSWD==null||!VPSWD.equals(PassWord)){
			this.ErrType = 101;
			return null;
		}
		@SuppressWarnings("unchecked")
		List<Element> list = Files.elements(NameUtil.Dom_Explain);
		CZY = new Aperator();
		for(Element file : list){
			String ColName = file.attributeValue("ColName");
			String val = Filev.attributeValue(ColName);
			CZY.setAperator(ColName, val);
		}
		SetMenu(CZY);
		this.ErrType = 100;
		return CZY;
	}
	
	private void SetMenu(Aperator CZY) throws Exception{
		if(!TMenu.IsMeneNotNull()){
			if(!new InitMenu().Init()){
				throw new Exception("无法获得菜单信息！");
			}
		}
		List<Map<String,String>> menu = TMenu.getTMenu(NameUtil.SysNo, CZY.getAperator("VCDBM"));
		if(menu==null||menu.size()<1){
			throw new Exception("无法获得菜单信息！");
		}
		CZY.setMenu(menu);
		/*BASE64Encoder encode = new BASE64Encoder();
		BASE64Decoder decode = new BASE64Decoder();
		//服务的具体类，继承了service类
		IserviceImplService  service=new IserviceImplService();
		//服务的接口，通过getPort()方法得到
		IserviceImplDelegate se=service.getPort(IserviceImplDelegate.class);
		Document document = null;
		document = DocumentHelper.createDocument();
		Element czyjd = document.addElement("CZY");
		czyjd.addAttribute("UserName",CZY.getVuser());
		Element MSH = document.addElement("MSH");
		Element method = MSH.addElement("MSH.2");
		method.addText("quer");
		Element DATA = MSH.addElement("DATAS");
		String SQL = "";
		DATA.addAttribute("SQL", SQL);
		String re = new String(decode.decodeBuffer(se.excute(encode.encode(document.asXML().getBytes()))));
		if(re==null||"".equals(re)){
			this.ErrType = 500;
			throw new Exception("菜单未获得返回值！");
		}
		Document doc = DocumentHelper.parseText(re);
		Element not = doc.getRootElement();
		Element ret = not.element("RES.2");
		if(ret!=null&&"0".equals(ret.getText())){
			Element retE = not.element("RES.3");
			this.ErrType = 500;
			if(retE!=null&&!"".equals(retE.getText())){
				throw new Exception(retE.getText());
			}else{
				throw new Exception("未完成对应操作！");
			}
		}
		Element Files = not.element(NameUtil.Dom_Explains);
		Element Filev = not.element(NameUtil.Dom_Values);
		@SuppressWarnings("unchecked")
		List<Element> Filevlist = Filev.elements(NameUtil.Dom_Value);
		@SuppressWarnings("unchecked")
		List<Element> Filelist = Files.elements(NameUtil.Dom_Explain);
		if(Filevlist==null||Filevlist.size()<1||Filelist==null||Filelist.size()<1){
			this.ErrType = 500;
			throw new Exception("未配置相应菜单");
		}
		for(Element filev : Filevlist){
			TMenu menu = new TMenu();
			for(Element file : Filelist){
				String ColName = file.attributeValue("ColName");
				String val = filev.attributeValue("ColName");
				menu.setMenu(ColName, val);
			}
			CZY.setMenu(menu);
		}*/
	}
	
	
}
