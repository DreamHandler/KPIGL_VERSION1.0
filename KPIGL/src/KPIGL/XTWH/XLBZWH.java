package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import SOA.Util.Model.xtcsDefList;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class XLBZWH extends Busy{
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
		String SQL="select * from LYJXKH..TBXLBZ with(nolock) where 1=1" + Where;
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 导入更新数据
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception 
	 */
	public String DataImport(Document inEle, Aperator inopr) throws Exception{
		Document doc = null;
		
		String dataLY = xtcsDefList.GetSysXtcs("000003", ""); //科室视图
		//保存已分配信息
		String SQL=" MERGE LYJXKH..TBXLBZ AS MBTABLE USING ("+dataLY+") AS YBTABLE (VNum,VName,VPYM)"
				+ " ON (MBTABLE.VNum = YBTABLE.VNum) WHEN MATCHED THEN "
				+ " UPDATE SET MBTABLE.VName=YBTABLE.VName,MBTABLE.VPYM=YBTABLE.VPYM "
				+ " WHEN NOT MATCHED THEN INSERT (VNum,VName,VPYM) VALUES (VNum,VName,VPYM);";
		try {
			doc = this.ServireSQL(BaseServire.SysModify,SQL,null,inopr);
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
//		String VName = Aele.attributeValue("VName");
		String IProjectType = Aele.attributeValue("IProjectType");
		String NNumber = Aele.attributeValue("NNumber");
		String NDifficulty = Aele.attributeValue("NDifficulty");
		String NRiskLevel = Aele.attributeValue("NRiskLevel");
		String Benable = Aele.attributeValue("Benable");
		String VRemarks = Aele.attributeValue("VRemarks");
		ArrayList<String> list = new ArrayList<String>();
//		list.add(VName);
//		list.add(VName);
		list.add(IProjectType);
		list.add("".equals(NNumber)?"0":NNumber);
		list.add("".equals(NDifficulty)?"0":NDifficulty);
		list.add("".equals(NRiskLevel)?"0":NRiskLevel);
		list.add(Benable);
		list.add(VRemarks);
		
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
//				xtcsDefList.GetXtcsByVno("");
				String VNum = Aele.attributeValue("VNum");
				list.add(VNum);
				SQL = "INSERT INTO LYJXKH..TBXLBZ (VName,VPYM,IProjectType,NNumber,NDifficulty,NRiskLevel"
						+ ",Benable,VRemarks,VNum)VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?,?,?,?)";
			}else if("2".equals(flag)){
				String VNum = Aele.attributeValue("VNum");
				list.add(VNum);
				SQL = "UPDATE LYJXKH..TBXLBZ SET IProjectType=?,NNumber=?,NDifficulty=?,NRiskLevel=?"
						+ ",Benable=?,VRemarks=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
