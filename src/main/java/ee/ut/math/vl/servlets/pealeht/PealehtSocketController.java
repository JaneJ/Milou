package ee.ut.math.vl.servlets.pealeht;

import org.eclipse.jetty.websocket.servlet.*;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Controller that listens for incoming websocket connections and handles
 * all the new clients. For each ws connection a AuctionSocket object
 * is created. The sockets are later used for broadcasting events.
 *
 * This uses org.eclipse.jetty.websocket instead of javax.websocket because
 * javax.websocket does not give access to the ServletContext object
 * which is used to share data between servlets.
 *
 * You may need to enable websockets at heroku:
 * https://devcenter.heroku.com/articles/heroku-labs-websockets
 */
@WebServlet(value = "/pealehele")
public class PealehtSocketController extends WebSocketServlet implements WebSocketCreator {

    private List<PealehtSocket> sockets;
    private ServletContext context;

    
 
    public void broadcast(String message) {
        for (PealehtSocket socket : sockets) {
            try {
                socket.send(message);
            } 
            catch (IOException e) {
                System.out.println("failed to broadcast to " + socket);
            }
        }
    }

    
    
    public List<PealehtSocket> getSockets() {
        return sockets;
    }

    public ServletContext getContext() {
        return context;
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        sockets = new CopyOnWriteArrayList<PealehtSocket>(); // thread-safe impl
        context = config.getServletContext(); // shared between ALL servlets
        publish(this, context); // so that other servlets could find us
    }

    @Override
    public Object createWebSocket(ServletUpgradeRequest req, ServletUpgradeResponse resp) {
        return new PealehtSocket(this); // socket instance created per client
    }

    @Override
    public void configure(WebSocketServletFactory factory) {
        factory.setCreator(this);
    }

    private static void publish(PealehtSocketController controller, ServletContext context) {
        // see @WebListener and @WebFilter for details about servlet init
        context.setAttribute(PealehtSocketController.class.getName(), controller);
    }
/*
    public static PealehtSocketController find(ServletContext context) {
        return PealehtSocketController) context.getAttribute(PealehtSocketController.class.getName());
    }
*/
}