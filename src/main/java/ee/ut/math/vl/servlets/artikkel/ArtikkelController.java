package ee.ut.math.vl.servlets.artikkel;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import ee.ut.math.vl.data.Artikkel;
import ee.ut.math.vl.datastore.ArtikkelData;
import ee.ut.math.vl.datastore.ArtikkelDataProvider;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet
public class ArtikkelController extends HttpServlet {

	private Gson gson;
	private ArtikkelDataProvider datastore;

	@Override
	public void init() throws ServletException {
		super.init();
		gson = new Gson();
		datastore = new ArtikkelData();
	}

	
	 @Override protected void doGet(HttpServletRequest req,
	 HttpServletResponse resp) throws ServletException, IOException {
	 resp.setHeader("Content-Type", "application/json");
	 
	 String idString = req.getParameter("id"); if (idString != null) {}
	 //replyWithSingleArtikkel(resp, idString); } else { replyWithAllItems(resp); }
	 }
	

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			Artikkel artikkel = gson.fromJson(req.getReader(), Artikkel.class);
			datastore.lisaArtikkel(artikkel); // bid should be validated
												// carefully

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
					
					
		} catch (JsonParseException ex) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
		}
	}

	
	
	
	
	
	
	 private void replyWithAllItems(HttpServletResponse resp) throws IOException { 
		 List<Artikkel> allContent = datastore.findAllArtiklid();
		 resp.getWriter().write(gson.toJson(allContent)); }

	
	  private void replyWithSingleItem(HttpServletResponse resp, String idString) throws IOException { 
		  int id = Integer.parseInt(idString); 
		  Artikkel artikkel = datastore.findArtikkelById(id);
		  resp.getWriter().write(gson.toJson(artikkel)); 
		  }
	 
}
