package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import SOA.Util.Model.XtParam;
import SOA.Util.Model.xtcsDefList;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class SSXSWH extends Busy{
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
		String SQL="select * from LYJXKH..TBSSXS with(nolock) where 1=1" + Where;
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
		
		String dataLY = xtcsDefList.GetSysXtcs("000005", ""); //手术视图
		//保存已分配信息
		String SQL=" MERGE LYJXKH..TBSSXS AS MBTABLE USING ("+dataLY+") AS YBTABLE (VNum,VName,VCODE10,VPYM)"
				+ " ON (MBTABLE.VNum = YBTABLE.VNum) WHEN MATCHED THEN "
				+ " UPDATE SET MBTABLE.VName=YBTABLE.VName,MBTABLE.VPYM=YBTABLE.VPYM,MBTABLE.VCODE10=YBTABLE.VCODE10 "
				+ " WHEN NOT MATCHED THEN INSERT (VNum,VName,VPYM,VCODE10) VALUES (VNum,VName,VPYM,VCODE10);";
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
		String Benable = Aele.attributeValue("Benable");
		String NDistribution = Aele.attributeValue("NDistribution");
		String VRemarks = Aele.attributeValue("VRemarks");
		ArrayList<String> list = new ArrayList<String>();
//		list.add(VName);
//		list.add(VName);
		list.add(Benable);
		list.add("".equals(NDistribution)?"0.00":NDistribution);
		list.add(VRemarks);
		
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
				String VNum = XtParam.GetSysParameter("JXKH000001", 1);
				list.add(VNum);
				SQL = "INSERT INTO LYJXKH..TBSSXS (VName,VPYM,VCODE10,Benable,NDistribution,VRemarks)"
						+ "VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?)";
			}else if("2".equals(flag)){
				String VNum = Aele.attributeValue("VNum");
				list.add(VNum);
				SQL = "UPDATE LYJXKH..TBSSXS SET Benable=?,NDistribution=?,VRemarks=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
