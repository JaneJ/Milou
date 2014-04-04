package ee.ut.math.vl.datastore.artikkel;

import java.sql.SQLException;
import java.util.List;

import ee.ut.math.vl.data.Artikkel;

public interface ArtikkelDataProvider {
	
	
	 public Artikkel findArtikkelById(int id) throws SQLException, Exception;
	 public List<Artikkel> findTenArtiklit() throws SQLException, Exception;
	 public List<Artikkel> findTeemaArtiklit() throws SQLException, Exception;
	 public List<Artikkel> findNewestArtiklit() throws SQLException, Exception;
	 public List<Artikkel> findCommentedArtiklit();
	 public List<Artikkel> findPopularArtiklit() throws SQLException, Exception;
	 public void lisaArtikkel(Artikkel artikkel) throws SQLException, Exception;
	 

}
