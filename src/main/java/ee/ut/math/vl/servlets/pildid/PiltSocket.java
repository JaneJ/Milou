package ee.ut.math.vl.servlets.pildid;

import java.io.IOException;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;


public class PiltSocket {
    private final PiltSocketController controller;
    private Session session;

    public PiltSocket(PiltSocketController controller) {
        this.controller = controller;
    }

    public void send(String message) throws IOException {
        if (session.isOpen()) {
            session.getRemote().sendString(message, null);
        }
    }

    @OnWebSocketConnect
    public void onOpen(Session session) {
        this.session = session;
        controller.getSockets().add(this);
    }

    @OnWebSocketClose
    public void onClose(int status, String message) {
        controller.getSockets().remove(this);
    }

    @OnWebSocketMessage
    public void onMessage(Session session, String message) throws IOException {
        System.out.println("received on websocket: " + message);
    }

}
