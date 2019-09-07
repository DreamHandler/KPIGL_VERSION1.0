package Origin.Widget.EpBox;

import java.util.HashMap;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class EpBox extends Busy{
	private static HashMap<String, Document> EpBoxList = new HashMap<String,Document>();
	@SuppressWarnings("unchecked")
	public String QryData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String where = "";
		if(Aele.attributeValue("EpName")!=null){
			where += " and VDYMC = '"+Aele.attributeValue("EpName")+"'";
		}
		String SQL = "SELECT VDYMC,VVALUE,IXS,VZWBT,VZDMC,VLKD FROM BASEMENT..TBEPBOX WITH(NOLOCK) WHERE BTATUS = 1 "+where;
		Document doc = null;
		Document document = null;
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
			List<Element> RootEles = doc.getRootElement().element("FieldsValue").elements();
			if(RootEles.size()>0){
				//获取ep对象集
				TEpDef def = EpBox.ReadData(RootEles.get(0));
				//重新构建xml
				document = DocumentHelper.createDocument();
				Element rsElement = document.addElement("xml");
				Element fields = rsElement.addElement("Fields");
				String [] Name = def.getVZWBT().split("\\|");
				String [] ColWidth = def.getVLKD().split("\\|");
				String [] ColName = def.getVZDMC().split("\\|");
				for (int i = 0; i < Name.length; i++) {
					Element field = fields.addElement("Field");
					field.addAttribute("name", Name[i]);
					field.addAttribute("width",i<=ColWidth.length?ColWidth[i]:"100");
					field.addAttribute("ColName",ColName[i]);
				}
				//获取ep查询信息
				Document docs = this.ServireSQL(BaseServire.SysQuer,def.getVVALUE(),null,inopr);
				Element Rows = rsElement.addElement("Rows");
				//解析ep中SQL查询结果
				List<Element> docsRootEles = docs.getRootElement().element("FieldsValue").elements();
				for(int j=0;j<docsRootEles.size();j++){
					Element Row = Rows.addElement("Row");
					for (int i = 0; i < ColName.length; i++) {
						String zdmc = ColName[i].toString();
						String val = docsRootEles.get(j).attributeValue(zdmc) == null?"":docsRootEles.get(j).attributeValue(zdmc);
						Row.addAttribute(zdmc, val);
					}
				}
				EpBoxList.put(CheckString(RootEles.get(0),"VDYMC"), document);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(document.asXML());
		return document.asXML();
	}
	/**
	 * 加载字典表数据
	 * @throws Exception 
	 */
	private static TEpDef ReadData(Element RootEle) throws Exception {
		TEpDef EpDef = new TEpDef();
		EpDef.setVDYMC(CheckString(RootEle, "VDYMC"));
		EpDef.setVLKD(CheckString(RootEle, "VLKD"));
		EpDef.setVVALUE(CheckString(RootEle, "VVALUE"));
		EpDef.setVZDMC(CheckString(RootEle, "VZDMC"));
		EpDef.setVZWBT(CheckString(RootEle, "VZWBT"));
		EpDef.setIXS(CheckInt(RootEle,"IXS"));
		return EpDef;
	}
	//转化为字符串
	protected static String CheckString(Element rs,String FileName) throws Exception{
		String value = rs.attributeValue(FileName);
		return ((value == null) || "null".equals(value))? "": value;
	}
	//转化为int型
	protected static int CheckInt(Element rs,String FileName) throws Exception{
		String value = rs.attributeValue(FileName);
		value = ((value == null) || "null".equals(value))? "0": value;
		int ret = Integer.parseInt(value.substring(0,value.indexOf(".")));
		return ret;
	}
}
