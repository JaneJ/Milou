package com.example;



import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;
import java.util.Vector;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;

@WebListener
public class Connectionid implements ServletContextListener, Runnable {
	
	
	
    private int initialConnectionCount = 1;           
    private Vector availableConnections = new Vector();   
    private Vector usedConnections = new Vector(); 
    private Thread cleanupThread = null;   
    
    
    public Connectionid() throws SQLException, URISyntaxException   
    {    
    	String url = "jdbc:postgresql://ec2-54-204-47-70.compute-1.amazonaws.com:5432/d56qim871vq0h0?user=oxqsnxoujnlrpq&password=QDMv1ULIryRIPYoEQGJBMDwI-R&ssl=true"; 
        for(int cnt=0; cnt<initialConnectionCount; cnt++)   
        {   
            // Add a new connection to the available list.   
            availableConnections.addElement(getConnection());   
        }   
           
        // Create the cleanup thread   
        cleanupThread = new Thread(this);   
        cleanupThread.start();   
    }       
    


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

	
	  public synchronized Connection checkout() throws SQLException, URISyntaxException   
	    {   
	        Connection newConnxn = null;   
	           
	        if(availableConnections.size() == 0)   
	        {   
	            // Im out of connections. Create one more.   
	             newConnxn = getConnection();   
	            // Add this connection to the "Used" list.   
	             usedConnections.addElement(newConnxn);   
	            // We dont have to do anything else since this is   
	            // a new connection.   
	        }   
	        else   
	        {   
	            // Connections exist !   
	            // Get a connection object   
	            newConnxn = (Connection)availableConnections.lastElement();   
	            // Remove it from the available list.   
	            availableConnections.removeElement(newConnxn);   
	            // Add it to the used list.   
	            usedConnections.addElement(newConnxn);               
	        }           
	           
	        // Either way, we should have a connection object now.   
	        return newConnxn;   
	    }   
	       
	  
	    public synchronized void checkin(Connection c)   
	    {   
	        if(c != null)   
	        {   
	            // Remove from used list.   
	            usedConnections.removeElement(c);   
	            // Add to the available list   
	            availableConnections.addElement(c);           
	        }   
	    }               
	       
	    public int availableCount()   
	    {   
	        return availableConnections.size();   
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

	@Override
	public void run() {
		{   
	        try   
	        {   
	            while(true)   
	            {   
	                synchronized(this)   
	                {   
	                    while(availableConnections.size() > initialConnectionCount)   
	                    {    
	                        Connection c = (Connection)availableConnections.lastElement();   
	                        availableConnections.removeElement(c);   
   
	                        c.close();   
	                    }   
	                }   
 
	                Thread.sleep(60000 * 1);   
	            }       
	        }   
	        catch(SQLException sqle)   
	        {   
	            sqle.printStackTrace();   
	        }   
	        catch(Exception e)   
	        {   
	            e.printStackTrace();   
	        }   
	}
	}
}

