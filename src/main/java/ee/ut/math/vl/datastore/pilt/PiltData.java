package ee.ut.math.vl.datastore.pilt;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.example.Connectionid;


import ee.ut.math.vl.data.Pilt;

public class PiltData implements PiltDataProvider{
	
	public Pilt findPiltByNimi(String nimi) throws SQLException, Exception {
		Pilt pilt = new Pilt();
		Connectionid conn = new Connectionid();
        try {
            Statement stmt = conn.getConnection().createStatement();
            ResultSet rs = stmt
                    .executeQuery("SELECT pilt FROM Pilt where Pilt.nimi=?;");

///........peab vaatama mis teha
          //  stmt.setString(1, nimi);


            pilt.piltBaidis = rs.getBytes("pilt");
        }
        finally {
            // see close asi korda!!!!!!!!!!!!
        }
    return pilt;
	}

    @Override
    public void lisaPilt() throws SQLException, Exception {

    }


}
