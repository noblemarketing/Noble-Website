$ErrorActionPreference = "Stop"

function Fix-File([string]$path) {
  $utf8 = New-Object System.Text.UTF8Encoding $false
  $t = [System.IO.File]::ReadAllText($path, $utf8)

  $emDash = [string]::Concat([char]0x00E2, [char]0x20AC, [char]0x201D)
  $rsquo = [string]::Concat([char]0x00E2, [char]0x20AC, [char]0x2122)
  $ldquo = [string]::Concat([char]0x00E2, [char]0x20AC, [char]0x0153)
  $rdquo = [string]::Concat([char]0x00E2, [char]0x20AC, [char]0x009D)

  $t2 = $t.Replace($emDash, ([string][char]0x2014))
  $t2 = $t2.Replace($rsquo, ([string][char]0x2019))
  $t2 = $t2.Replace($ldquo, ([string][char]0x201C))
  $t2 = $t2.Replace($rdquo, ([string][char]0x201D))

  if ($t2 -ne $t) {
    [System.IO.File]::WriteAllText($path, $t2, $utf8)
    Write-Host "fixed: $path"
  }
}

Fix-File (Join-Path $PSScriptRoot "styles.css")
Fix-File (Join-Path $PSScriptRoot "portfolio.html")
Fix-File (Join-Path $PSScriptRoot "index.html")
