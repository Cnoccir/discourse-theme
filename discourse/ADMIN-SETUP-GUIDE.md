# 🔐 Admin Account Setup Guide

## Problem
Local Discourse setup doesn't have email configured, so the normal registration process doesn't work. This guide shows how to create an admin account for testing.

## Quick Solution

### Option 1: Automatic Setup (Recommended)
```powershell
# Start Discourse and automatically create admin account
.\start-local-discourse.ps1

# If that doesn't work, run admin setup manually:
.\setup-admin-account.ps1
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`
- Email: `admin@localhost.local`

### Option 2: Manual Admin Creation
If the automatic setup doesn't work, create an admin account manually:

```powershell
# 1. Make sure Discourse is running
docker-compose up -d

# 2. Wait for it to be ready (2-3 minutes)
# Check: http://localhost:4000 should show Discourse

# 3. Create admin user via Rails console
docker exec -it discourse_web bash

# Inside the container:
cd /var/www/discourse
su discourse -c "RAILS_ENV=production bundle exec rails console"

# In Rails console, run:
admin = User.create!(
  username: 'admin',
  email: 'admin@localhost.local', 
  password: 'admin123',
  active: true,
  approved: true,
  admin: true,
  moderator: true,
  trust_level: 4
)
admin.email_tokens.create!(email: 'admin@localhost.local', confirmed: true)
admin.activate
puts "Admin created: admin / admin123"
exit

# Exit container
exit
```

### Option 3: Use Discourse Setup Wizard
If Discourse shows a setup wizard:

1. Go to http://localhost:4000
2. If you see "Congratulations, you installed Discourse!" page
3. Click "Register Admin Account"
4. Fill in:
   - Email: `admin@localhost.local`
   - Username: `admin`
   - Password: `admin123`
5. Click "Register"
6. You may see email verification - ignore it, the account should work

## Configuring Site Settings

Once you have admin access:

1. Go to http://localhost:4000/admin
2. Go to Settings → Email
3. Set:
   - `disable emails`: `yes`
   - `must approve users`: `false`
   - `login required`: `false`
4. Go to Settings → Users
5. Set:
   - `enable local logins`: `true`
   - `min username length`: `3`
   - `min password length`: `6`

## Installing the AME Theme

1. Go to http://localhost:4000/admin
2. Click "Customize" → "Themes"
3. Click "Install" → "From a directory"
4. Enter: `/var/www/discourse/app/assets/javascripts/discourse/theme-components/ame-neoglass-component`
5. Click "Install"
6. Enable the theme component
7. Go back to homepage to see the changes

## Testing the Setup

Once admin account is created and theme is installed:

```powershell
# Run the comprehensive tests
.\execute-task8-tests.ps1

# Or run quick tests
.\run-tests.ps1

# Or run specific landing page tests
.\test-ame-landing.ps1
```

## Troubleshooting

### "Email not confirmed" Error
```powershell
# Fix via Rails console
docker exec -it discourse_web bash
cd /var/www/discourse
su discourse -c "RAILS_ENV=production bundle exec rails console"

# In Rails console:
user = User.find_by(username: 'admin')
user.email_tokens.create!(email: user.email, confirmed: true)
user.activate
user.save!
exit
```

### "Site not configured" Error
```powershell
# Configure basic site settings
docker exec -it discourse_web bash
cd /var/www/discourse
su discourse -c "RAILS_ENV=production bundle exec rails console"

# In Rails console:
SiteSetting.title = 'AME TechAssist Forum'
SiteSetting.site_description = 'Local development instance'
SiteSetting.disable_emails = 'yes'
SiteSetting.must_approve_users = false
exit
```

### Container Won't Start
```powershell
# Check logs
docker-compose logs discourse

# Restart everything
docker-compose down
docker-compose up -d

# Reset everything (⚠️ deletes all data)
docker-compose down -v
docker-compose up -d
```

### Port 4000 Already in Use
Edit `docker-compose.yml` and change:
```yaml
ports:
  - "4001:80"  # Use port 4001 instead
```

Then access via http://localhost:4001

## Verification Checklist

✅ **Basic Setup**
- [ ] Discourse loads at http://localhost:4000
- [ ] Admin account exists (admin/admin123)
- [ ] Can login to admin panel
- [ ] Email is disabled in settings

✅ **Theme Setup**
- [ ] AME theme component is installed
- [ ] Theme is enabled/active
- [ ] Homepage shows hero banner
- [ ] Homepage shows 4 category cards
- [ ] Blurred background is visible

✅ **Testing Ready**
- [ ] Test categories exist (Knowledge Base, Tech Community, etc.)
- [ ] No JavaScript errors in browser console
- [ ] All test scripts run without errors

## Quick Commands Reference

```powershell
# Start everything
.\start-local-discourse.ps1

# Setup admin (if needed)
.\setup-admin-account.ps1

# Run tests
.\execute-task8-tests.ps1

# Check status
docker-compose ps

# View logs
docker-compose logs -f discourse

# Stop everything
.\stop-local-discourse.ps1

# Reset everything
docker-compose down -v
```

## Success Criteria

You know the setup is working when:

1. ✅ http://localhost:4000 loads Discourse
2. ✅ You can login with admin/admin123
3. ✅ Admin panel is accessible
4. ✅ AME theme shows hero banner and category cards
5. ✅ Test scripts run successfully

---

**Need Help?** Check the logs: `docker-compose logs discourse`