package com.example;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;
import java.util.Properties;
import java.util.Vector;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;

@WebListener
public class Connectionid implements ServletContextListener {


	public void handle(String target, Request baseRequest,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		response.setContentType("text/html;charset=utf-8");
		response.setStatus(HttpServletResponse.SC_OK);
		baseRequest.setHandled(true);
		response.getWriter().println("<h1>Hello World</h1>");
	}


	public Connection getConnection() throws SQLException, URISyntaxException {
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl != null) {
			return getHerokuConnection(new URI(databaseUrl));
		} else {
			return getLocalConnection();
		}
	}

	static Connection getHerokuConnection(final URI dbUri) throws SQLException,
			URISyntaxException {

		String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
		Properties props = new Properties();
		props.setProperty("user", dbUri.getUserInfo().split(":")[0]);
		props.setProperty("password", dbUri.getUserInfo().split(":")[1]);
		props.setProperty("ssl", "true");
		props.setProperty("sslfactory", "org.postgresql.ssl.NonValidatingFactory");
		return DriverManager.getConnection(dbUrl, props);

		//return DriverManager.getConnection(dbUrl, username, password);
	}

	static Connection getLocalConnection() throws SQLException {
		return DriverManager.getConnection("jdbc:postgresql://localhost/mydb",
				"user", "pass");
	}



	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		String url = "jdbc:postgresql://ec2-54-204-47-70.compute-1.amazonaws.com:5432/d56qim871vq0h0?user=oxqsnxoujnlrpq&password=QDMv1ULIryRIPYoEQGJBMDwI-R&ssl=true";


		Connection connection;
		try {
			connection = getConnection();
			
			// testpäringud, et andmebaas on olemas, töötab
			Statement stmt = connection.createStatement();
			stmt.executeUpdate("DROP TABLE IF EXISTS ticks");
			stmt.executeUpdate("CREATE TABLE ticks (tick timestamp)");
			stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
			ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");
			while (rs.next()) {
				System.out.println("Read from DB: " + rs.getTimestamp("tick"));
			}
			
			
		} catch (SQLException | URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		System.out.println("töötab");

	}


}

