# Update Graphify
graphify update .
graphify cluster-only .

# Copy latest Graph Report into Obsidian
Copy-Item `
  ".\graphify-out\GRAPH_REPORT.md" `
  "C:\Users\ADMIN\OneDrive\Desktop\Obsidian Vault\ProjectsVault\Projects\breakPoint\GRAPH_REPORT.md" `
  -Force

Write-Host ""
Write-Host "BreakPoint documentation updated successfully."