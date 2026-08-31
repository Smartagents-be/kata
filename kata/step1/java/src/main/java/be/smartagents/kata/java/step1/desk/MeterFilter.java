package be.smartagents.kata.java.step1.desk;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.WriteListener;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.io.PrintWriter;
import org.springframework.stereotype.Component;

/**
 * Counts what this service actually sends back, and tells the desk.
 *
 * <p>It measures at the wire rather than in the controller, because what a caller pays for is the
 * bytes that arrive and not the object that produced them. Everything under {@code /api} is counted,
 * the catalogue included: a student who pulls the titles nine times has spent that too, and a meter
 * that only watched its own endpoints would be flattering.
 */
@Component
public class MeterFilter implements Filter {

    private final Desk desk;

    public MeterFilter(Desk desk) {
        this.desk = desk;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (!(request instanceof HttpServletRequest http)
                || !(response instanceof HttpServletResponse out)
                || !http.getRequestURI().startsWith("/api")) {
            chain.doFilter(request, response);
            return;
        }
        Counting counting = new Counting(out);
        try {
            chain.doFilter(request, counting);
        } finally {
            counting.flushQuietly();
            desk.record(http.getRequestURI(), counting.served());
        }
    }

    /** A response that hands out a counting stream, whichever of the two ways the body is written. */
    private static final class Counting extends HttpServletResponseWrapper {

        private CountingStream stream;
        private PrintWriter writer;

        private Counting(HttpServletResponse response) {
            super(response);
        }

        @Override
        public ServletOutputStream getOutputStream() throws IOException {
            if (stream == null) {
                stream = new CountingStream(super.getOutputStream());
            }
            return stream;
        }

        @Override
        public PrintWriter getWriter() throws IOException {
            if (writer == null) {
                writer = new PrintWriter(new java.io.OutputStreamWriter(getOutputStream(), getCharacterEncoding()));
            }
            return writer;
        }

        private void flushQuietly() {
            if (writer != null) {
                writer.flush();
            }
        }

        private long served() {
            return stream == null ? 0 : stream.count;
        }
    }

    private static final class CountingStream extends ServletOutputStream {

        private final ServletOutputStream delegate;
        private long count;

        private CountingStream(ServletOutputStream delegate) {
            this.delegate = delegate;
        }

        @Override
        public void write(int b) throws IOException {
            delegate.write(b);
            count++;
        }

        @Override
        public void write(byte[] b, int off, int len) throws IOException {
            delegate.write(b, off, len);
            count += len;
        }

        @Override
        public void flush() throws IOException {
            delegate.flush();
        }

        @Override
        public boolean isReady() {
            return delegate.isReady();
        }

        @Override
        public void setWriteListener(WriteListener listener) {
            delegate.setWriteListener(listener);
        }
    }
}
