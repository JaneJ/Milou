package ee.ut.math.vl.datastore.kasutaja;

import java.sql.SQLException;
import java.util.List;

import ee.ut.math.vl.data.Kasutaja;

public interface KasutajaDataProvider {
	 public Kasutaja findKasutajaById(long id) throws SQLException, Exception;
	 public List<Kasutaja> findAllKasutajad() throws SQLException, Exception;
	 public void lisaKasutaja(Kasutaja kasutaja) throws SQLException, Exception;

}
