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
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt
					.executeQuery("SELECT  nimi, token, admin FROM Kassutaja where Kasutaja.id=id;");

			kasutaja.nimi = rs.getString("nimi");
			kasutaja.token = rs.getString("token");
			kasutaja.admin = rs.getBoolean("admin");
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
					.prepareStatement("INSERT INTO Kasutja (nimi, token, admin) values (?, ?, ?)");

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
				k.token = rs.getString("token");
				k.admin = rs.getBoolean("admin");

				kasutajad.add(k);

			}
		} finally {
			 if (conn != null) conn.close();
		}

		return kasutajad;
	}

}
