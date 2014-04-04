package ee.ut.math.vl.servlets.artikkel;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import ee.ut.math.vl.data.Artikkel;
import ee.ut.math.vl.datastore.Artikkel.ArtikkelData;
import ee.ut.math.vl.datastore.Artikkel.ArtikkelDataProvider;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;

@MultipartConfig(location = "/artiklid")
public class ArtikkelController extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
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
				replyWithSingleArtikkel(resp, idString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		else {resp.sendError(HttpServletResponse.SC_BAD_REQUEST); }
	}

	private void replyWithSingleArtikkel(HttpServletResponse resp,
			String idString) throws SQLException, Exception {
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
			System.out.println("Data to DB");
			
			Artikkel artikkel = gson.fromJson(req.getReader(), Artikkel.class);
			datastore.lisaArtikkel(artikkel); 

			// echo the same object back for convenience and debugging
			// also it now contains the generated id of the bid
			String artikkelEcho = gson.toJson(artikkel);
			resp.setHeader("Content-Type", "application/json");
			resp.getWriter().write(artikkelEcho);

			// actually this is a bad place to send the broadcast.
			// better: attach sockets as eventlisteners to the datastore
			// even better: use message queues for servlet-datastore events

			ArtikkelSocketController.find(req.getServletContext()).broadcast(
					artikkelEcho);

		} catch (Exception ex) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
		}
	}


}
