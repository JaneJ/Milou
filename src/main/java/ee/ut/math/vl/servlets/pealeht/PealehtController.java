package ee.ut.math.vl.servlets.pealeht;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import ee.ut.math.vl.data.Artikkel;
import ee.ut.math.vl.datastore.Artikkel.ArtikkelData;
import ee.ut.math.vl.datastore.Artikkel.ArtikkelDataProvider;

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
		resp.setHeader("Content-Type", "application/json");

		String idString = req.getParameter("id");
		if (idString != null) {
			try {
				replyArtikkelitega(resp, idString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	private void replyArtikkelitega(HttpServletResponse resp,
			String idString) throws SQLException, Exception {
		List<Artikkel> artiklid = datastore.findTenArtiklit();
		try {
			resp.getWriter().write(gson.toJson(artiklid));
		} catch (IOException e) {

			e.printStackTrace();
		}
	}



}
