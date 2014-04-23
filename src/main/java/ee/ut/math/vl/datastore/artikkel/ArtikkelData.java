package ee.ut.math.vl.datastore.artikkel;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.Connectionid;

import ee.ut.math.vl.data.Artikkel;

public class ArtikkelData implements ArtikkelDataProvider {

	public ArtikkelData() {
	}

	@Override
	public Artikkel findArtikkelById(int id) throws SQLException, Exception {

		Artikkel artikkel = new Artikkel();
		Connectionid conn = new Connectionid();
        try {

            PreparedStatement stmt = conn
                    .getConnection()
                    .prepareStatement(
                            "SELECT id, autor, pealkiri, lisatud, pilt, uudis, teema FROM artikkel where artikkel.id=?;");

            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();
            rs.next();

            artikkel.id = rs.getInt("id");
            artikkel.autor = rs.getString("autor");
            artikkel.pealkiri = rs.getString("pealkiri");
            artikkel.lisatud = rs.getDate("lisatud");
            artikkel.pilt = rs.getString("pilt");
            artikkel.uudis = rs.getString("uudis");
            artikkel.teema = rs.getString("teema");
        }
        finally {
          // if (conn != null) conn.close();

        }
        return artikkel;
	}

	@Override
	public void lisaArtikkel(Artikkel artikkel) throws SQLException, Exception {
		Connectionid conn = new Connectionid();
        try {
            PreparedStatement stmt = conn
                    .getConnection()
                    .prepareStatement(
                            "INSERT INTO Artikkel (autor, pealkiri, pilt, kirjeldus, uudis, teema, vaatamisi, lisatud) values (?, ?, ?, ?, ?, ?, ?, ?)");

            stmt.setInt(7, 0);
            stmt.setString(8, "now");

            stmt.execute();
        }
        finally {
          // if (conn != null) conn.close();
        }

	}

	@Override
	public List<Artikkel> findTenArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<Artikkel>();
		Connectionid conn = new Connectionid();
        try {
            Statement stmt = conn.getConnection().createStatement();
            ResultSet rs = stmt
                    .executeQuery("SELECT id, autor, pealkiri, lisatud, pilt, kirjeldus, teema FROM Artikkel ORDER BY lisatud limit 10");

            while (rs.next()) {
                Artikkel a = new Artikkel();
                a.id = rs.getInt("id");
                a.autor = rs.getString("autor");
                a.pealkiri = rs.getString("pealkiri");
                a.lisatud = rs.getDate("lisatud");
                a.pilt = rs.getString("pilt");
                a.kirjeldus = rs.getString("kirjeldus");
                a.teema = rs.getString("teema");

                artiklid.add(a);
            }
        }
        finally {
          // if (conn != null) conn.close();

        }
        return artiklid;
	}

	@Override
	public List<Artikkel> findTeemaArtiklit(String teema) throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<Artikkel>();
		Connectionid conn = new Connectionid();
        try {
            Statement stmt = conn.getConnection().createStatement();
            ResultSet rs = stmt
                    .executeQuery("SELECT id,autor, pealkiri, lisatud, pilt, kirjeldus, teema FROM Artikkel  where artikkel.teema = ? limit 10"); // where
///........peab vaatama mis teha
          //  stmt.setString(1, teema);

            while (rs.next()) {
                Artikkel a = new Artikkel();
                a.id = rs.getInt("id");
                a.autor = rs.getString("autor");
                a.pealkiri = rs.getString("pealkiri");
                a.lisatud = rs.getDate("lisatud");
                a.pilt = rs.getString("pilt");
                a.kirjeldus = rs.getString("kirjeldus");
                a.teema = rs.getString("teema");

                artiklid.add(a);
            }
        }
        finally {
           //if (conn != null) conn.close();

        }
        return artiklid;
	}

	@Override
	public List<Artikkel> findNewestArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<Artikkel>();
		Connectionid conn = new Connectionid();
        try {
            Statement stmt = conn.getConnection().createStatement();
            ResultSet rs = stmt
                    .executeQuery("SELECT pealkiri, lisatud FROM Artikkel ORDER BY lisatud limit 5");

            while (rs.next()) {
                Artikkel a = new Artikkel();

                a.pealkiri = rs.getString("pealkiri");
                a.lisatud = rs.getDate("lisatud");

                artiklid.add(a);
            }
        }
        finally {
          //if (conn != null) conn.close();

        }
        return artiklid;
	}

	@Override
	public List<Artikkel> findCommentedArtiklit() {
		// TODO Auto-generated method stub

		// countiga top päring (ei mäleta praegu hästi, jätsin vahele

		return null;
	}

	@Override
	public List<Artikkel> findPopularArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<Artikkel>();
		Connectionid conn = new Connectionid();
        try {


            Statement stmt = conn.getConnection().createStatement();
            ResultSet rs = stmt
                    .executeQuery("SELECT id, pealkiri FROM Artikkel limit 5"); // order
            // by
            // vaatamisi
            // (selleks
            // counterit
            // vaja)

            while (rs.next()) {
                Artikkel a = new Artikkel();
                a.id = rs.getInt("id");
                a.pealkiri = rs.getString("pealkiri");
                artiklid.add(a);
            }
        }
        finally {
          //if (conn != null) conn.close();

        }
        return artiklid;
	}

}