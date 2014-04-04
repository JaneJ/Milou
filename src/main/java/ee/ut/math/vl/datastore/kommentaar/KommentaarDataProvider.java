package ee.ut.math.vl.datastore.kommentaar;

import java.sql.SQLException;
import java.util.List;

import ee.ut.math.vl.data.Kommentaar;



public interface KommentaarDataProvider {
	

	 public List<Kommentaar> findKommentaarByArtikkel(int artikkel) throws SQLException, Exception;
	 public void lisaKommentaar(Kommentaar kommentaar) throws SQLException, Exception;
	

}
