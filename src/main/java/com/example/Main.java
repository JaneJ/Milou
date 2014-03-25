package com.example;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;

public class Main {

	
	private static Connection connection;

	public static Connection getCurrentConnection() throws Exception {
		if (connection == null) {
			connection = getConnection();
		}
		return connection;
	}

	public void handle(String target, Request baseRequest,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		response.setContentType("text/html;charset=utf-8");
		response.setStatus(HttpServletResponse.SC_OK);
		baseRequest.setHandled(true);
		response.getWriter().println("<h1>Hello World</h1>");
	}

	public static void main(String[] args) throws Exception {

		String url = "jdbc:postgresql://ec2-54-204-47-70.compute-1.amazonaws.com:5432/d56qim871vq0h0?user=oxqsnxoujnlrpq&password=QDMv1ULIryRIPYoEQGJBMDwI-R&ssl=true";
		
		
		//SERVER????
		//Server server = new Server();
		// server.setHandler(new HelloWorld()); -otsi googlest

		//server.start();
		//server.join();

		
		
					// muud klassid:
						// Statement asi = Main.getCurrentConnection().createStatement();

		
		Connection connection = getConnection();
		// testpäringud, et andmebaas on olemas, töötab
		Statement stmt = connection.createStatement();
		stmt.executeUpdate("DROP TABLE IF EXISTS ticks");
		stmt.executeUpdate("CREATE TABLE ticks (tick timestamp)");
		stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
		ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");
		while (rs.next()) {
			System.out.println("Read from DB: " + rs.getTimestamp("tick"));
		}
	}

	static Connection getConnection() throws SQLException, URISyntaxException {
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl != null) {
			return getHerokuConnection(new URI(databaseUrl));
		} else {
			return getLocalConnection();
		}
	}

	static Connection getHerokuConnection(final URI dbUri) throws SQLException,
			URISyntaxException {
		String username = dbUri.getUserInfo().split(":")[0];
		String password = dbUri.getUserInfo().split(":")[1];
		String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
				+ dbUri.getPort() + dbUri.getPath();

		return DriverManager.getConnection(dbUrl, username, password);
	}

	static Connection getLocalConnection() throws SQLException {
		return DriverManager.getConnection("jdbc:postgresql://localhost/mydb",
				"user", "pass");
	}

}
