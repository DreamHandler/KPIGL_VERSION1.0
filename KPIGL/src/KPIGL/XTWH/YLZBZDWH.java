package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class YLZBZDWH extends Busy{
	/**
	 * 查询数据
	 * @param inEle
	 * @param inopr
	 * @return
	 */
	public String DataQry(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String Where = "";
		Document doc = null;
		if(Aele.attributeValue("ValQry")!=null){
			Where += " and (VNum like '%"+Aele.attributeValue("ValQry")+"%' or VName like '%"+Aele.attributeValue("ValQry")+"%' or VPYM like '%"+Aele.attributeValue("ValQry")+"%')";
		}
		if(Aele.attributeValue("BENABLE")!=null){
			Where += " and BENABLE = "+Aele.attributeValue("BENABLE");
		}
		String SQL="select * from LYJXKH..TBYLZBZD with(nolock) where 1=1" + Where;
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 新增、修改数据
	 * @param inEle
	 * @param inopr
	 * @return
	 */
	public String DataSave(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String flag = Aele.attributeValue("flag");
		String VName = Aele.attributeValue("VName");
		String Benable = Aele.attributeValue("Benable");
		String NMedicine = Aele.attributeValue("NMedicine");
		String NBasicMedicine = Aele.attributeValue("NBasicMedicine");
		String NMaterial = Aele.attributeValue("NMaterial");
		String VRemarks = Aele.attributeValue("VRemarks");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VName);
		list.add(VName);
		list.add(Benable);
		list.add(NMedicine);
		list.add(NBasicMedicine);
		list.add(NMaterial);
		list.add(VRemarks);
		
		String VNum = Aele.attributeValue("VNum");
		list.add(VNum);
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
				SQL = "INSERT INTO LYJXKH..TBYLZBZD (VName,VPYM,Benable,NMedicine,NBasicMedicine"
						+ ",NMaterial,VRemarks,VNum)VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?,?,?)";
			}else if("2".equals(flag)){
				SQL = "UPDATE LYJXKH..TBYLZBZD SET VName=?,VPYM=BASEMENT.DBO.GetPY(?),Benable=?"
						+ ",NMedicine=?,NBasicMedicine=?,NMaterial=?,VRemarks=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
