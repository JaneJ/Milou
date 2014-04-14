package ee.ut.math.vl.datastore.kasutaja;


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
		Connectionid conn = new Connectionid();
		Statement stmt = conn.getConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT  nimi, token, admin FROM Kassutaja where Kasutaja.id=id;");

		kasutaja.nimi = rs.getString("nimi");
		kasutaja.token = rs.getString("token");
		kasutaja.admin = rs.getBoolean("admin");

		return kasutaja;
	}

	@Override
	public void lisaKasutaja(Kasutaja kasutaja) throws SQLException, Exception {
		Connectionid conn = new Connectionid();
		PreparedStatement stmt = conn.getConnection().prepareStatement(
				"INSERT INTO Kasutja (nimi, token, admin) values (?, ?, ?)");
		
		 stmt.execute();

	}

	@Override
	public List<Kasutaja> findAllKasutajad() throws SQLException, Exception {
		List<Kasutaja> kasutajad = new ArrayList<Kasutaja>();
		Connectionid conn = new Connectionid();
		Statement stmt = conn.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT * FROM Kasutaja");

		while (rs.next()) {
			Kasutaja k = new Kasutaja();

			k.id = rs.getInt("id");
			k.nimi = rs.getString("nimi");
			k.token = rs.getString("token");
			k.admin = rs.getBoolean("admin");

			kasutajad.add(k);

		}
		return kasutajad;
	}

}
