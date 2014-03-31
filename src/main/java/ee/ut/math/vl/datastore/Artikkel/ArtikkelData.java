package ee.ut.math.vl.datastore.Artikkel;


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
	public List<Artikkel> findTenArtiklit() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Artikkel> findTeemaArtiklit() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Artikkel> findNewestArtiklit() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Artikkel> findCommentedArtiklit() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Artikkel> findPopularArtiklit() {
		// TODO Auto-generated method stub
		return null;
	}


}