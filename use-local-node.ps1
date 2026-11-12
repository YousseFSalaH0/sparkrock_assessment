# Dot-source this script: . .\use-local-node.ps1
# Changes only the current PowerShell session, never the system installation.
$projectNodeDirectory = Join-Path $PSScriptRoot '.tools'
if (Test-Path (Join-Path $projectNodeDirectory 'node.exe')) {
    $env:PATH = $projectNodeDirectory + ';' + $env:PATH
}
$env:CYPRESS_CACHE_FOLDER = Join-Path $PSScriptRoot '.cache/Cypress'
node --version
