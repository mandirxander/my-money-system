Start the dev server. If port 3000 is already in use or changes aren't reflecting, kill any orphaned processes first and start fresh.

## Steps

1. Check if port 3000 is in use:
   ```bash
   lsof -ti :3000
   ```

2. If anything is bound to port 3000, kill it along with any orphaned Next.js build workers:
   ```bash
   lsof -ti :3000 | xargs kill -9 2>/dev/null || true
   pkill -f "next-server" 2>/dev/null || true
   pkill -f "next build" 2>/dev/null || true
   ```
   Wait a moment for the port to clear, then confirm it's free:
   ```bash
   sleep 1 && lsof -ti :3000 || echo "Port 3000 is clear"
   ```

3. Start the dev server from the app directory:
   ```bash
   cd participant_starter/app && npm run dev
   ```

Tell the user the server is starting and to open http://localhost:3000. If the kill step ran, also note that orphaned processes were cleared before starting fresh.
