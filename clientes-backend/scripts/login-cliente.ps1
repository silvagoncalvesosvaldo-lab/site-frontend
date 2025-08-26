param(
  [string]$Email = "cliente.teste@exemplo.com",
  [string]$Senha = "123"
)

# Login cliente
$body = @{ email = $Email; senha = $Senha } | ConvertTo-Json
$resp = Invoke-RestMethod -Uri "http://localhost:4101/login" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body $body

if (-not $resp.ok) {
  Write-Host "login falhou:" -ForegroundColor Red
  $resp | ConvertTo-Json -Depth 4
  exit 1
}

$global:tokc = $resp.token
Write-Host "ok token" -ForegroundColor Green
$global:tokc
