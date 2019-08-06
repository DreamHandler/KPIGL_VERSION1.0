package com.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TMenu {
	private static List<Map<String,String>> menuDate = null;//菜单集合
	public static void setMenu(Map<String,String> menu){
		if(menuDate == null){
			menuDate = new ArrayList<Map<String,String>>();
		}
		menuDate.add(menu);
	}
	public static List<Map<String,String>> getMenu(){
		if(menuDate == null){
			menuDate = new ArrayList<Map<String,String>>();
		}
		return menuDate;
	}
	public static List<Map<String,String>> getTMenu(String SysNo,String VCDBM){
		if(SysNo==null||VCDBM==null||"".equals(VCDBM)||"".equals(SysNo)){
			return null;
		}
//		String[] VCDBMS = VCDBM.split("\\|");
//		for(String VCDB : VCDBMS){
//			String[] VCD = VCDB.split("\\=");
//			String NO = VCD[0];
//			String CD = VCD[1];
//			if(SysNo.equals(NO)){
				String[] CDS = VCDBM.split("\\|");
				List<Map<String,String>> list = new ArrayList<Map<String,String>>();
				for(String c : CDS){
					for(Map<String,String> menu : menuDate){
						String IXH = menu.get("VNum");
						if(IXH.equals(c)){
							list.add(menu);
							break;
						}
					}
				}
				return list;
//				if(list.size()>0){
//					return list;
//				}else{
//					return list;
//				}
//			}
//		}
//		return null;
		
	}
	public static boolean IsMeneNotNull(){
		if(menuDate==null||menuDate.size()<1){
			return false;
		}else{
			return true;
		}
	}
}
