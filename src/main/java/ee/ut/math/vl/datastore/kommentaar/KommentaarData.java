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

            //alates siit muutsin, selleks, et saada oiged kommentaare klikkides "loe kommentaare"

            PreparedStatement stmt = null;
            String str = "SELECT id, autor, kommentaar, aeg  FROM Kommentaar where artikkel=?";// order
            // by
            // vaatamisi
            // (selleks
            // counterit
            // vaja)
            stmt = conn.prepareStatement(str);
            stmt.setInt(1, artikkel);
            ResultSet rs = stmt.executeQuery();

            //siit edasi enam ei muutnud

			while (rs.next()) {
				Kommentaar k = new Kommentaar();
                k.id = rs.getInt("id");
				k.autor = rs.getString("autor");
				k.kommentaar = rs.getString("kommentaar");
				k.aeg = rs.getDate("aeg");
                k.artikkel = artikkel;
				kommentaarid.add(k);
			}
		} finally {
			  conn.close();
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
					.prepareStatement("INSERT INTO kommentaar (artikkel, autor, kommentaar, aeg) values (?, ?, ?, NOW())");

			stmt.setInt(1,kommentaar.artikkel);
			stmt.setString(2,kommentaar.autor);
			stmt.setString(3,kommentaar.kommentaar);
			
		

			// Hmm see artikli väärtus ka veel... kahte pead oleks vaja

			stmt.execute();
		} finally {
			 conn.close();
		}
	}

}
