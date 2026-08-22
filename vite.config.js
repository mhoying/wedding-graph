import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Vite plugin to handle saving dataset directly to src/data/sampleData.js on disk
function saveDatasetPlugin() {
  return {
    name: 'save-dataset-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-dataset', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { nodes, links } = JSON.parse(body);
              const sampleDataPath = path.resolve(process.cwd(), 'src/data/sampleData.js');

              // Sanitize nodes (strip D3 transient physics props)
              const cleanNodes = (nodes || []).map(({ x, y, vx, vy, index, __indexColor, ...rest }) => rest);
              
              // Sanitize links (ALWAYS convert source and target back to string IDs!)
              const cleanLinks = (links || []).map(l => ({
                source: typeof l.source === 'object' ? (l.source.id || l.source) : l.source,
                target: typeof l.target === 'object' ? (l.target.id || l.target) : l.target,
                label: l.label || ''
              }));

              const fileContent = `// Auto-generated & updated from guest profile edits
export const COHORT_COLORS = {
  "Maureen Family": "#e11d48",
  "Matt Family": "#e11d48",
  "The Couple": "#38bdf8",
  "Atlanta": "#f59e0b",
  "Cornell": "#b31b1b",
  "High School": "#8b5cf6",
  "Work": "#10b981",
  "Default": "#64748b"
};

export const SIDE_COLORS = {
  "Maureen": "#ec4899",
  "Matt": "#3b82f6",
  "Joint": "#10b981"
};

export const STATE_COLORS = {
  "GA": "#f59e0b",
  "NY": "#b31b1b",
  "CA": "#06b6d4",
  "UK": "#8b5cf6",
  "Canada": "#ef4444",
  "Default": "#64748b"
};

export const SAMPLE_NODES = ${JSON.stringify(cleanNodes, null, 2)};

export const SAMPLE_LINKS = ${JSON.stringify(cleanLinks, null, 2)};
`;

              fs.writeFileSync(sampleDataPath, fileContent, 'utf-8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Dataset persisted to src/data/sampleData.js on disk!' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/wedding-graph/',
  plugins: [react(), saveDatasetPlugin()],
})
