package ee.ut.math.vl.datastore.kommentaar;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.Connectionid;

import ee.ut.math.vl.data.Kommentaar;

public class KommentaarData implements KommentaarDataProvider {

	@Override
	public List<Kommentaar> findKommentaarByArtikkel(int artikkel)
			throws SQLException, Exception {
		List<Kommentaar> kommentaarid = new ArrayList<Kommentaar>();
		Connectionid connid = new Connectionid();
		Connection conn = connid.getConnection();
		try {

			Statement stmt = conn.createStatement();
			ResultSet rs = stmt
					.executeQuery("SELECT autor, kommentaar, aeg  FROM Kommnetaar where artikkel=artikkel "); // order
																												// by
																												// vaatamisi
																												// (selleks
																												// counterit
																												// vaja)

			while (rs.next()) {
				Kommentaar k = new Kommentaar();
				k.autor = rs.getString("autor");
				k.kommentaar = rs.getString("kommentaar");
				k.aeg = rs.getDate("aeg");
				kommentaarid.add(k);
			}
		} finally {
			 if (conn != null) conn.close();
		}
		return kommentaarid;
	}

	@Override
	public void lisaKommentaar(Kommentaar kommentaar) throws SQLException,
			Exception {
		Connectionid connid = new Connectionid();
		Connection conn = connid.getConnection();
		try {
			PreparedStatement stmt = conn
					.prepareStatement("INSERT INTO kommentaar (artikkel, autor, kommentaar, aeg) values (?, ?, ?, ?)");

			stmt.setString(4, "now");

			// Hmm see artikli väärtus ka veel... kahte pead oleks vaja

			stmt.execute();
		} finally {
			 if (conn != null) conn.close();
		}
	}

}
