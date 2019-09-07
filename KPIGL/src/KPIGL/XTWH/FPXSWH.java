package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

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
	 * 导入更新数据
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception 
	 */
	public String DataImport(Document inEle, Aperator inopr) throws Exception{
		Document doc = null;
		
		String dataLY = xtcsDefList.GetSysXtcs("000001", ""); //部门视图
		//保存已分配信息
		String SQL=" MERGE LYJXKH..TBFPXS  AS MBTABLE USING ("+dataLY+") AS YBTABLE (VNum,VName,VPYM,VManagement)"
				+ " ON (MBTABLE.VNum = YBTABLE.VNum) WHEN MATCHED THEN "
				+ " UPDATE SET MBTABLE.VName=YBTABLE.VName,MBTABLE.VPYM=YBTABLE.VPYM"
				+ ",MBTABLE.VManagement=YBTABLE.VManagement"
				+ " WHEN NOT MATCHED THEN "
				+ " INSERT (VNum,VName,VPYM,VManagement) VALUES (VNum,VName,VPYM,VManagement);";
		try {
			doc = this.ServireSQL(BaseServire.SysModify,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 获取编码的插空数值
	 */
	public String GetVNum(Document inEle, Aperator inopr){
		Document doc = null;
		String SQL="SELECT STUFF((SELECT '|'+VNum FROM LYJXKH..TBFPXS WHERE VNum LIKE 'NEW%'"
				+ " ORDER BY VNum FOR XML PATH('')),1,1,'') AS VNum";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
			Element FieldValue = doc.getRootElement().element("FieldsValue").element("FieldValue");
			String VNumStr = FieldValue.attributeValue("VNum");
			int maxVNum = Integer.parseInt(VNumStr.substring(VNumStr.lastIndexOf("|")+4,VNumStr.length()));
			int nowVNum = 1;
			for(int i=1;i<=maxVNum;i++){
				nowVNum = i;
				if(!(VNumStr.indexOf(nowVNum+"|")>-1)){
					break;
				}
			}
			nowVNum = nowVNum==maxVNum?maxVNum+1:nowVNum;
			FieldValue.addAttribute("maxVNum", nowVNum<10?"0"+nowVNum:""+nowVNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(doc.asXML());
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
//		String VManagement = Aele.attributeValue("VManagement");
		String NDistribution = Aele.attributeValue("NDistribution");
		String Benable = Aele.attributeValue("Benable");
		ArrayList<String> list = new ArrayList<String>();
//		list.add(VName);
//		list.add(VName);
//		list.add(VManagement);
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
				SQL = "UPDATE LYJXKH..TBFPXS SET NDistribution=?"
						+ ",Benable=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
