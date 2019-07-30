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

public class CPK_xls extends CommonXLS{
	@SuppressWarnings("unchecked")
	public  ByteArrayOutputStream createExcle(Aperator CZY,HttpServletRequest request) throws Exception {
//		 String fileName = "床位表";
			/*String path = this.getClass().getResource("/").getPath();
			path = path.substring(1, path.lastIndexOf("modules/"));
			path += "standalone/deployments/YxSource.war/commonXLS/chuangweibiao.xls"; */
		String path = "CPKGL.xls";
		String Where = "";
		if(request.getParameter("PM")!=null){
			Where += " and A.VNAME like '%"+(String)request.getParameter("PM")+"%'";
		}
		if(request.getParameter("PH")!=null){
			Where += " and A.VBATCHNUM like '%"+(String)request.getParameter("PH")+"%'";
		}
		String SQL="select A.*,B.VNAME VGGMC,C.VNAME VCDMC from PHARMACY..TBFPLB A with(nolock) "
				+ "LEFT JOIN PHARMACY..TBDICTSpecifications B WITH(NOLOCK) ON A.VSPECNUM=B.VNUM "
				+ "LEFT JOIN PHARMACY..TBDICTPoo C WITH(NOLOCK) ON A.VORIGNNUM=C.VNUM where 1=1"+Where;
		Document re = null;
		List<Map<String, Object>> arrayList = new ArrayList<Map<String, Object>>();
		try {
			re = this.ServireSQL(BaseServire.SysQuer,SQL,null,CZY);
			List<Element> RootEle = re.getRootElement().element("FieldsValue").elements();
			for(int i=0;i<RootEle.size();i++){
				Map<String,Object> map1 = new HashMap<String, Object>();
				map1.put("VNAME", RootEle.get(i).attributeValue("VNAME"));
				map1.put("VGGMC", RootEle.get(i).attributeValue("VGGMC"));
				map1.put("VCDMC", RootEle.get(i).attributeValue("VCDMC"));
				map1.put("N3GNUM", RootEle.get(i).attributeValue("N3GNUM"));
				map1.put("N5GNUM", RootEle.get(i).attributeValue("N5GNUM"));
				map1.put("N6GNUM", RootEle.get(i).attributeValue("N6GNUM"));
				map1.put("N9GNUM", RootEle.get(i).attributeValue("N9GNUM"));
				map1.put("N10GNUM", RootEle.get(i).attributeValue("N10GNUM"));
				map1.put("N12GNUM", RootEle.get(i).attributeValue("N12GNUM"));
				map1.put("N15GNUM", RootEle.get(i).attributeValue("N15GNUM"));
				map1.put("N30GNUM", RootEle.get(i).attributeValue("N30GNUM"));
				map1.put("NBPACKNUM", RootEle.get(i).attributeValue("NBPACKNUM"));
				map1.put("VBATCHNUM", RootEle.get(i).attributeValue("VBATCHNUM"));
				map1.put("DOUTPUTTIME", RootEle.get(i).attributeValue("DOUTPUTTIME"));
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
