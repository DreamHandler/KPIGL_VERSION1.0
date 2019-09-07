package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import SOA.Util.Model.XtParam;
import SOA.Util.Model.xtcsDefList;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class SFXMWH extends Busy{
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
		String SQL="select * from LYJXKH..TBSFXM with(nolock) where 1=1" + Where;
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
		
		String dataLY = xtcsDefList.GetSysXtcs("000002", ""); //收费项目视图
		//保存已分配信息
		String SQL=" MERGE LYJXKH..TBSFXM  AS MBTABLE USING ("+dataLY+") AS YBTABLE (VNum,VName,VPYM)"
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
		String IItemType = Aele.attributeValue("IItemType");
		String IProjectType = Aele.attributeValue("IProjectType");
		String Benable = Aele.attributeValue("Benable");
		String NOutDoc = Aele.attributeValue("NOutDoc");
		String NClinician = Aele.attributeValue("NClinician");
		String NAnesthetist = Aele.attributeValue("NAnesthetist");
		String NInspection = Aele.attributeValue("NInspection");
		String NWardNurses = Aele.attributeValue("NWardNurses");
		String NWardRoomNurse = Aele.attributeValue("NWardRoomNurse");
		String NOutRoomNurse = Aele.attributeValue("NOutRoomNurse");
		String NExcimerNurse = Aele.attributeValue("NExcimerNurse");
		String NBeautyCentre = Aele.attributeValue("NBeautyCentre");
		ArrayList<String> list = new ArrayList<String>();
//		list.add(VName);
//		list.add(VName);
		list.add(IItemType);
		list.add(IProjectType);
		list.add(Benable);
		list.add("".equals(NOutDoc)?"0.00":NOutDoc);
		list.add("".equals(NClinician)?"0.00":NClinician);
		list.add("".equals(NAnesthetist)?"0.00":NAnesthetist);
		list.add("".equals(NInspection)?"0.00":NInspection);
		list.add("".equals(NWardNurses)?"0.00":NWardNurses);
		list.add("".equals(NWardRoomNurse)?"0.00":NWardRoomNurse);
		list.add("".equals(NOutRoomNurse)?"0.00":NOutRoomNurse);
		list.add("".equals(NExcimerNurse)?"0.00":NExcimerNurse);
		list.add("".equals(NBeautyCentre)?"0.00":NBeautyCentre);
		
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
				String VNum = XtParam.GetSysParameter("JXKH000001", 1);
				list.add(VNum);
				SQL = "INSERT INTO LYJXKH..TBSFXM (VName,VPYM,IItemType,IProjectType,Benable,NOutDoc,NClinician"
						+ ",NAnesthetist,NInspection,NWardNurses,NWardRoomNurse,NOutRoomNurse,NExcimerNurse"
						+ ",NBeautyCentre,VNum)VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?,?,?,?,?,?,?,?,?,?)";
			}else if("2".equals(flag)){
				String VNum = Aele.attributeValue("VNum");
				list.add(VNum);
				SQL = "UPDATE LYJXKH..TBSFXM SET IItemType=?,IProjectType=?"
						+ ",Benable=?,NOutDoc=?,NClinician=?,NAnesthetist=?,NInspection=?,NWardNurses=?"
						+ ",NWardRoomNurse=?,NOutRoomNurse=?,NExcimerNurse=?,NBeautyCentre=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
