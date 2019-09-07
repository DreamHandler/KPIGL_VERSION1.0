package utils;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;


public class CWB_xls extends CommonXLS {
	@SuppressWarnings("unchecked")
	public  ByteArrayOutputStream createExcle(Aperator CZY,HttpServletRequest request) throws Exception {
//		 String fileName = "床位表";
			/*String path = this.getClass().getResource("/").getPath();
			path = path.substring(1, path.lastIndexOf("modules/"));
			path += "standalone/deployments/YxSource.war/commonXLS/chuangweibiao.xls"; */
		String path = "YYKGL.xls";
		String where ="";
		if(request.getParameter("PM")!=null){
			where += " and A.VNAME like '%"+(String)request.getParameter("PM")+"%'";
		}
		if(request.getParameter("PH")!=null){
			where += " and A.VBATCHNUM like '%"+(String)request.getParameter("PH")+"%'";
		}
		if(request.getParameter("SX")!=null){
			where += " and A.IATTRL = '"+(String)request.getParameter("SX")+"'";
		}
		if(request.getParameter("BTIME")!=null){
			where += " and A.DACCOUNT between '"+(String)request.getParameter("BTIME")+"' and '"+(String)request.getParameter("ETIME")+"'";
		}
		String SQL="select A.*,B.VNAME VSPECNAME,C.VNAME VORIGNNAME from PHARMACY..TBTCLIB A with(nolock) LEFT JOIN PHARMACY..TBDICTSpecifications B WITH(NOLOCK) ON A.VSPECNUM=B.VNUM "
				+ "LEFT JOIN PHARMACY..TBDICTPOO C WITH(NOLOCK) ON A.VORIGNNUM=C.VNUM where 1=1"+where;
		Document re = null;
		List<Map<String, Object>> arrayList = new ArrayList<Map<String, Object>>();
		try {
			re = this.ServireSQL(BaseServire.SysQuer,SQL,null,CZY);
			List<Element> RootEle = re.getRootElement().element("FieldsValue").elements();
			for(int i=0;i<RootEle.size();i++){
				Map<String,Object> map1 = new HashMap<String, Object>();
				map1.put("VNAME", RootEle.get(i).attributeValue("VNAME"));
				map1.put("VSPECNAME", RootEle.get(i).attributeValue("VSPECNAME"));
				map1.put("VORIGNNAME", RootEle.get(i).attributeValue("VORIGNNAME"));
				map1.put("NTOTALN", RootEle.get(i).attributeValue("NTOTALN"));
				map1.put("NUNITPRICE", RootEle.get(i).attributeValue("NUNITPRICE"));
				map1.put("VUNIT", RootEle.get(i).attributeValue("VUNIT"));
				map1.put("NTOTALM", RootEle.get(i).attributeValue("NTOTALM"));
				map1.put("DACCOUNT", RootEle.get(i).attributeValue("DACCOUNT").substring(0,10));
				map1.put("NOWENUM", RootEle.get(i).attributeValue("NOWENUM"));
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
