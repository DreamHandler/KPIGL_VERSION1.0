package com.Init;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.model.TMenu;
import com.util.BaseServire;
import com.util.NameUtil;

public class InitMenu {

	public boolean Init(){
		try {
			Aperator opr = new Aperator();
			opr.setAperator("VUSER","gly");
			String SQL = "select * from BASEMENT..TBMENU WITH(NOLOCK) WHERE VXTBM='"+NameUtil.SysNo+"' ORDER BY IZH";
			BaseServire bs = new BaseServire();
			Document re = bs.ServireSQL(BaseServire.SysQuer,SQL,null,opr);
			Element root = re.getRootElement();
			Element FieldsValue = root.element("FieldsValue");
			Element Fields = root.element("Fields");
			@SuppressWarnings("unchecked")
			List<Element> FieldValue = FieldsValue.elements("FieldValue");
			@SuppressWarnings("unchecked")
			List<Element> Field = Fields.elements("Field");
			if(FieldValue == null || FieldValue.size()<1){
				return false;
			}else{
				for(Element FieldV : FieldValue){
					Map<String,String> menu= new HashMap<String, String>();
					for(Element Fie : Field){
						String col = Fie.attributeValue("ColName");
						String val = FieldV.attributeValue(col);
						menu.put(col,val==null?"":val);
					}
					TMenu.setMenu(menu);
				}
			}
		} catch (Exception e) {
			return false;
		}
		return true;
	}
}
