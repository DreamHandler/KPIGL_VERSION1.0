package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import SOA.Util.Model.Xtcs;
import SOA.Util.Model.xtcsDefList;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class FPXSWH extends Busy{
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
		String SQL="select * from LYJXKH..TBFPXS with(nolock) where 1=1" + Where;
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
		String VManagement = Aele.attributeValue("VManagement");
		String NDistribution = Aele.attributeValue("NDistribution");
		String Benable = Aele.attributeValue("Benable");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VName);
		list.add(VName);
		list.add(VManagement);
		list.add(NDistribution);
		list.add(Benable);
		
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
//				xtcsDefList.GetXtcsByVno("");
				String VNum = Aele.attributeValue("VNum");
				list.add(VNum);
				SQL = "INSERT INTO LYJXKH..TBFPXS (VName,VPYM,VManagement,NDistribution,Benable,VNum)"
						+ " VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?)";
			}else if("2".equals(flag)){
				String VNum = Aele.attributeValue("VNum");
				list.add(VNum);
				SQL = "UPDATE LYJXKH..TBFPXS SET VName=?,VPYM=BASEMENT.DBO.GetPY(?),VManagement=?,NDistribution=?"
						+ ",Benable=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
