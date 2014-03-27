package ee.ut.math.vl.datastore;

import java.util.List;

import ee.ut.math.vl.data.Artikkel;

public interface ArtikkelDataProvider {
	
	
	 public Artikkel findArtikkelById(int id);
	 public List<Artikkel> findAllArtiklid();
	 public void lisaArtikkel(Artikkel artikkel);
	 

}
