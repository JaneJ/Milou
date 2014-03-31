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
			replyWithSingleArtikkel(resp, idString);

		} else {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	private void replyWithSingleArtikkel(HttpServletResponse resp,
			String idString) {
		int id = Integer.parseInt(idString);
		Artikkel artikkel = datastore.findArtikkelById(id);
		try {
			resp.getWriter().write(gson.toJson(artikkel));
		} catch (IOException e) {

			e.printStackTrace();
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			Artikkel artikkel = gson.fromJson(req.getReader(), Artikkel.class);
			datastore.lisaArtikkel(artikkel);

			// echo the same object back for convenience and debugging
			// also it now contains the generated id of the bid
			String pealehtEcho = gson.toJson(artikkel);
			resp.setHeader("Content-Type", "application/json");
			resp.getWriter().write(pealehtEcho);

			// actually this is a bad place to send the broadcast.
			// better: attach sockets as eventlisteners to the datastore
			// even better: use message queues for servlet-datastore events
			
			/*
			 * PealehtSocketController.find(req.getServletContext()).broadcast(
			 * pealehtEcho);
			 */
		} catch (JsonParseException ex) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
		}
	}

}
