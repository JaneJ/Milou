package ee.ut.math.vl.datastore;




import ee.ut.math.vl.data.Artikkel;

public class ArtikkelData implements ArtikkelDataProvider {

   

    public ArtikkelData() {
        
    }

    @Override
    public Artikkel otsiArtikkelById(int id) {
        return null; //.get(id);
    }

   

    @Override
    public void lisaArtikkel(Artikkel artikkel) {
    	// concurrency bug
    }

	//@Override
	//public void lisaArtikkel(Artikkel artikkel) {
		// TODO Auto-generated method stub
		
	//}

}