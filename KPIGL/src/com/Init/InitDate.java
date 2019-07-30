package com.Init;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


/**
 * 项目初始化启动加载对象
 * @author Administrator
 *
 */
public class InitDate implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		/*System.out.println("菜单初始化中。。。。");
		if(new InitMenu().Init()){
			System.out.println("菜单初始化成功！");
		}else{
			System.out.println("菜单初始化失败！");
		}*/
	}

}
