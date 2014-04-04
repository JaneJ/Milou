package ee.ut.math.vl.datastore.Kasutaja;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.example.Main;
import ee.ut.math.vl.data.Kasutaja;

public class KasutajaData implements KasutajaDataProvider {

	@Override
	public Kasutaja findKasutajaById(int id) throws SQLException, Exception {
		Kasutaja kasutaja = new Kasutaja();
		kasutaja.id = id;
		Statement stmt = Main.getCurrentConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT  nimi, token, admin FROM Kassutaja where Kasutaja.id=id;");

		kasutaja.nimi = rs.getString("nimi");
		kasutaja.token = rs.getString("token");
		kasutaja.admin = rs.getBoolean("admin");

		return kasutaja;
	}

	@Override
	public void lisaKasutaja(Kasutaja kasutaja) throws SQLException, Exception {
		PreparedStatement stmt = Main.getCurrentConnection().prepareStatement(
				"INSERT INTO Kasutja (nimi, token, admin) values (?, ?, ?)");
		// /Kuidas me need konkreetsed väärtused siia sisse saame??
		// stmt.execute();

	}

	@Override
	public List<Kasutaja> findAllKasutajad() throws SQLException, Exception {
		List<Kasutaja> kasutajad = new ArrayList<Kasutaja>();
		Statement stmt = Main.getCurrentConnection().createStatement();
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
