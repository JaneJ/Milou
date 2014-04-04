package ee.ut.math.vl.datastore.pilt;

import java.sql.SQLException;
import ee.ut.math.vl.data.Pilt;

public interface PiltDataProvider {
	public Pilt findPiltById(int id) throws SQLException, Exception;

}
