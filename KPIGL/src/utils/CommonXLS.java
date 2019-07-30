package utils;

import java.io.ByteArrayOutputStream;

import javax.servlet.http.HttpServletRequest;

import com.model.Aperator;
import com.util.Busy;


public abstract class CommonXLS extends Busy  {
	public abstract ByteArrayOutputStream createExcle(Aperator CZY,HttpServletRequest request) throws Exception;
}
