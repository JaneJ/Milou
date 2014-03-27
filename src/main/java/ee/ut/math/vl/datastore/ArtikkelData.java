package ee.ut.math.vl.datastore;


import java.util.List;

import ee.ut.math.vl.data.Artikkel;

public class ArtikkelData implements ArtikkelDataProvider {

   

    public ArtikkelData() {
        
    }

    @Override
    public Artikkel findArtikkelById(int id) {
        return null; //.get(id);
    }

   

    @Override
    public void lisaArtikkel(Artikkel artikkel) {
    	// concurrency bug
    }

	@Override
	public List<Artikkel> findAllArtiklid() {
		// TODO Auto-generated method stub
		return null;
	}

	//@Override
	//public void lisaArtikkel(Artikkel artikkel) {
		// TODO Auto-generated method stub
		
	//}

}