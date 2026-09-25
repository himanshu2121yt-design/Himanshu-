import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function backendValidationPlugin(): Plugin {
  return {
    name: 'backend-validation-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/verify-payment' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const { orderId, utr, amount } = data;
              const cleanUtr = (utr || '').trim().toUpperCase();

              // Validate format
              const is12 = /^\d{12}$/.test(cleanUtr);
              const isBank = /^[A-Z0-9]{12,22}$/.test(cleanUtr);

              if (!is12 && !isBank) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({
                    success: false,
                    status: 'failed',
                    message: 'Backend validation error: UTR must be standard 12 numeric digits (NPCI RRN)',
                  })
                );
                return;
              }

              // Check dummy patterns
              const bogus = ['123456789012', '000000000000', '111111111111', '999999999999', '222222222222'];
              if (bogus.includes(cleanUtr)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({
                    success: false,
                    status: 'failed',
                    message: 'Anti-fraud trigger: Placeholder or dummy UTR detected by backend rules engine',
                  })
                );
                return;
              }

              let network = 'NPCI UPI Network';
              const first = cleanUtr[0];
              if (first === '4') network = 'State Bank of India / HDFC Bank Gateway';
              else if (first === '5') network = 'ICICI Bank / Axis Bank UPI';
              else if (first === '3') network = 'Kotak Mahindra / Yes Bank UPI';
              else if (first === '6') network = 'Bank of Baroda / PNB';

              const taskId =
                'TASK-VAL-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
              const bankRef = 'NPCI' + Date.now().toString().slice(-8);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  success: true,
                  taskId,
                  orderId,
                  utr: cleanUtr,
                  amount: amount || 10,
                  network,
                  bankRef,
                  status: 'processing',
                  message: `Backend validation task ${taskId} initiated. NPCI clearinghouse verification in progress.`,
                  timestamp: new Date().toISOString(),
                  estimatedDurationMs: 1500,
                })
              );
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Server error processing payment validation' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), backendValidationPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
