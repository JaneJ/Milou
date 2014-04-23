package ee.ut.math.vl.datastore.pilt;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.example.Connectionid;

import ee.ut.math.vl.data.Pilt;

public class PiltData implements PiltDataProvider {

	public Pilt findPiltByNimi(String nimi) throws SQLException, Exception {
		Pilt pilt = new Pilt();
		Connectionid connid = new Connectionid();
		Connection conn = connid.getConnection();
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt
					.executeQuery("SELECT pilt FROM Pilt where Pilt.id=id;");

			pilt.piltBaidis = rs.getBytes("pilt");
		} finally {
			 if (conn != null) conn.close();
		}
		return pilt;
	}

}