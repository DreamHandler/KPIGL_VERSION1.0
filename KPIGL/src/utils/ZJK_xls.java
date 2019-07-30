package utils;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;

public class ZJK_xls extends CommonXLS{
	@SuppressWarnings("unchecked")
	public  ByteArrayOutputStream createExcle(Aperator CZY,HttpServletRequest request) throws Exception {
//		 String fileName = "床位表";
			/*String path = this.getClass().getResource("/").getPath();
			path = path.substring(1, path.lastIndexOf("modules/"));
			path += "standalone/deployments/YxSource.war/commonXLS/chuangweibiao.xls"; */
		String path = "ZJKGL.xls";
		String Where = "";
		if(request.getParameter("PM")!=null){
			Where += " and VNAME like '%"+(String)request.getParameter("PM")+"%'";
		}
		if(request.getParameter("PH")!=null){
			Where += " and VBATCHNUM like '%"+(String)request.getParameter("PH")+"%'";
		}
		if(request.getParameter("SX")!=null){
			Where += " and IATTRL like '%"+(String)request.getParameter("SX")+"%'";
		}
		String SQL="select *from PHARMACY..VTBTMIDMXB with(nolock) where BAUDIT=1"+Where;
		Document re = null;
		List<Map<String, Object>> arrayList = new ArrayList<Map<String, Object>>();
		try {
			re = this.ServireSQL(BaseServire.SysQuer,SQL,null,CZY);
			List<Element> RootEle = re.getRootElement().element("FieldsValue").elements();
			for(int i=0;i<RootEle.size();i++){
				Map<String,Object> map1 = new HashMap<String, Object>();
				map1.put("VYNAME", RootEle.get(i).attributeValue("VYNAME"));
				map1.put("VNAME", RootEle.get(i).attributeValue("VNAME"));
				map1.put("NRCNUM", RootEle.get(i).attributeValue("NRCNUM"));
				map1.put("NLOSSNUM", RootEle.get(i).attributeValue("NLOSSNUM"));
				map1.put("VBATCHNUM", RootEle.get(i).attributeValue("VBATCHNUM"));
				map1.put("VUNIT", RootEle.get(i).attributeValue("VUNIT"));
				map1.put("VSPECNAME", RootEle.get(i).attributeValue("VSPECNAME"));
				arrayList.add(map1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		//固定列
		Map<String, Object> map = new HashMap<String, Object>();
		map = null;
//		map.put("mainTitle", "床位表");
//		map.put("notes", "查询条件");
		//合计
//		Map<String, Object> countMap = new HashMap<String, Object>();
//		countMap.put("IBQBM", "总计");
//		countMap.put("CBQMC", "");
//		countMap.put("ICW", 1);
//		countMap.put("IJC", 1);
//		countMap.put("ISUM", 1);
//		countMap.put("ISUM/ICOUNT", "");	
		ByteArrayOutputStream boas =new CreateExcleUtil().download(path, map, arrayList,null);
		return boas;	
		
	}
}
