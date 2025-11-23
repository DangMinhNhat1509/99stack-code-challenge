# Future Improvements / Ideas - Scoreboard Module

This file contains optional features or improvements for the scoreboard service.

## Performance

- Use a message queue (RabbitMQ/Kafka) to process score updates asynchronously
- Periodic batch update to DB instead of writing every increment
- Horizontal scaling: multiple API instances sharing Redis cache

## Security

- Detect suspicious activity (e.g., repeated high deltaScore)
- IP-based throttling for API calls
- Action verification logic (server validates user did actual action)

## Features

- Support multiple leaderboards (daily, weekly, all-time)
- Include additional stats (average score, rank changes)
- Notifications for top players when leaderboard changes
- Admin panel for score adjustments / auditing

## Monitoring / Analytics

- Log every score change in score_log
- Collect metrics for API usage, latency, cache hit ratio
- Alert system if Redis cache fails or DB writes fail
