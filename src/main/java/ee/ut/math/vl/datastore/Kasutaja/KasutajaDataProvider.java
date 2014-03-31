package ee.ut.math.vl.datastore.Kasutaja;

import ee.ut.math.vl.data.Kasutaja;

public interface KasutajaDataProvider {
	 public Kasutaja findKasutajaById(int id);
	 public void lisaKasutaja(Kasutaja kasutaja);

}
