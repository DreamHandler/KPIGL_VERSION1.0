package com.util;

import java.lang.reflect.Method;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;

public class Busy extends BaseServire implements BaseClass{

	public String Execute(String OprType, Document inEle, Aperator opr) throws Exception {
			Method method = this.getClass().getMethod(OprType, new Class[]{Document.class,Aperator.class});
			return (String) method.invoke(this, inEle, opr);
		
	}
}
