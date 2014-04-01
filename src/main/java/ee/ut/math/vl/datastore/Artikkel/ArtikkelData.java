package ee.ut.math.vl.datastore.Artikkel;

import java.awt.Image;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.Main;

import ee.ut.math.vl.data.Artikkel;

public class ArtikkelData implements ArtikkelDataProvider {

	public ArtikkelData() {
	}

	@Override
	public Artikkel findArtikkelById(int id) throws SQLException, Exception {
		Artikkel artikkel = new Artikkel();
		artikkel.id = id;
		Statement stmt = Main.getCurrentConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT autor, pealkiri, lisatud, pilt, uudis, teema FROM Artikkel where Artikkel.id=id;");

		artikkel.autor = rs.getString("autor");
		artikkel.pealkiri = rs.getString("pealkiri");
		artikkel.lisatud = rs.getDate("lisatud");
		artikkel.pilt = (Image) rs.getObject("pilt");
		artikkel.uudis = rs.getString("uudis");
		artikkel.teema = rs.getString("teema");
		return artikkel;
	}

	@Override
	public void lisaArtikkel(Artikkel artikkel) throws SQLException, Exception {
		PreparedStatement stmt = Main
				.getCurrentConnection()
				.prepareStatement(
						"INSERT INTO Artikkel (autor, pealkiri, pilt, kirjeldus, uudis, teema) values (?, ?, ?, ?, ?, ?)");
		// /Kuidas me need konkreetsed väärtused siia sisse saame??
		//stmt.execute();
	}

	@Override
	public List<Artikkel> findTenArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<>();
		Statement stmt = Main.getCurrentConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT top 10 autor, pealkiri, lisatud, pilt, kirjeldus, teema FROM Artikkel ORDER BY lisatud");

		while (rs.next()) {
			Artikkel a = new Artikkel();

			a.autor = rs.getString("autor");
			a.pealkiri = rs.getString("pealkiri");
			a.lisatud = rs.getDate("lisatud");
			a.pilt = (Image) rs.getObject("pilt");
			a.kirjeldus = rs.getString("kirjeldus");
			a.teema = rs.getString("teema");

			artiklid.add(a);
		}

		return artiklid;
	}

	@Override
	public List<Artikkel> findTeemaArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<>();
		Statement stmt = Main.getCurrentConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT top 10 autor, pealkiri, lisatud, pilt, kirjeldus, teema FROM Artikkel");  //where teema on õige (või panna see eelmise meetodiga kokku??

		while (rs.next()) {
			Artikkel a = new Artikkel();
			a.autor = rs.getString("autor");
			a.pealkiri = rs.getString("pealkiri");
			a.lisatud = rs.getDate("lisatud");
			a.pilt = (Image) rs.getObject("pilt");
			a.kirjeldus = rs.getString("kirjeldus");
			a.teema = rs.getString("teema");

			artiklid.add(a);
		}

		return artiklid;
	}

	@Override
	public List<Artikkel> findNewestArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<>();
		Statement stmt = Main.getCurrentConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT top 5 pealkiri, lisatud FROM Artikkel ORDER BY lisatud");

		while (rs.next()) {
			Artikkel a = new Artikkel();

			a.pealkiri = rs.getString("pealkiri");
			a.lisatud = rs.getDate("lisatud");

			artiklid.add(a);
		}

		return artiklid;
	}

	@Override
	public List<Artikkel> findCommentedArtiklit() {
		// TODO Auto-generated method stub   
		
		//countiga top päring (ei mäleta praegu hästi, jätsin vahele=
		
		
		
		return null;
	}

	@Override
	public List<Artikkel> findPopularArtiklit() throws SQLException, Exception {
		List<Artikkel> artiklid = new ArrayList<>();
		Statement stmt = Main.getCurrentConnection().createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT top 5 pealkiri FROM Artikkel ");  //order by vaatamisi (selleks counterit vaja)

		while (rs.next()) {
			Artikkel a = new Artikkel();
			a.pealkiri = rs.getString("pealkiri");
			artiklid.add(a);
		}

		return artiklid;
	}

}