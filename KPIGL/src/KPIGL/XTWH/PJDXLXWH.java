package KPIGL.XTWH;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class PJDXLXWH extends Busy{
	public String DataQry(Document inEle, Aperator inopr){
		Document doc = null;
		String SQL="select *from LYJXKH..TBPJDXLX with(nolock) where 1=1";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
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
		String SQL="SELECT STUFF((SELECT '|'+VNum FROM LYJXKH..TBPJDXLX ORDER BY VNum FOR XML PATH('')),1,1,'') AS VNum";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
			Element FieldValue = doc.getRootElement().element("FieldsValue").element("FieldValue");
			String VNumStr = FieldValue.attributeValue("VNum");
			int maxVNum = Integer.parseInt(VNumStr.substring(VNumStr.lastIndexOf("|")+1,VNumStr.length()));
			String SnowVNum = "00001";
			for(int i=1;i<=maxVNum;i++){
				SnowVNum = ""+i;
				int len = SnowVNum.length();
				for(int k=0;k<(5-len);k++){
					SnowVNum = "0"+SnowVNum;
				}
				if(!(VNumStr.indexOf(i+"|")>-1)){
					break;
				}
			}
			int nowVNum = (Integer.parseInt(SnowVNum)==maxVNum?maxVNum+1:Integer.parseInt(SnowVNum));
			String SmaxVNum = ""+nowVNum;
			int len = SmaxVNum.length();
			for(int j=0;j<(5-len);j++){
				SmaxVNum = "0"+SmaxVNum;
			}
			FieldValue.addAttribute("maxVNum", SmaxVNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(doc.asXML());
		return doc.asXML();
	}
	public String DataSave(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement().element("ASK");
		String flag = Aele.attributeValue("flag");
		String VName = Aele.attributeValue("VName");
		String VGoverningBody = Aele.attributeValue("VGoverningBody");
		String VEpName = Aele.attributeValue("VEpName");
		String VSQL = Aele.attributeValue("VSQL");
		String VClassEpNum = Aele.attributeValue("VClassEpNum");
		String VClassSQL = Aele.attributeValue("VClassSQL");
		String VCubeNum = Aele.attributeValue("VCubeNum");
		String VDIM = Aele.attributeValue("VDIM");
		String Benable = Aele.attributeValue("Benable");
		String BDefaultLoad = Aele.attributeValue("BDefaultLoad");
		String VNum = Aele.attributeValue("VNum");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VName);
		list.add(VName);
		list.add(VGoverningBody);
		list.add(VEpName);
		list.add(VSQL);
		list.add(VClassEpNum);
		list.add(VClassSQL);
		list.add(VCubeNum);
		list.add(VDIM);
		list.add(Benable);
		list.add(BDefaultLoad);
		list.add(VNum);
		Document doc = null;
		String SQL="";
		try {
			if("1".equals(flag)){//新增
				SQL = "INSERT INTO LYJXKH..TBPJDXLX (VName,VPYM,VGoverningBody,VEpName,VSQL,VClassEpNum,VClassSQL"
						+ ",VCubeNum,VDIM,Benable,BDefaultLoad,VNum)VALUES(?,BASEMENT.DBO.GetPY(?),?,?,?,?,?,?,?,?,?,?)";
			}else if("2".equals(flag)){
				SQL = "UPDATE LYJXKH..TBPJDXLX SET VName=?,VPYM=BASEMENT.DBO.GetPY(?),VGoverningBody=?,VEpName=?,VSQL=?,VClassEpNum=?"
						+ ",VClassSQL=?,VCubeNum=?,VDIM=?,Benable=?,BDefaultLoad=? WHERE VNum=?";
			}
			doc = this.ServireSQL(BaseServire.SysModify,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
