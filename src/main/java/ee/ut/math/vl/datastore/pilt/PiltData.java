package ee.ut.math.vl.datastore.pilt;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.example.Main;

import ee.ut.math.vl.data.Pilt;

public class PiltData implements PiltDataProvider{
	
	public Pilt findPiltByNimi(String nimi) throws SQLException, Exception {
		Pilt pilt = new Pilt();
	Statement stmt = Main.getCurrentConnection().createStatement();
	ResultSet rs = stmt
			.executeQuery("SELECT pilt FROM Pilt where Pilt.id=id;");
	
	pilt.piltBaidis = rs.getBytes("pilt");
	return pilt;
	}

}
