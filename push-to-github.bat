@echo off
REM AME TechAssist Theme - Push to GitHub
REM Replace YOUR-USERNAME with your actual GitHub username/org

echo.
echo ========================================
echo  AME TechAssist Theme - GitHub Push
echo ========================================
echo.

REM Check if remote already exists
git remote | findstr origin >nul
if %errorlevel% equ 0 (
    echo Remote 'origin' already exists. Removing...
    git remote remove origin
)

echo.
echo Please enter your GitHub repository URL:
echo Example: https://github.com/YOUR-USERNAME/ame-techassist-discourse-theme.git
echo.
set /p REPO_URL="Repository URL: "

echo.
echo Adding remote origin...
git remote add origin %REPO_URL%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Push Complete!
echo ========================================
echo.
echo Repository URL: %REPO_URL%
echo.
echo Next steps:
echo 1. Go to www.ame-techassist.com/admin/customize/themes
echo 2. Click "Install" - "From a Git repository"
echo 3. Enter: %REPO_URL%
echo 4. Check "This is a component"
echo 5. Click "Install"
echo.
pause
