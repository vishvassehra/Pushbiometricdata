# Bio Attendance Push

Upload a biometric DeviceLogs CSV and push every punch, one request at a time, to
`https://api.odpay.in/api/saveBioServerEmployeeAttendance`.

Payload per punch: `{ deviceId, empId, deviceLogId, logDate }`, where logDate is sent as `Sep  1 2026  5:51AM`.

## Run locally
    node server.js        # Node 18+, then open http://localhost:3000

## Deploy on Vercel
Push this folder to GitHub, then import it into Vercel. No build settings are needed.
`index.html` is served as a static page, and `api/push.js` becomes the `/api/push` proxy, which avoids browser CORS.
Optional env var: `BIO_API_URL` to point the proxy at a different endpoint.

## Notes
- Rows are sent oldest first, and deviceLogId is numbered sequentially from the "start from" value.
- Successful punches are remembered in the browser, so re-uploading the same file skips them.
- Use Mock mode to dry-run a file without calling the API.
