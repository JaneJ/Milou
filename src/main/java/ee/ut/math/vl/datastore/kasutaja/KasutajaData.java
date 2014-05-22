package ee.ut.math.vl.datastore.kasutaja;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.Connectionid;

import ee.ut.math.vl.data.Kasutaja;

public class KasutajaData implements KasutajaDataProvider {

	@Override
	public Kasutaja findKasutajaById(int id) throws SQLException, Exception {
		Kasutaja kasutaja = new Kasutaja();
		kasutaja.id = id;
		Connectionid connid = new Connectionid();
		Connection conn = connid.getConnection();
		try {
            PreparedStatement stmt = conn.prepareStatement("SELECT id,nimi,username,admin FROM Kasutaja where Kasutaja.id=?;");
            stmt.setInt(1, id);
            
            ResultSet rs = stmt.executeQuery();
           
            
            
            if(!rs.next()) {
            	kasutaja.admin=false;
            }
            else{
            	kasutaja.admin=true;
            	kasutaja.id = rs.getInt("id");
    			kasutaja.nimi = rs.getString("nimi");
    			kasutaja.username = rs.getString("username");
            }
	
		} finally {
			 if (conn != null) conn.close();
		}

		return kasutaja;
	}

	@Override
	public void lisaKasutaja(Kasutaja kasutaja) throws SQLException, Exception {
		Connectionid connid = new Connectionid();
		Connection conn = connid.getConnection();
		try {
			PreparedStatement stmt = conn
					.prepareStatement("INSERT INTO Kasutja (id,nimi, username, admin) values (?, ?, ?,?)");
			stmt.setInt(1,kasutaja.id);
			stmt.setString(2,kasutaja.nimi);
			stmt.setString(3,kasutaja.username);
			stmt.setBoolean(4,kasutaja.admin);
			stmt.execute();
		} finally {
			 if (conn != null) conn.close();
		}

	}

	@Override
	public List<Kasutaja> findAllKasutajad() throws SQLException, Exception {
		List<Kasutaja> kasutajad = new ArrayList<Kasutaja>();
		Connectionid connid = new Connectionid();
		Connection conn = connid.getConnection();
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM Kasutaja");

			while (rs.next()) {
				Kasutaja k = new Kasutaja();

				k.id = rs.getInt("id");
				k.nimi = rs.getString("nimi");
				k.username = rs.getString("username");
				k.admin = rs.getBoolean("admin");

				kasutajad.add(k);

			}
		} finally {
			 if (conn != null) conn.close();
		}

		return kasutajad;
	}

}
