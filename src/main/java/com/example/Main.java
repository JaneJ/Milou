package com.example;


import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

public class Main {
    
    public static void main(String[] args) throws Exception {
        
        Connection connection = getConnection();
        
        Statement stmt = connection.createStatement();
        stmt.executeUpdate("DROP TABLE IF EXISTS ticks");
        stmt.executeUpdate("CREATE TABLE ticks (tick timestamp)");
        stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
        ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");
        while (rs.next()) {
            System.out.println("Read from DB: " + rs.getTimestamp("tick"));
        }
    }
    /*
    private static Connection getConnection() throws URISyntaxException, SQLException {
        URI dbUri = new URI(System.getenv("DATABASE_URL"));

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + dbUri.getPath();

        return DriverManager.getConnection(dbUrl, username, password);
    }
    */
    
    
    static Connection getConnection() throws SQLException, URISyntaxException {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null) {
            return getHerokuConnection(new URI(databaseUrl));
        } else {
            return getLocalConnection();
        }
    }
 
    static Connection getHerokuConnection(final URI dbUri) throws SQLException, URISyntaxException {
        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost()
                + ':' + dbUri.getPort() + dbUri.getPath();
 
        return DriverManager.getConnection(
                dbUrl, username, password);
    }
 
    static Connection getLocalConnection() throws SQLException {
        return DriverManager.getConnection("jdbc:postgresql://localhost/mydb", "user", "pass");
    }
    

}



