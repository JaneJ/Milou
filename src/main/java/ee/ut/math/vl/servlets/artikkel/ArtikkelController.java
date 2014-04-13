package ee.ut.math.vl.servlets.artikkel;

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
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(value = "/artiklid")
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
		resp.setContentType("text/html;charset=UTF-8");    //juurde
		resp.getWriter().write("Success Data");            //juurde
		Connection con = null ; //peab olema meetod, mis tekitab connectioneid (muide peabki olema väärtus null)
								//try sees open connection
								//finally : if con!=null close connection
		

		String idString = req.getParameter("id");
		if (idString != null) {
			try {
				replyWithSingleArtikkel(resp, idString);
			}  catch (Exception ex) { throw new RuntimeException(ex); }

		}
		else {resp.sendError(HttpServletResponse.SC_BAD_REQUEST); }
	}

	private void replyWithSingleArtikkel(HttpServletResponse resp,
			String idString) throws SQLException, Exception {
		int id = Integer.parseInt(idString);
		
		//pildi servletist
		//resp.getOutputStream().write(null);
		
		
		Artikkel artikkel = datastore.findArtikkelById(id);
		try {
			resp.getWriter().write(gson.toJson(artikkel));
		
		
		}

			catch (Exception ex) { throw new RuntimeException(ex); }

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			
			
			//Siia ka see conntectioni teema
			
			//Pildi osa
			//pildid peaksid andmebaasis olema unikaalse nimega, kui klient peaks küsima (ehk responce pildinime kaudu)
			//Part pilt = req.getPart("pilt").getInputStream();
			
			
			Artikkel artikkel = gson.fromJson(req.getReader(), Artikkel.class);
			datastore.lisaArtikkel(artikkel); 

			
			
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
