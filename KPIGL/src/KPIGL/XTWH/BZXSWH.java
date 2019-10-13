package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import SOA.Util.Model.XtParam;
import SOA.Util.Model.xtcsDefList;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class BZXSWH extends Busy{
	/**
	 * 查询数据
	 * @param inEle
	 * @param inopr
	 * @return
	 */
	public String DataQryFZ(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String Where = "";
		Document doc = null;
		if(Aele.attributeValue("ValQry")!=null){
			Where += " and (VNum like '%"+Aele.attributeValue("ValQry")+"%' or VName like '%"+Aele.attributeValue("ValQry")+"%' or VPYM like '%"+Aele.attributeValue("ValQry")+"%')";
		}
		if(Aele.attributeValue("BENABLE")!=null){
			Where += " and BENABLE = "+Aele.attributeValue("BENABLE");
		}
		String SQL="select * from LYJXKH..TBBZFZ with(nolock) where 1=1" + Where;
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
	public String DataSaveFZ(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String flag = Aele.attributeValue("flag");
		String VName = Aele.attributeValue("VName_fz");
		String Benable = Aele.attributeValue("Benable_fz");
		String NGeneral = Aele.attributeValue("NGeneral_fz");
		String BUseGeneral = Aele.attributeValue("BUseGeneral_fz");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VName);
		list.add(VName);
		list.add(Benable);
		list.add("".equals(NGeneral)?"0.00":NGeneral);
		list.add(BUseGeneral);
		
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
				String VNum = XtParam.GetSysParameter("JXKH000003", 1);
				list.add(VNum);
				SQL = "INSERT INTO LYJXKH..TBBZFZ (VName,VPYM,Benable,NGeneral,BUseGeneral,VNum)"
						+ "VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?)";
			}else if("2".equals(flag)){
				String VNum = Aele.attributeValue("VNum_fz");
				list.add(VNum);
				SQL = "UPDATE LYJXKH..TBBZFZ SET VName=?,VPYM=BASEMENT.DBO.GetPY(?),Benable=?"
					+ ",NGeneral=?,BUseGeneral=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 查询已分组病种数据
	 * @param inEle
	 * @param inopr
	 * @return
	 */
	public String DataQry(Document inEle, Aperator inopr){
		String Where = "";
		Document doc = null;
		String SQL="select * from LYJXKH..TBBZXS with(nolock) where 1=1 AND ISNULL(VGroupNum,'')<>''" + Where;
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 查询未分组及当期组的病种数据
	 * @param inEle
	 * @param inopr
	 * @return
	 */
	public String QryWFZData(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String Where = "";
		Document doc = null;
		String VGroupNum = Aele.attributeValue("VGroupNum");
		if(Aele.attributeValue("ValQry")!=null){
			Where += " and (VNum like '%"+Aele.attributeValue("ValQry")+"%' or VName like '%"+Aele.attributeValue("ValQry")+"%' or VPYM like '%"+Aele.attributeValue("ValQry")+"%')";
		}
		if(Aele.attributeValue("BENABLE")!=null){
			Where += " and BENABLE = "+Aele.attributeValue("BENABLE");
		}
		String SQL="select * from LYJXKH..TBBZXS with(nolock) where 1=1 "
				+ "AND (ISNULL(VGroupNum,'')='' OR VGroupNum='"+VGroupNum+"')" + Where;
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 导入更新病种数据
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception 
	 */
	public String DataImport(Document inEle, Aperator inopr) throws Exception{
		Document doc = null;
		
		String dataLY = xtcsDefList.GetSysXtcs("000004", ""); //病种视图
		//保存已分配信息
		String SQL=" MERGE LYJXKH..TBBZXS  AS MBTABLE USING ("+dataLY+") AS YBTABLE (VNum,VName,VCODE10,VPYM)"
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
	 * 新增、修改病种数据
	 * @param inEle
	 * @param inopr
	 * @return
	 */
	public String DataSave(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String flag = Aele.attributeValue("flag");
		ArrayList<String> list = new ArrayList<String>();
		
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
				String VNums = Aele.attributeValue("VNums");
				String VGroupNum = Aele.attributeValue("VGroupNum");
				String NGeneral = Aele.attributeValue("NGeneral");
				//首先将选中病种的分组定义为当前分组
				SQL = " UPDATE LYJXKH..TBBZXS SET VGroupNum='"+VGroupNum
						+ "' WHERE VNum in ('"+VNums.replaceAll(",", "','")+"') "
						//将该分组中没有勾选的病种的分组标识去掉
						+ " UPDATE LYJXKH..TBBZXS SET VGroupNum=NULL WHERE VGroupNum='"+VGroupNum 
						+ "' AND VNum NOT in ('"+VNums.replaceAll(",", "','")+"') "
						//将该分组系数为0的都赋值为分组系数，系数不为0的保留
						+ "UPDATE LYJXKH..TBBZXS SET NDistribution="+NGeneral+" WHERE VGroupNum='"+VGroupNum 
						+ "' AND ISNULL(NDistribution,0.00)=0.00";
						
			}else if("2".equals(flag)){
				String VNum = Aele.attributeValue("VNum");
				String Benable = Aele.attributeValue("Benable");
				String NDistribution = Aele.attributeValue("NDistribution");
				String VRemarks = Aele.attributeValue("VRemarks");
				list.add(Benable);
				list.add(NDistribution);
				list.add(VRemarks);
				list.add(VNum);
				SQL = "UPDATE LYJXKH..TBBZXS SET Benable=?,NDistribution=?,VRemarks=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
