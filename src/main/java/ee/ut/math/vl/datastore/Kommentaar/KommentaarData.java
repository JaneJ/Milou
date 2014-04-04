package ee.ut.math.vl.datastore.Kommentaar;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.Main;
import ee.ut.math.vl.data.Kommentaar;

public class KommentaarData implements KommentaarDataProvider {



	@Override
	public List<Kommentaar> findKommentaarByArtikkel(int artikkel)
			throws SQLException, Exception {
		List<Kommentaar> kommentaarid = new ArrayList<Kommentaar>();
		Statement stmt = Main.getCurrentConnection().createStatement();
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
		return kommentaarid;
	}

	@Override
	public void lisaKommentaar(Kommentaar kommentaar) throws SQLException,
			Exception {
		PreparedStatement stmt = Main
				.getCurrentConnection()
				.prepareStatement(
						"INSERT INTO kommentaar (artikkel, autor, kommentaar, aeg) values (?, ?, ?, ?)");
		
		stmt.setString(4, "now" );
		
		// /Kuidas me need konkreetsed väärtused siia sisse saame??
		
		//Hmm see artikli väärtus ka veel... kahte pead oleks vaja
		
		// stmt.execute();
	}

}
