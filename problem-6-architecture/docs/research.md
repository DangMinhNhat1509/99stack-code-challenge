# Research Notes - Scoreboard Module

This file contains references and notes used to design the scoreboard service.

## References / Inspiration

1. **WebSocket for real-time updates**
   - [MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
   - [WebSocket vs SSE](https://ably.com/concepts/server-sent-events)
2. **Redis caching**

   - Using Redis Sorted Set for Top N leaderboard
   - [Redis Sorted Sets Documentation](https://redis.io/docs/latest/develop/data-types/sorted-sets/)

3. **PostgreSQL usage**

   - Users table + score_log table
   - Transactions to ensure score consistency

4. **Security / Anti-cheat**
   - JWT for authentication
   - Rate-limiting requests (express-rate-limit)
   - Server-side verification of user actions

## Notes

- Live updates: WebSocket preferred, fallback SSE
- Top 10 leaderboard cached in Redis for fast reads
- Consider batching DB writes for high traffic
