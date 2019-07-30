package com.util;

import java.lang.reflect.*;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

public class BeanUtil {

	/**
	 * 填充实体
	 * @param po
	 * @param request
	 * @throws Exception
	 */
	public static void fullBeanWithParams(Object po, HttpServletRequest request) throws Exception{
		if(po == null || request == null){
			return;
		}
		Field[] fields = po.getClass().getDeclaredFields();
		for(Field field : fields){
			String param = request.getParameter(field.getName());
			if(param != null && !param.isEmpty()){
				Object v = parse(param,field.getType().getSimpleName());
				field.setAccessible(true);
				field.set(po, v);
			}
		}
	}

	private static Object parse(String param, String type) throws Exception{
		if("Float".equals(type)){
			return param;
		}else if("Float".equals(type) || "float".equals(type)){
			return Float.parseFloat(param);
		}else if("Double".equals(type) || "double".equals(type)){
			return Double.parseDouble(param);
		}else if("Integer".equals(type) || "int".equals(type)){
			return Integer.parseInt(param);
		}else if("Date".equals(type)){
			return parse(param);
		}else{
			return param;
		}
	}

	private static Object parse(String param) throws Exception{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.parse(param);
	}
	
}
