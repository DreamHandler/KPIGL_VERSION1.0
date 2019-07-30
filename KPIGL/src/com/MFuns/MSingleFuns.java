package com.MFuns;

import com.model.Aperator;
import com.util.Busy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class MSingleFuns extends Busy 
{
  private HashMap<Integer, Element> map = new HashMap<Integer, Element>();
  private String[] liColor = { "#82c077", "#fdae51", "#00aa55", "#ffaaa5", "#e380ae" };
  
  public String getFisrtMenu(Document inEle, Aperator inopr) {
	  List<Map<String,String>> sMenu = inopr.getMenu();
	  if ((sMenu == null) || (sMenu.size() == 0)) {
		  return "";
	  }
      Document doc = DocumentHelper.createDocument();
      doc.addElement("ul");
      Element ROOT = doc.getRootElement();
      ROOT.addAttribute("class", "nav nav-tabs padding-12 tab-color-blue background-blue");
      boolean first = true;
      for (int i = 0; i < sMenu.size(); i++) {
    	  Map<String,String> tmepm = sMenu.get(i);
    	  if ("1".equals(tmepm.get("IZH"))){
    		  Element LI = ROOT.addElement("li");
    		  LI.addAttribute("id", "first_menu"+tmepm.get("VNum"));
    		  if(first){
    			  LI.addAttribute("class", "active");
    			  first = false;
    		  }
    		  Element A = LI.addElement("a");
    		  A.addAttribute("aria-expanded", "false");
    		  A.addAttribute("onclick", "main.getSubMenu("+tmepm.get("IXH")+")");
    		  A.addAttribute("data-toggle", "tab");
    		  Element I = A.addElement("i");
    		  if((tmepm.get("VPIC") != null) && (!"".equals(tmepm.get("VPIC")))){
    			  I.addAttribute("class", "menu-icon "+tmepm.get("VPIC"));
    			  I.addAttribute("style", "color:" + liColor[(i % liColor.length)] + ";");
    		  }else{
    			  I.addAttribute("class", "menu-icon fa fa-pencil-square-o");
    			  I.addAttribute("style", "color:" + liColor[(i % liColor.length)] + ";");
    		  }
    		  I.setText("");
    		  
    		  Element Span = A.addElement("span");
	    	  Span.addAttribute("class", "menu-text");
	    	  Span.setText(tmepm.get("VName"));
    	  }
      }
	  return doc.getRootElement().asXML();
  }
  public String getMenu(Document inEle, Aperator inopr) { 
	  Element Aele = inEle.getRootElement().element("ASK");
	  String IXH = "2";
	  if(Aele.attributeValue("IXH")!=null){
		  IXH = Aele.attributeValue("IXH");
	  }
	  List<Map<String,String>> sMenu = inopr.getMenu();
	  if ((sMenu == null) || (sMenu.size() == 0)) {
		  return "";
	  }
      Document doc = DocumentHelper.createDocument();
      doc.addElement("ul");
      Element ROOT = doc.getRootElement();
      this.map.clear();
      this.map.put(Integer.valueOf(1), ROOT);
      ROOT.addAttribute("class", "nav nav-list");
      ROOT.addAttribute("id", "mainmenu");
      ROOT.addAttribute("patch", "");
      
      for (int i = 0; i < sMenu.size(); i++) {
    	  Map<String,String> tmepm = sMenu.get(i);
    	  //不为系统菜单第一节点
    	  if (!"0".equals(tmepm.get("IZH"))) {
              Element tempPrant = (Element)this.map.get(Integer.valueOf(tmepm.get("IZH")));
              if (!("ul").equals(tempPrant.getName())) {
            	  String temp = tempPrant.attributeValue("patch");
		          tempPrant.remove(tempPrant.attribute("patch"));
		          tempPrant = tempPrant.addElement("ul");
		          tempPrant.addAttribute("class", "submenu");
		          tempPrant.addAttribute("patch", temp);
		          this.map.put(Integer.valueOf(tmepm.get("IZH")), tempPrant);
		      }
		      Element LI = tempPrant.addElement("li");
		      LI.addAttribute("id", "menu"+tmepm.get("VNum"));
		      LI.addAttribute("IXH", tmepm.get("IXH"));
		      String patch = !"".equals(tempPrant.attributeValue("patch")) ? "," : "";
		      LI.addAttribute("patch", tempPrant.attributeValue("patch") + patch + tmepm.get("VName"));
		      if (i == 1)
		    	  LI.addAttribute("class", "active open");
		      else {
		    	  LI.addAttribute("class", "");
		      }
		      Element A = LI.addElement("a");
		      A.addAttribute("patch", tempPrant.attributeValue("patch") + patch + tmepm.get("VName"));
		      //
		      if ("1".equals(tmepm.get("IZH"))){
		    	  LI.addAttribute("class", "open");
		    	  Element IBQ = null;
		    	  IBQ = A.addElement("i");
		    	  //图片
		    	  if ((tmepm.get("VPIC") != null) && (!"".equals(tmepm.get("VPIC")))) {
		    		  IBQ.addAttribute("class", "menu-icon " + tmepm.get("VPIC"));
		    	  } else {
		    		  IBQ.addAttribute("class", "menu-icon fa fa-pencil-square-o");
		    	  }
		    	  IBQ.setText("");
		    	  IBQ.addAttribute("style", "color:" + liColor[(i % liColor.length)] + ";");

		    	  Element Span = A.addElement("span");
		    	  Span.addAttribute("class", "menu-text");
		    	  Span.setText(tmepm.get("VName"));

		    	  if ((tmepm.get("VSRC") != null) && (!"".equals(tmepm.get("VSRC")))) {
		    		  A.addAttribute("onclick", "main.goLocation(this);return false;");
		    		  A.addAttribute("href", tmepm.get("VSRC"));
		    	  }else {//如果没有配置连接
		    		  
		    	  }
		      } else {
		    	  Element IBQ = null;
		    	  IBQ = A.addElement("i");
		    	  //图片
		    	  if ((tmepm.get("VPIC") != null) && (!"".equals(tmepm.get("VPIC")))) {
		    		  IBQ.addAttribute("class", "menu-icon " + tmepm.get("VPIC"));
		    	  } else{
		    		  IBQ.addAttribute("class", "menu-icon fa fa-caret-right");
		    	  }
		    	  IBQ.addAttribute("style", "color:" + liColor[(i % liColor.length)] + ";");
		    	  IBQ.setText(" ");
		    	  A.setText(tmepm.get("VName"));
		    	  if ((tmepm.get("VSRC") != null) && (!"".equals(tmepm.get("VSRC")))) {
		    		  A.addAttribute("onclick", "main.goLocation(this);return false;");
		    		  A.addAttribute("href", tmepm.get("VSRC"));
		    	  }else {
		    		  A.addAttribute("class", "dropdown-toggle");
		    		  A.addAttribute("href", "#");
		    		  Element b = A.addElement("b");
		    		  b.addAttribute("class", "arrow fa fa-angle-down");
		    		  b.setText(" ");
		    	  }
		    	  
		      }
		      Element b = LI.addElement("b");
		      b.addAttribute("class", "arrow");
		      b.setText(" ");
		      this.map.put(Integer.valueOf(tmepm.get("IXH")), LI);
    	  }
      }
      setIframe(doc,IXH);
//      System.out.println(doc.getRootElement().asXML());
      return doc.getRootElement().asXML(); 
  }

  @SuppressWarnings("unchecked")
  private void setIframe(Document doc,String IXH){
//	  System.out.println(doc.asXML());
	  Element ROOT = doc.getRootElement();
	  List<Element> childs = ROOT.elements();
	  if (childs.size() == 0) {
		  return;
	  }
	  for (Element child : childs) {
		  if(IXH.equals(child.attributeValue("IXH"))){
			  Element ul = child.element("ul");
			  if (ul == null)
			  {
				  continue;
			  }
			  List<Element> li = ul.elements();
			  String height = String.valueOf(36 * li.size() + 5 + 1);
			  Element div = ul.addElement("div");
			  div.addAttribute("style", "height:100%;width:100%;position:absolute;left:3px;top:-1px;z-index:-1;");
			  Element iframe = div.addElement("iframe");
			  iframe.setText(" ");
			  iframe.addAttribute("style", "height:" + height + "px;width:100%;");
			  iframe.addAttribute("frameborder", "0");
		  }else{
			  ROOT.remove(child);
		  }
	  }
  }
}