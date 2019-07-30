package com.Init;

public class DefReStr {
	public static final String RtnStrSaveSuccess(){
		StringBuffer buffer = new StringBuffer();
		buffer.append("<?xml version='1.0' encoding='GB2312'?>");
		buffer.append("<RES>");
		buffer.append("<RESSUCESS>1</RESSUCESS>");
		buffer.append("</RES>");
		return buffer.toString();
	}
	public static final String RtnStrFail(){
		StringBuffer buffer = new StringBuffer();
		buffer.append("<?xml version='1.0' encoding='GB2312'?>");
		buffer.append("<RES>");
		buffer.append("<RESFAIL>0</RESFAIL>");
		buffer.append("</RES>");
		return buffer.toString();
	}
	public static final String ReStrValue(String Str){
		StringBuffer buffer = new StringBuffer();
		buffer.append("<?xml version='1.0' encoding='GB2312'?>");
		buffer.append("<RES>");
		buffer.append("<RESRTN>"+Str+"</RESRTN>");
		buffer.append("</RES>");
		return buffer.toString();
	}
}
