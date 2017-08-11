import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DemoStream
 */
@WebServlet(urlPatterns="/HashAnalysis", asyncSupported=true)
public class HashAnalysis extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.startAsync();
		String hashtag = request.getParameter("hashtag");
		String isStream = request.getParameter("isStream");
		if (isStream.equals("Stream")) {
			Executor executor = Executors.newFixedThreadPool(2);
			
			executor.execute(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					server(Path.streamserver,hashtag);
				}
			});
			executor.execute(new Runnable() {
			
				@Override
				public void run() {
					// TODO Auto-generated method stub
					client(Path.streamclient,response);
				}
			});
		}
		else if (isStream.equals("Non-Stream")){
			Executor executor = Executors.newFixedThreadPool(1);
			
			executor.execute(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					exec(Path.nonstreamclient,hashtag,response);
				}
			});
		
		}
	
	}
	
	private static void exec(String client,String hashtag,HttpServletResponse response){
		ProcessBuilder pb = new ProcessBuilder("./spark-submit", client,hashtag);
		pb.directory(new File(Path.sparkpath));
		Map<String, String> env = pb.environment();
		env.put("JAVA_HOME", Path.javapath);
		env.put("HADOOP_CONF_DIR", Path.hadoop_conf_path);
		env.put("CONDA_HOME", Path.condapath);
		env.put("PYSPARK_DRIVER_PYTHON", Path.pythondriver);
		env.put("PYSPARK_PYTHON", Path.pysparkpython);
		Process p1;
		try {
			p1 = pb.start();
			StringBuffer sb = new StringBuffer();
		new Thread() {
			public void run() {
				InputStream in = p1.getInputStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(in));
				String line;
				try {
					while ((line=br.readLine()) != null)
						sb.append(line+"<br>");
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				try {
					response.getWriter().println(sb.toString());
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				try {
					p1.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}.start();
		
		new Thread() {
			public void run() {
				InputStream in = p1.getErrorStream();
				int ch;
				try {
					while ((ch = in.read()) != -1)
						System.out.print((char)ch);
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				try {
					p1.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}.start();

		} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}

	}
	
	private static void server(String client,String hashtag){
		ProcessBuilder pb = new ProcessBuilder("./python", client, hashtag);
		pb.directory(new File(Path.pythonpath));
		try {
			pb.start();
		} 
		catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	}
	
	private static void client(String client,HttpServletResponse response){
		ProcessBuilder pb = new ProcessBuilder("./spark-submit", client);
		pb.directory(new File(Path.sparkpath));
		Map<String, String> env = pb.environment();
		env.put("JAVA_HOME", Path.javapath);
		env.put("HADOOP_CONF_DIR", Path.hadoop_conf_path);
		env.put("CONDA_HOME", Path.condapath);
		env.put("PYSPARK_DRIVER_PYTHON", Path.pythondriver);
		env.put("PYSPARK_PYTHON", Path.pysparkpython);
		Process p1;
		try {
			p1 = pb.start();
		new Thread() {
			public void run() {
				InputStream in = p1.getInputStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(in));
				String line;
				long start = System.currentTimeMillis();
				long end = start + 40000;
				try {
					while ((line=br.readLine()) != null){
						response.getWriter().println(line+"<br>");
						System.out.println(line);
						if (System.currentTimeMillis()>= end)
						{
							p1.destroy();
							break;
						}
					}
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
//				try {
//					//response.getWriter().println(sb.toString());
//				} catch (IOException e1) {
//					// TODO Auto-generated catch block
//					e1.printStackTrace();
//				}
				try {
					p1.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}.start();
		
		new Thread() {
			public void run() {
				InputStream in = p1.getErrorStream();
				int ch;
				try {
					while ((ch = in.read()) != -1)
				//		System.out.print((char)ch);
						System.out.print((char)ch);
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				try {
					p1.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}.start();

		} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	}

	

}
