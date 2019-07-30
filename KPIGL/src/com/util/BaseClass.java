package com.util;

import com.model.Aperator;
import org.dom4j.Document;

public interface BaseClass {
	
	public String Execute(String OprType,Document inDom,Aperator opr) throws Exception;

}
