package utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellReference;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;


public class CreateExcleUtil {
	/**
	 * 
	 * @param path 模板名称
	 * @param map 替换参数
	 * @param listData 主要数据
	 * @param countMap 合计行数据
	 * @return 返回流
	 * @throws Exception
	 */
	public ByteArrayOutputStream download(String path,Map<String, Object> map,List<Map<String, Object>> listData,Map<String, Object> countMap) throws Exception {
		/*String fileNameString = this.getClass().getResource("/").getPath();
		
		fileNameString = fileNameString.substring(1, fileNameString.lastIndexOf("modules/"));
		fileNameString += "standalone/deployments/YxSource.war/commonXLS/";*/
		String fileNameString = "E:/ExcelExport/";//模版出错位置
		File file = new File(fileNameString+path);
		
		//定义通用变量
		
		//1.读工作薄
		InputStream is = new FileInputStream(file);
		HSSFWorkbook wb = new HSSFWorkbook(is);
		//2.读取工作表
		Sheet sheet = wb.getSheetAt(0);	
		List<Row> rows = new ArrayList<Row>();
		Row countRow = null;
		List<Map<String, Object>> listParam = new ArrayList<Map<String,Object>>();
		//数据列
		for (Row row : sheet) {
			for (Cell cell : row) {	
				String value = "";
				switch (cell.getCellType()) {
				case Cell.CELL_TYPE_FORMULA:
					value = cell.getCellFormula();
					formulaValue(rows,cell,value,sheet);
					break;
				default:
					value = cell.getRichStringCellValue().getString();
					workValue(map, listData, sheet, rows, listParam, row,
							cell, value,countMap);
					break;
				}
			}
		}
		//合计行创建
		if (countMap!=null && countMap.size()>0) {		
			for (Map<String, Object> m : listParam) {
				int CellNo = Integer.parseInt(m.get("cellNo")+"");
				if (countRow==null) {	
					countRow = rows.get(rows.size()-1);
				}
				Cell countCell = countRow.createCell(CellNo);
				
				CellStyle cellStyle = (CellStyle) m.get("cellStyle");
				Object obj = countMap.get(m.get("key"));
				if (obj instanceof Integer) {
					countCell.setCellFormula("SUM("+m.get("replace1")+":"+m.get("replace2")+")");
				}else{
					countCell.setCellValue(obj+"");
				}
				countCell.setCellStyle(cellStyle);
			}
		}
		//强制执行所有公式
		FormulaEvaluator evaluator = wb.getCreationHelper().createFormulaEvaluator();
		for (Row r : sheet) {
			for (Cell c : r) {
				if (c.getCellType() == Cell.CELL_TYPE_FORMULA) {
					evaluator.evaluateFormulaCell(c);
				}
			}
		}
		ByteArrayOutputStream boas = new ByteArrayOutputStream();
		wb.write(boas);
		boas.close();		
		return boas;
	}

	/**
	 * 处理公式列
	 * @param rows 行（总） 第一行不为公式
	 * @param cell 当前单元格
	 * @param value 当前公式
	 * @param sheet 当前页（Sheet）
	 */
	private void formulaValue(List<Row> rows, Cell cell, String value,Sheet sheet) {
		CellStyle cellStyle = cell.getCellStyle();
		int cellCol = cell.getColumnIndex();
		int cellRow = cell.getRowIndex();
		Row nowRow = null;
		for(int i = 0;i<rows.size();i++){
			nowRow = rows.get(i);
			Cell nowCell = nowRow.createCell(cellCol);
			String[] strArr = value.split("4");
			String nowVal = value;
			for (String string : strArr) {
				String lastStr = string.substring(string.length()-1, string.length());
				if (lastStr.matches("[A-Z]")) {
					nowVal = nowVal.replace(lastStr+String.valueOf(cellRow+1), lastStr+String.valueOf(cellRow+i+1));
				}
			}
			nowCell.setCellType(Cell.CELL_TYPE_FORMULA);
			nowCell.setCellFormula(nowVal);
			nowCell.setCellStyle(cellStyle);
		}
	}

	/**
	 * 操作非公式列
	 * @param map 参数（替换字符）map
	 * @param listData 主要数据
	 * @param sheet 当前页
	 * @param rows 行列表
	 * @param listParam 返回参数
	 * @param row 当前行
	 * @param cell 当前列
	 * @param value 单元格默认值
	 */
	private void workValue(Map<String, Object> map,List<Map<String, Object>> listData, Sheet sheet, List<Row> rows, List<Map<String, Object>> listParam, Row row,
			Cell cell, String value, Map<String, Object> countMap) {
		if (value.contains("{") && value.contains("}")) {
			String key = value.substring(value.indexOf("{")+1, value.indexOf("}"));
			value = value.replace("{"+key+"}", map.get(key)+"");
			cell.setCellValue(value);
		}
		if (value.startsWith("#")) {
			value=value.replace("#", "");
			if (listData.get(0).containsKey(value)) {
				Map<String, Object> mm = creatCellData(listData, countMap, sheet, value, row, cell, rows);
				if (mm.size()>0) {					
					listParam.add(mm);
				}
			}
		}
	}

	/**
	 * 生成数据行
	 * @param listData 返回参数
	 * @param map 传入参数（含替换字符）
	 * @param sheet 
	 * @param k
	 * @param row
	 * @param cell
	 * @param rows
	 * @return
	 */
	private Map<String, Object> creatCellData(List<Map<String, Object>> listData, Map<String, Object> countMap,
			Sheet sheet, String k, Row row, Cell cell,List<Row> rows) {
		int rowNo;
		int cellNo;
		int tage = 0;
		Row nowRow = null;
		Cell nowCell;
		CellStyle nowCellStyle;
		nowCellStyle = cell.getCellStyle();
		rowNo = cell.getRowIndex();
		cellNo = cell.getColumnIndex();
		Map<String, Object> mm = new HashMap<String, Object>();
		float lineHeigth = row.getHeightInPoints();
		boolean tag = false;
		for (Map<String, Object> m : listData) {
			if(rows.size() < tage+1){
				nowRow = sheet.createRow(rowNo+tage);//产生数据行
				nowRow.setHeightInPoints(lineHeigth);
				rows.add(nowRow);
				tag = true;
			}else{
				nowRow = rows.get(tage);
			}
			nowCell = nowRow.createCell(cellNo);
			String val = m.get(k)+"";
			if (m.get(k) instanceof Integer || m.get(k) instanceof Double) {
				double valD = Double.parseDouble(val);
				nowCell.setCellValue(valD);
			}else {			
				nowCell.setCellValue(val);
			}
			nowCell.setCellStyle(nowCellStyle);
			tage++;
		}
		CellReference  cellRef1= new CellReference(rowNo, cellNo);
		String replace1 = cellRef1.formatAsString().replace("$", "");
		CellReference  cellRef2= new CellReference(rowNo+tage-1, cellNo);
		String replace2 = cellRef2.formatAsString().replace("$", "");
		if(tag&&countMap!=null&&countMap.size()>0){
			Row countRow = sheet.createRow(tage+rowNo);
			rows.add(countRow);
		}
		CellStyle cellStyle = cell.getCellStyle();		
		if (countMap!=null && countMap.containsKey(k)) {
			mm.put("key", k);
			mm.put("replace1", replace1);
			mm.put("replace2", replace2);
			mm.put("rowNo", rowNo);
			mm.put("cellNo", cellNo);
			mm.put("cellStyle", cellStyle);
		}
		return mm;
	}
}
