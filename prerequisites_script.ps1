Write-Host "Starting prerequisites script..."

# -----  Parameter for the script  -------------------------------------------------
$path_Repository = "C:\Users\ionut.mindrescu\Documents\GitHub\AutomatedTests"
$path_Portal = "C:\local\Portal"
$path_PortalProfile = "C:\local\PortalProfile"
$path_B2C = "C:\local\B2C"
# -----  Start copy process  ---------------------------

# Copy the fonts for customTheme tests
Write-Host "Copy the fonts for customTheme tests..."
Copy-Item -Path "$path_Repository\prerequisites\customTheme\Lato-Black.ttf" -Destination "$path_Portal\UploadEBS\Lato-Black_319699a5-9db0-4401-90a5-bd18d53d4ea5.ttf" -Recurse
Copy-Item -Path "$path_Repository\prerequisites\customTheme\Roboto-Black.ttf" -Destination "$path_Portal\UploadEBS\Roboto-Black_86b31a7a-d033-4333-8562-8612dca7c24a.ttf" -Recurse
Write-Host "Done..."

# # Copy login-background, background and logo images  to Portal Profile
# Write-Host "Copy login-background, background and logo images  to Portal Profile..."
# Copy-Item -Path "$path_Repository\prerequisites\portalProfile\*" -Destination "$p_PathPortal\UploadEBS" -Recurse
# Write-Host "Done..."

# # Copy custom icons to Portal
Write-Host "Copy custom icons to Portal..."
Copy-Item -Path "$path_Repository\prerequisites\customIcons\*" -Destination "$p_PathPortal\custom\*" -Recurse
Write-Host "Done..."

# # Copy custom icons to B2C
# Write-Host "Copy custom icons to B2C..."
# Copy-Item -Path "$path_Repository\prerequisites\custom\*" -Destination "$path_B2C\custom\*" -Recurse
# Write-Host "Done..."
