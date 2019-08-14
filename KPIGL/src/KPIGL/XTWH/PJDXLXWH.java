package KPIGL.XTWH;

import org.dom4j.Document;

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
	public String DataSave(Document inEle, Aperator inopr){
		Document doc = null;
		String SQL="";
		try {
			doc = this.ServireSQL(BaseServire.SysModify,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
