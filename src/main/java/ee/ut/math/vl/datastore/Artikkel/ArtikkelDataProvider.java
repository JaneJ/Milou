package ee.ut.math.vl.datastore.Artikkel;

import java.util.List;

import ee.ut.math.vl.data.Artikkel;

public interface ArtikkelDataProvider {
	
	
	 public Artikkel findArtikkelById(int id);
	 public List<Artikkel> findTenArtiklit();
	 public List<Artikkel> findTeemaArtiklit();
	 public List<Artikkel> findNewestArtiklit();
	 public List<Artikkel> findCommentedArtiklit();
	 public List<Artikkel> findPopularArtiklit();
	 public void lisaArtikkel(Artikkel artikkel);
	 

}
