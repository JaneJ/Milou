package ee.ut.math.vl.datastore.Kommentaar;

import java.sql.SQLException;
import java.util.List;

import ee.ut.math.vl.data.Kommentaar;



public interface KommentaarDataProvider {
	
	 public Kommentaar findKommentaarById(int id);
	 public List<Kommentaar> findKommentaarByArtikkel(int artikkel) throws SQLException, Exception;
	 public void lisaKommentaar(Kommentaar kommentaar) throws SQLException, Exception;
	

}
