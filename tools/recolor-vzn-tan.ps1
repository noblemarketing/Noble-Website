# Replaces warm tan/beige logo strokes in embedded PNG data with Vizion primary blue #155078
$ErrorActionPreference = 'Stop'

Add-Type -ReferencedAssemblies System.Drawing.dll @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class VznTanRecolor {
    const int Br = 21, Bg = 80, Bb = 120; // #155078

    static bool IsTanLike(byte r, byte g, byte b, byte a) {
        if (a < 8) return false;
        int sum = r + g + b;
        if (sum < 85) return false; // black strokes

        // light neutral gray (tagline)
        if (Math.Abs(r - g) < 22 && Math.Abs(g - b) < 22 && r > 165 && sum > 480) return false;

        // warm tan / beige: red-ish, green-ish, blue lower
        if (r > 95 && g > 72 && b < 168 && (r - b) > 18 && (g - b) > 8) return true;

        // distance from typical tan fill
        int tr = 198, tg = 168, tb = 130;
        int d = (r - tr) * (r - tr) + (g - tg) * (g - tg) + (b - tb) * (b - tb);
        if (d < 5200 && r > 70 && b < r) return true;

        return false;
    }

    public static byte[] RecolorPngBytes(byte[] pngIn) {
        using (var ms = new MemoryStream(pngIn))
        using (var bmp = new Bitmap(ms)) {
            var rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
            BitmapData data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            try {
                int bytes = Math.Abs(data.Stride) * bmp.Height;
                byte[] buf = new byte[bytes];
                Marshal.Copy(data.Scan0, buf, 0, bytes);
                int w = bmp.Width, h = bmp.Height;
                for (int y = 0; y < h; y++) {
                    int row = y * data.Stride;
                    for (int x = 0; x < w; x++) {
                        int i = row + x * 4;
                        byte blue = buf[i], green = buf[i + 1], red = buf[i + 2], alpha = buf[i + 3];
                        if (IsTanLike(red, green, blue, alpha)) {
                            buf[i] = Bb;
                            buf[i + 1] = Bg;
                            buf[i + 2] = Br;
                        }
                    }
                }
                Marshal.Copy(buf, 0, data.Scan0, bytes);
            } finally {
                bmp.UnlockBits(data);
            }
            using (var outMs = new MemoryStream()) {
                bmp.Save(outMs, ImageFormat.Png);
                return outMs.ToArray();
            }
        }
    }
}
'@

function Update-SvgEmbeddedPng {
    param([string]$SvgPath)
    $raw = [IO.File]::ReadAllText($SvgPath)
    $m = [regex]::Match($raw, 'xlink:href="data:image/png;base64,([^"]+)"')
    if (-not $m.Success) { throw "No embedded PNG in $SvgPath" }
    $oldB64 = $m.Groups[1].Value
    $bytes = [Convert]::FromBase64String($oldB64)
    $newBytes = [VznTanRecolor]::RecolorPngBytes($bytes)
    $newB64 = [Convert]::ToBase64String($newBytes)
    $newRaw = $raw.Replace($oldB64, $newB64)
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [IO.File]::WriteAllText($SvgPath, $newRaw, $utf8NoBom)
    Write-Host "Updated: $SvgPath ($($bytes.Length) -> $($newBytes.Length) bytes)"
}

$base = Split-Path $PSScriptRoot -Parent
Update-SvgEmbeddedPng (Join-Path $base 'Client Logos\VZNshort.svg')
Update-SvgEmbeddedPng (Join-Path $base 'Client Logos\VZNshort2.svg')
