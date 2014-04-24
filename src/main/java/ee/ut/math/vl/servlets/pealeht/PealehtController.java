package ee.ut.math.vl.servlets.pealeht;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import ee.ut.math.vl.data.Artikkel;
import ee.ut.math.vl.datastore.artikkel.ArtikkelData;
import ee.ut.math.vl.datastore.artikkel.ArtikkelDataProvider;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(value = "/pealeht")
public class PealehtController extends HttpServlet {

	private Gson gson;
	private ArtikkelDataProvider datastore;

	@Override
	public void init() throws ServletException {
		super.init();
		gson = new Gson();
		datastore = new ArtikkelData();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		{
			try {
				String idString = req.getParameter("teema");
				if (idString == null) {
				replyPealehega(resp, idString);
			}
			else {replyTeemaga(resp, idString);}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} 
	}

	private void replyPealehega(HttpServletResponse resp,
			String idString) throws SQLException, Exception {
		List<Artikkel> artiklid = datastore.findTenArtiklit();
		try {
			resp.getWriter().write(gson.toJson(artiklid));
		} catch (IOException e) {

			e.printStackTrace();
		}
	}
	
	private void replyTeemaga(HttpServletResponse resp,
			String idString) throws SQLException, Exception {
		List<Artikkel> artiklid = datastore.findTeemaArtiklit(idString);
		try {
			resp.getWriter().write(gson.toJson(artiklid));
		} catch (IOException e) {

			e.printStackTrace();
		}
	}



}
