Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Background Gradient
$bgRect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $bgRect, ([System.Drawing.Color]::FromArgb(24, 24, 27)), ([System.Drawing.Color]::FromArgb(9, 9, 11)), 45.0
$g.FillRectangle($bgBrush, $bgRect)

# Subtle background glow
$glowBrush1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 225, 29, 72))
$g.FillEllipse($glowBrush1, 850, -100, 500, 500)
$glowBrush2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(30, 245, 158, 11))
$g.FillEllipse($glowBrush2, -100, 300, 500, 500)

# Crimson Logo Box
$logoRect = New-Object System.Drawing.Rectangle 100, 95, 105, 105
$logoBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $logoRect, ([System.Drawing.Color]::FromArgb(244, 63, 94)), ([System.Drawing.Color]::FromArgb(159, 18, 57)), 45.0
$g.FillRectangle($logoBrush, $logoRect)
$logoPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(251, 191, 36)), 3
$g.DrawRectangle($logoPen, $logoRect)

# Hanzi character in logo box
$hanziFont = New-Object System.Drawing.Font ('SimSun', [float]50, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$g.DrawString([char]0x6C49, $hanziFont, $whiteBrush, 118, 110)

# Brand Name
$titleFont = New-Object System.Drawing.Font ('Segoe UI', [float]46, [System.Drawing.FontStyle]::Bold)
$g.DrawString('HSK Free Lab', $titleFont, $whiteBrush, 230, 110)

# Value Badge
$badgeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(251, 113, 133))
$badgeFont = New-Object System.Drawing.Font ('Segoe UI', [float]15, [System.Drawing.FontStyle]::Bold)
$g.DrawString('100% FREE  -  ZERO PAYWALLS  -  NO LOGIN REQUIRED', $badgeFont, $badgeBrush, 100, 240)

# Main Heading
$headFont = New-Object System.Drawing.Font ('Segoe UI', [float]32, [System.Drawing.FontStyle]::Bold)
$g.DrawString('Master HSK 1, 2 & 3 With Complete Confidence', $headFont, $whiteBrush, 100, 290)

# Subtitle Features
$subFont = New-Object System.Drawing.Font ('Segoe UI', [float]18, [System.Drawing.FontStyle]::Regular)
$grayBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(212, 212, 216))
$g.DrawString('Full 600+ Official Vocab Decks  |  Native Audio  |  30 Timed Mock Exams', $subFont, $grayBrush, 100, 370)
$g.DrawString('Interactive Character Stroke Animator  |  Pinyin Tone Trainer  |  Score Calculator', $subFont, $grayBrush, 100, 415)

# Domain URL Pill
$urlRect = New-Object System.Drawing.Rectangle 100, 490, 240, 48
$urlBgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(39, 39, 42))
$g.FillRectangle($urlBgBrush, $urlRect)
$urlPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(244, 63, 94)), 2
$g.DrawRectangle($urlPen, $urlRect)
$urlFont = New-Object System.Drawing.Font ('Segoe UI', [float]17, [System.Drawing.FontStyle]::Bold)
$amberBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(251, 191, 36))
$g.DrawString('https://mybwn.com', $urlFont, $amberBrush, 115, 500)

$bmp.Save('public\og-preview.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Host "Generated public\og-preview.png successfully!"
