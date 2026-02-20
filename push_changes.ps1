cd "C:\Users\DELL\Desktop\New Project"
Write-Host "Current directory: $(Get-Location)"
Write-Host "`n=== Git Status ===" 
git status
Write-Host "`n=== Staging files ==="
git add src/app/hackathon/page.tsx src/lib/email.ts
Write-Host "`n=== Committing ==="
git commit -m "Add important dates: assessment links Feb 28, test March 1, winners March 8 at 5:30 PM"
Write-Host "`n=== Pushing to GitHub ==="
git push origin main
Write-Host "`n=== Done ==="
