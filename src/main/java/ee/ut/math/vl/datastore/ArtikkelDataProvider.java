package ee.ut.math.vl.datastore;

import ee.ut.math.vl.data.Artikkel;

public interface ArtikkelDataProvider {
	
	
	 public Artikkel otsiArtikkelById(int id);
	 public void lisaArtikkel(Artikkel artikkel);

}
