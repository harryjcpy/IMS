# IMS Audit Microservice - Deployment Guide

## Prerequisites
- GitHub account with your IMS repository
- Render account (free tier works)

## Step 1: Push to GitHub

From your project root (`D:\IMS`):

```powershell
git add IMS_Audit
git commit -m "Add ASP.NET Audit microservice with SQLite persistence"
git push origin main
```

Verify on GitHub that the `IMS_Audit` folder is visible alongside `IMS_Server` and `IMS_Client`.

## Step 2: Deploy to Render

### Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ims-audit`
   - **Root Directory**: `IMS_Audit`
   - **Environment**: `Docker`
   - **Region**: Choose closest to your backend
   - **Instance Type**: Free

### Environment Variables
Add the following in the Render dashboard:
- `ASPNETCORE_ENVIRONMENT` = `Production`

### Deploy
Click **Create Web Service**. Render will:
1. Build the Docker image
2. Deploy the service
3. Provide a public URL (e.g., `https://ims-audit.onrender.com`)

**Copy this URL** - you'll need it for the next step!

## Step 3: Update Backend Configuration

### On Render (Backend Service)
1. Go to your existing `ims-backend` service on Render
2. Navigate to **Environment** tab
3. Add new environment variable:
   ```
   AUDIT_SERVICE_URL=https://ims-audit.onrender.com/api/audit
   ```
   (Replace with your actual audit service URL)
4. Click **Save Changes**
5. Render will automatically redeploy your backend

## Step 4: Verification

### Test the Integration
1. Open your deployed frontend
2. Log in with admin credentials
3. Perform a CREATE/UPDATE/DELETE action (e.g., add a student)
4. Check the audit service logs:
   - Go to Render dashboard → `ims-audit` service → **Logs** tab
   - You should see: `[AUDIT] <timestamp>: User <username> performed <action> on <resource>`

### View Audit Logs
Visit: `https://ims-audit.onrender.com/api/audit`

You should see a JSON array of all captured audit logs.

## Local Development

For local testing, the services default to `localhost`:
- IMS_Audit runs on `http://localhost:5158`
- Backend connects to `http://localhost:5158/api/audit`

No environment variables needed for local development!

## Troubleshooting

### Backend can't reach Audit Service
- Verify the `AUDIT_SERVICE_URL` environment variable is set correctly
- Check Render logs for connection errors
- Ensure the audit service is running (check Render dashboard)

### Audit Service not starting
- Check Render logs for build errors
- Verify Dockerfile is in the `IMS_Audit` directory
- Ensure all NuGet packages restored successfully

### Logs not persisting
- This is expected on Render's free tier (ephemeral storage)
- For persistence, upgrade to Render's persistent disk or use PostgreSQL

## Architecture Diagram

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────┐
│   Frontend  │─────▶│ Spring Boot  │─────▶│  IMS_Audit      │
│  (Netlify)  │      │  (Render)    │      │  (Render)       │
└─────────────┘      └──────────────┘      └─────────────────┘
                            │                       │
                            ▼                       ▼
                     ┌──────────────┐      ┌─────────────────┐
                     │ PostgreSQL   │      │  SQLite (audit) │
                     │  (Render)    │      │  (ephemeral)    │
                     └──────────────┘      └─────────────────┘
```

## For Your CDAC Presentation

**Key talking points:**
- "We use a **polyglot microservices** architecture with Java and C#"
- "Audit logging is **decoupled** from the main application for security and compliance"
- "Environment variables allow **seamless deployment** across local and cloud environments"
- "The audit service uses **SQLite** for lightweight, file-based persistence"
